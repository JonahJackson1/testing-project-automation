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

/**
 * The main function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
async function fetchIssueId({ issueNumber, owner, repo }) {
  try {
    // fetch the parse issue number
    const { repository } = await octokit.graphql(
      `
      query fetchIssueId($owner: String!, $repo: String!, $issueNumber: Int!) {
        repository(owner: $owner, name: $repo) {
          issue(number: $issueNumber) {
            id
          }
        }
      }
    `,
      {
        owner,
        repo,
        issueNumber: Number(issueNumber)
      }
    );

    if (!repository) return;
    const issueId = repository?.issue?.id;

    // return if no ids found
    if (!issueId) return;

    return issueId;
  } catch (error) {
    // Fail the workflow run if an error occurs
    core.setFailed(error.message);
  }
}

/**
 * The main function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
async function fetchLabelId({ labelName, owner, repo }) {
  try {
    // fetch the ids of the parsed label
    const { repository } = await octokit.graphql(
      `
      query fetchIssueId($owner: String!, $repo: String!, $labelName: String! ) {
        repository(owner: $owner, name: $repo) {
          label(name: $labelName) {
            id
          }
        }
      }
    `,
      {
        owner,
        repo,
        labelName
      }
    );

    if (!repository) return;
    // grab the ids
    const labelId = repository?.label?.id;

    // return if no ids found
    if (!labelId) return;

    return labelId;
  } catch (error) {
    // Fail the workflow run if an error occurs
    core.setFailed(error.message);
  }
}

module.exports = { fetchIssueId, fetchLabelId };
