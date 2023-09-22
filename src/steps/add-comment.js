// https://github.com/actions/javascript-action
// https://octokit.github.io/rest.js/v20#usage
// https://github.com/actions/toolkit/blob/master/README.md

// https://docs.github.com/en/graphql/reference/objects#issue
// https://docs.github.com/en/graphql/reference/mutations#createissue

/** TODO: 

  - put in some error handling
  - convert the requires to imports
  - create a comment the tells the user whether or not everything was successful

*/

const core = require('@actions/core');

/**
 * The main function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
async function addComment({ issueId, octokit, message }) {
  try {
    // https://docs.github.com/en/graphql/reference/mutations#addlabelstolabelable

    // return if no ids found
    if (!issueId) return;

    await octokit.graphql(
      `
      mutation AddCommentToIssue ($issueId: ID!, $message: String!){
        addComment(
          input: {subjectId: $issueId, body: $message}
        ) {
          subject {
            id
          }
        } 
      }
      `,
      {
        issueId,
        message
      }
    );

    console.log('successfully added the comment');
    return { success: true };
  } catch (error) {
    // Fail the workflow run if an error occurs
    core.setFailed(error.message);
    return { success: false };
  }
}

module.exports = { addComment };
