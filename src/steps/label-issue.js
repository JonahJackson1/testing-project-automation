// https://github.com/actions/javascript-action
// https://octokit.github.io/rest.js/v20#usage
// https://github.com/actions/toolkit/blob/master/README.md

// https://docs.github.com/en/graphql/reference/objects#issue
// https://docs.github.com/en/graphql/reference/mutations#createissue

/** TODO: 

  - put in some error handling

*/

const core = require('@actions/core');

/**
 * The main function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
async function labelIssue({ issueId, labelId, octokit }) {
  try {
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
    console.log('successfully labeled the issue');
    return { success: true };
  } catch (error) {
    // Fail the workflow run if an error occurs
    core.setFailed(error.message);
    return { success: false };
  }
}

module.exports = { labelIssue };
