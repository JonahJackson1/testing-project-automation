// https://docs.github.com/graphql

// packages
const core = require('@actions/core');
const github = require('@actions/github');

// files
const { wait } = require('./wait');

// query
const { fetchIds } = require('./steps/fetch-ids');

// mutate
const { createLinkedBranch } = require('./steps/create-branch');
const { createPullRequest } = require('./steps/create-pull-request');
const { labelIssue } = require('./steps/label-issue');
const { addComment } = require('./steps/add-comment');
const { doProjectStuff } = require('./steps/project-stuff');

/* TODO: */
/* 

- [x] add a comment onto the issue that tells show the user whether the specific fields were successful or not (branch, pull, etc.)
- [x] assign an issue ticket to a branch (used comments, could not find a way to do it the same way a user can in github)
- ?[x] assign an issue ticket to a pull request
- [ ] to move items/issues in a project
- [ ] assign a pull request to an issue ticket
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
    // has to be formatted as refs/heads/<branch-name>
    const branchToCopy = 'refs/heads/master';
    const labelToFetch = 'test';

    // fetch the ids for the the below
    const { latestCommitSHA, repoId, labelId, issueId, projectId } =
      await fetchIds({
        branchToCopy,
        issueNumber,
        labelName: labelToFetch,
        owner,
        repo,
        octokit
      });

    console.log(projectId);
    // creates a branch from the most recent commit to the development branch
    // prettier-ignore
    const branchStatus = await createLinkedBranch({ issueTitle, repoId, latestCommitSHA, assignToIssue: issueId, octokit });

    // creates a pull request from the most recent commit and links it to the newly created branch
    // has to be formatted as <branch-name>
    const pushToBranch = 'staging';
    const pullStatus = await createPullRequest({
      repoId,
      pushToBranch,
      issueTitle,
      octokit
    });

    const test = await doProjectStuff({
      // cardId: issueId,
      projectId,
      // pullRequestId: pullStatus.pullRequestId,
      octokit
    });

    console.log(test);

    // there doesn't seem to be a good way of linking issues and pull requests but mentioning them in comments seems to be a good alternative
    // this "links" the pull request to the issue with a comment
    await addComment({
      nodeId: pullStatus.pullRequestId,
      message: `Linked to issue #${issueNumber}`,
      octokit
    });

    // this "links" the issue to the pull request with a comment
    await addComment({
      nodeId: issueId,
      octokit,
      message: `Linked to PR #${pullStatus.pullRequestNum}`
    });

    // labels the ticket "test"
    const labelStatus = await labelIssue({ issueId, labelId, octokit });
  } catch (error) {
    // Fail the workflow run if an error occurs
    core.setFailed(error.message);
  }
}

module.exports = {
  run
};
