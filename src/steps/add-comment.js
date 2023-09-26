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
async function addComment({ nodeId, octokit, message }) {
  try {
    // https://docs.github.com/en/graphql/reference/mutations#addcomment

    // return if no ids found
    if (!nodeId) return;

    await octokit.graphql(
      `
      mutation AddCommentToNode ($nodeId: ID!, $message: String!){
        addComment(
          input: {subjectId: $nodeId, body: $message}
        ) {
          subject {
            id
          }
        } 
      }
      `,
      {
        nodeId,
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
