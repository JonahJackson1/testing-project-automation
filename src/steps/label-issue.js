// https://github.com/actions/javascript-action
// https://octokit.github.io/rest.js/v20#usage
// https://github.com/actions/toolkit/blob/master/README.md

// https://docs.github.com/en/graphql/reference/objects#issue
// https://docs.github.com/en/graphql/reference/mutations#createissue

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
    const issue_number = core.getInput('issue_number', { required: true });
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

    const label_name = 'test';

    // fetch the ids of the opened issue and the label from github
    const { repository } = await octokit.graphql(
      `
      query fetchLabelAndIssueIds( $owner: String!, $repo: String!, $issue_number: Int!, $label_name: String! )  {
        repository(owner: $owner, name: $repo) {
          label(name: $label_name) {
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
        issue_number: Number(issue_number),
        label_name
      }
    );

    if (!repository) return;

    const labelId = repository?.label?.id;
    const issueId = repository?.issue?.id;

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
