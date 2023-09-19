// create a branch
// https://docs.github.com/en/rest/git/refs?apiVersion=2022-11-28

const core = require('@actions/core');
const github = require('@actions/github');

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

    /* 
    {
      "ref": "refs/heads/featureA",
      "node_id": "MDM6UmVmcmVmcy9oZWFkcy9mZWF0dXJlQQ==",
      "url": "https://api.github.com/repos/octocat/Hello-World/git/refs/heads/featureA",
      "object": {
        "type": "commit",
        "sha": "aa218f56b14c9653891f9e74264a383fa43fefbd",
        "url": "https://api.github.com/repos/octocat/Hello-World/git/commits/aa218f56b14c9653891f9e74264a383fa43fefbd"
      }
    }
    
    */
    // The :ref in the URL must be formatted as heads/<branch name>
    const ref = 'heads/development';

    // https://octokit.github.io/rest.js/v20#git-get-ref
    const devBranch = await octokit.rest.git.getRef({
      owner,
      repo,
      ref
    });

    const sha = await devBranch?.object?.sha;

    const newRef = 'refs/heads/featureA';

    // https://octokit.github.io/rest.js/v20#git-create-ref
    await octokit.rest.git.createRef({
      owner,
      repo,
      newRef,
      sha
    });

    // octokit.rest.issues.addLabels({
    //   owner,
    //   repo,
    //   issue_number,
    //   labels: ['test']
    // });
  } catch (error) {
    // Fail the workflow run if an error occurs
    core.setFailed(error.message);
  }
}

module.exports = { createBranch };
