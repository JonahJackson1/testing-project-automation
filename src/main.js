// https://docs.github.com/graphql

// packages
const core = require('@actions/core');
const github = require('@actions/github');

// files
const { wait } = require('./wait');

// query
const { fetchIssueId, fetchLabelId } = require('./steps/fetch-ids');

// mutate
const { createBranch } = require('./steps/create-branch');
const { createPullRequest } = require('./steps/create-pull-request');
const { labelIssue } = require('./steps/label-issue');
const { addComment } = require('./steps/add-comment');

/* TODO: */
/* 
- read up on graphQL in order to do the more advanced automations not possible with the REST api

  - should be able:
    - to move items/issues in a project
    - assign a pull request to an issue ticket
    - assign an issue ticket to a pull request / repo
    - 
*/
/**
 * The main function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
async function run() {
  try {
    const ms = core.getInput('milliseconds', { required: true });

    // Debug logs are only output if the `ACTIONS_STEP_DEBUG` secret is true
    core.debug(`Waiting ${ms} milliseconds ...`);

    // Log the current timestamp, wait, then log the new timestamp
    core.debug(new Date().toTimeString());
    await wait(parseInt(ms, 10));
    core.debug(new Date().toTimeString());

    // Set outputs for other workflow steps to use
    core.setOutput('time', new Date().toTimeString());

    /**
     * We need to fetch all the inputs that were provided to our action
     * and store them in variables for us to use.
     **/

    const owner = core.getInput('owner', { required: true });
    const repo = core.getInput('repo', { required: true });
    const issueNumber = core.getInput('issue_number', { required: true });
    const token = core.getInput('token', { required: true });
    const issueTitle = core.getInput('issue_title', { required: true });

    /**
     * Now we need to create an instance of Octokit which will use to call
     * GitHub's REST API endpoints.
     * We will pass the token as an argument to the constructor. This token
     * will be used to authenticate our requests.
     * You can find all the information about how to use Octokit here:
     * https://octokit.github.io/rest.js/v18
     **/
    const octokit = new github.getOctokit(token);

    // this is the branch that is copied for each new issue branch when it is opened
    // The branch name must be formatted as refs/heads/<branch-name>
    const branchToCopy = 'refs/heads/master';

    // creates a branch from the most recent commit to the development branch
    // prettier-ignore
    const branchStatus = await createBranch({ issueTitle, branchToCopy, owner, repo, octokit });

    // creates a pull request from the most recent commit and links it to the newly created branch
    const pullStatus = await createPullRequest({ issueTitle, octokit });

    const issueId = await fetchIssueId({ issueNumber, owner, repo, octokit });

    const labelToFetch = 'test';

    const labelId = await fetchLabelId({
      labelName: labelToFetch,
      owner,
      repo,
      octokit
    });

    // labels the ticket "test"
    labelIssue({ issueId, labelId, octokit });

    const message = 'test message';

    // add "test message" to the new issue
    addComment({ issueId, octokit, message });
  } catch (error) {
    // Fail the workflow run if an error occurs
    core.setFailed(error.message);
  }
}

module.exports = {
  run
};
