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
async function fetchIds({
  branchToCopy,
  issueNumber,
  labelName,
  owner,
  repo,
  octokit
}) {
  try {
    // fetch the ids of the parsed label
    const { repository } = await octokit.graphql(
      `
      query FetchIssueId($owner: String!, $repo: String!, $labelName: String!, $issueNumber: Int!, $branchName: String!) {
        repository(owner: $owner, name: $repo) {
          id
          projectsV2 (first: 1) { # Assuming you want the first project; adjust as needed
            nodes {
              title
              number
              id
              items(last: 1) { # need to update this to find the specific card/issue not the latest one
                nodes {
                  id
                }
              }
            }
          }
          label(name: $labelName) {
            id
          }
          issue(number: $issueNumber) {
            id
            projectItems(first: 1) {
              nodes {
                fieldValues(first: 30) {
                  nodes {
                    ... on ProjectV2ItemFieldTextValue {
                      id
                    }
                  }
                }
              }
            }
          }
          ref(qualifiedName: $branchName) {
            target {
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
        labelName,
        issueNumber: Number(issueNumber),
        branchName: branchToCopy
      }
    );

    /* 
     projectItems(first: 1) {
        totalCount
        __typename
        nodes {
          fieldValues(first: 30) {
            totalCount
            nodes {
              ... on ProjectV2ItemFieldTextValue {
                id
                text
                field {
                  __typename
                }
              }
              __typename
            }
          }
        }
      }
    
    */

    if (!repository) return;
    console.log(repository);
    // grab the ids
    const repoId = repository?.id;
    const labelId = repository?.label?.id;
    const issueId = repository?.issue?.id;
    const projectId = repository?.projectsV2?.nodes[0].id;
    const cardId = repository?.projectsV2?.nodes[0].items?.nodes[0].id;

    // grab the specified branch's last commit
    // prettier-ignore
    const latestCommitSHA = repository?.ref?.target?.history?.edges[0]?.node?.oid;

    // return if no ids found
    if (!repoId || !labelId || !issueId || !projectId || !latestCommitSHA)
      return;

    return { latestCommitSHA, repoId, labelId, issueId, projectId, cardId };
  } catch (error) {
    // Fail the workflow run if an error occurs
    core.setFailed(error.message);
  }
}

module.exports = { fetchIds };

/**
 * The main function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
/* async function fetchIssueId({ issueNumber, owner, repo, octokit }) {
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
} */

/**
 * The main function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
/* async function fetchLabelId({ labelName, owner, repo, octokit }) {
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
} */

/* // this fetches the id of the repository, the id of the development branch
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
        branchName: branchToCopy
      }
    );

    if (!repository) return;

    const repoId = repository?.id;

    // prettier-ignore
    const lastDevCommitSHA = repository?.ref?.target?.history?.edges[0]?.node?.oid;
*/
