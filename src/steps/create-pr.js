// create a pull request
// https://docs.github.com/en/rest/pulls/pulls?apiVersion=2022-11-28#create-a-pull-request
// update a pull request's branch
// https://docs.github.com/en/rest/pulls/pulls?apiVersion=2022-11-28#update-a-pull-request-branch

// https://docs.github.com/en/graphql/reference/objects#pullrequest
// https://docs.github.com/en/graphql/reference/mutations#createpullrequest

const core = require('@actions/core');
const github = require('@actions/github');

/* TODO:

- figure out a way to immediately open a pull request w/o any changes being made (staging branch?)
- figure out a way to link the pull request and original issue ticket to one another

*/

/**
 * The main function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
async function createPR() {
  try {
    /**
     * We need to fetch all the inputs that were provided to our action
     * and store them in variables for us to use.
     **/
    const owner = core.getInput('owner', { required: true });
    const repo = core.getInput('repo', { required: true });
    const issueTitle = core.getInput('issue_title', { required: true });
    const token = core.getInput('token', { required: true });
    /**
     * Now we need to create an instance of Octokit which will use to call
     * GitHub's REST API endpoints.
     * We will pass the token as an argument to the constructor. This token
     * will be used to authenticate our requests.
     * You can find all the information about how to use Octokit here:
     * https://octokit.github.io/rest.js/v18
     **/
    const octokit = new github.getOctokit(token);

    // https://octokit.github.io/rest.js/v20#pulls-create
    // https://docs.github.com/en/rest/pulls/pulls?apiVersion=2022-11-28#create-a-pull-request
    await octokit.rest.pulls.create({
      owner,
      repo,
      head: `feature-${issueTitle.split(' ').join('-')}`,
      title: `Feature ${issueTitle}`,
      base: 'staging'
    });
  } catch (error) {
    // Fail the workflow run if an error occurs
    core.setFailed(error.message);
  }
}

module.exports = { createPR };
