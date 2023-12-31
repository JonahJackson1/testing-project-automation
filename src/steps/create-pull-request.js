// create a pull request
// https://docs.github.com/en/rest/pulls/pulls?apiVersion=2022-11-28#create-a-pull-request
// update a pull request's branch
// https://docs.github.com/en/rest/pulls/pulls?apiVersion=2022-11-28#update-a-pull-request-branch

// https://docs.github.com/en/graphql/reference/objects#pullrequest
// https://docs.github.com/en/graphql/reference/mutations#createpullrequest

const core = require('@actions/core');

/* TODO:

- figure out a way to actually link the pull request and original issue ticket to one another

*/

/**
 * The main function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
async function createPullRequest({
  pushToBranch,
  issueTitle,
  repoId,
  octokit
}) {
  try {
    const baseRef = `${issueTitle.split(' ').join('-')}`;

    const res = await octokit.graphql(
      `
      mutation CreateNewPullRequest ($pullName: String!, $headRef: String!, $baseRef: String!, $repoId: ID!) {
        createPullRequest(
          input: {baseRefName: $baseRef, headRefName: $headRef, title: $pullName, repositoryId: $repoId}
        ) {
          pullRequest {
            title 
            permalink
            number
            id
          }
        }
      }
      `,
      {
        repoId,
        headRef: pushToBranch,
        baseRef,
        pullName: `New feature - ${issueTitle}`
      }
    );

    const pullRequestURL = res?.createPullRequest?.pullRequest?.permalink;
    const pullRequestNum = res?.createPullRequest?.pullRequest?.number;
    const pullRequestId = res?.createPullRequest?.pullRequest?.id;

    console.log('successfully created the new pull request');
    return { success: true, pullRequestURL, pullRequestId, pullRequestNum };
  } catch (error) {
    // Fail the workflow run if an error occurs
    core.setFailed(error.message);
    return { success: false };
  }
}

module.exports = { createPullRequest };
