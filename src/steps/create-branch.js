// create a branch
// https://docs.github.com/en/rest/git/refs?apiVersion=2022-11-28

// https://docs.github.com/en/graphql/reference/objects#ref

const core = require('@actions/core');
const github = require('@actions/github');

/* TODO: 

- Attach the branch to the issue ticket

*/

/**
 * The main function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
async function createBranch() {
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

    // The branch name must be formatted as refs/heads/<branch-name>
    const getThisBranch = 'refs/heads/development';

    // this fetches the id of the repository, the id of the development branch
    const { repository } = await octokit.graphql(
      `
        query fetchRefAndId($owner: String!, $repo: String!, $branchName: String!) {
          repository(owner: $owner, name: $repo) {
            id
            ref(qualifiedName: $branchName) {
              target {
                id
                ... on Commit {
                  history(first: 1) {
                    edges {
                      node {
                        oid
                      }
                    }
                  }
                }
              }
            }
          }
        }
    `,
      {
        owner,
        repo,
        branchName: getThisBranch
      }
    );

    if (!repository) return;

    const repoId = await repository?.id;
    const lastDevCommitSHA =
      await repository?.ref?.target?.history?.edges[0]?.node?.oid;

    // The name must be formatted as refs/heads/<branch-name>
    // it also cant take in weird characters but i dont want to do that atm
    // 9.21.2023
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
        sha: lastDevCommitSHA,
        branch: newBranchName
      }
    );
  } catch (error) {
    // Fail the workflow run if an error occurs
    core.setFailed(error.message);
  }
}

module.exports = { createBranch };
