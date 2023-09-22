// create a branch
// https://docs.github.com/en/rest/git/refs?apiVersion=2022-11-28

// https://docs.github.com/en/graphql/reference/objects#ref

const core = require('@actions/core');

/* TODO: 

- Attach the branch to the issue ticket
- do a check on the issue names so they know if a branch was made 
- error handle probably with a label

*/

/**
 * The main function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
// prettier-ignore
async function createBranch({ issueTitle, repoId, latestCommitSHA, octokit }) {
  try {


    // The name must be formatted as refs/heads/<branch-name>
    // it also cant take in weird characters but i dont want to do that rn
    const newBranchName = `refs/heads/${issueTitle.split(' ').join('-')}`;

    await octokit.graphql(
      `
      mutation createNewBranch ($branch: String!, $sha: GitObjectID!, $repoId: ID!) {
        createRef(
          input: {name: $branch, oid: $sha, repositoryId: $repoId}
        ) {
          clientMutationId 
        }
      }
      `,
      {
        repoId,
        sha: latestCommitSHA,
        branch: newBranchName
      }
    );

    console.log('successfully created the new branch');
  } catch (error) {
    // Fail the workflow run if an error occurs
    core.setFailed(error.message);
  }
}

module.exports = { createBranch };
