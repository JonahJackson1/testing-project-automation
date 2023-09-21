// https://github.com/actions/javascript-action
// https://octokit.github.io/rest.js/v20#usage
// https://github.com/actions/toolkit/blob/master/README.md

// https://docs.github.com/en/graphql/reference/objects#issue
// https://docs.github.com/en/graphql/reference/mutations#createissue

/** TODO: 

  - put in some error handling
  - convert the requires to imports

*/

const core = require('@actions/core');
const github = require('@actions/github');

/**
 * The main function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
async function labelIssue() {
  try {
    /**
     * We need to fetch all the inputs that were provided to our action
     * and store them in variables for us to use.
     **/
    const owner = core.getInput('owner', { required: true });
    const repo = core.getInput('repo', { required: true });
    const issueNumber = core.getInput('issue_number', { required: true });
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

    // https://docs.github.com/en/graphql/reference/mutations#addlabelstolabelable

    // just using this for now, there is a way to store all a repos labels in a json file but i haven't looked into it
    const labelName = 'test';

    // fetch the ids of the opened issue
    const { repository } = await octokit.graphql(
      `
      query fetchLabelAndIssueIds( $owner: String!, $repo: String!, $issueNumber: Int!, $labelName: String! )  {
        repository(owner: $owner, name: $repo) {
          label(name: $labelName) {
            id
          }
          issue(number: $issue_number) {
            id
          }
        }
      }
    `,
      {
        owner,
        repo,
        issueNumber: Number(issueNumber),
        labelName
      }
    );

    if (!repository) return;

    // grab the ids
    const labelId = repository?.label?.id;
    const issueId = repository?.issue?.id;

    // return if no ids found
    if (!labelId || !issueId) return;

    await octokit.graphql(
      `
      mutation AddLabelToIssue( $issueId: ID!, $labelId: ID! )  {
        addLabelsToLabelable(input: {labelableId: $issueId, labelIds: [$labelId]}) {
          clientMutationId
        }
      }
      `,
      {
        issueId,
        labelId
      }
    );
  } catch (error) {
    // Fail the workflow run if an error occurs
    core.setFailed(error.message);
  }
}

module.exports = { labelIssue };
