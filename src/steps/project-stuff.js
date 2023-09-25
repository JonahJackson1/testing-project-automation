// create a pull request
// https://docs.github.com/en/rest/pulls/pulls?apiVersion=2022-11-28#create-a-pull-request
// update a pull request's branch
// https://docs.github.com/en/rest/pulls/pulls?apiVersion=2022-11-28#update-a-pull-request-branch

// https://docs.github.com/en/graphql/reference/objects#pullrequest
// https://docs.github.com/en/graphql/reference/mutations#createpullrequest

const core = require('@actions/core');

/* TODO:

- convert to graphQL - then the rest is ez
- figure out a way to immediately open a pull request w/o any changes being made (staging branch?)
- figure out a way to link the pull request and original issue ticket to one another

*/

/**
 * The main function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
async function doProjectStuff({ pushToBranch, issueTitle, repoId, octokit }) {
  try {
    const baseRef = `${issueTitle.split(' ').join('-')}`;

    await octokit.graphql(
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

    console.log('successfully did the project stuff');
    return { success: true };
  } catch (error) {
    // Fail the workflow run if an error occurs
    core.setFailed(error.message);
    return { success: false };
  }
}

module.exports = { doProjectStuff };
