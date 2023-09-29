// create a pull request
// https://docs.github.com/en/rest/pulls/pulls?apiVersion=2022-11-28#create-a-pull-request
// update a pull request's branch
// https://docs.github.com/en/rest/pulls/pulls?apiVersion=2022-11-28#update-a-pull-request-branch

// https://docs.github.com/en/graphql/reference/objects#pullrequest
// https://docs.github.com/en/graphql/reference/mutations#createpullrequest

const core = require('@actions/core');

/* TODO:

- [x] get the project id
- [x] get the field id of the status column
- [x] find the id of status "ready"
- [ ] link the pull request to the project card / issue
- [x] update the status to "ready"



need to be be able to find a specific project card -- right now we are only finding the latest project card. 

   - might be able to fix it by going through the project instead
   - could run two seperate workflows at the same time

*/

/**
 * The main function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
async function doProjectStuff({
  projectCardId,
  projectId,
  fieldId,
  payloadObj,
  octokit
}) {
  try {
    const res = await octokit.graphql(
      `
      mutation UpdateStatusOfProjCard($item: ID!, $project: ID!, $field: ID!, $payload: ProjectV2FieldValue!) {
        updateProjectV2ItemFieldValue(
          input: {projectId: $project, itemId: $item, fieldId: $field, value: $payload}
        ) {
          projectV2Item {
            id
          }
        }
      }
      `,
      {
        field: fieldId || 'PVTSSF_lAHOBk645c4AVbXfzgNsVfc',
        item: projectCardId || 'PVTI_lAHOBk645c4AVbXfzgJgFoE',
        project: projectId || 'PVT_kwHOBk645c4AVbXf',
        payload: payloadObj || { singleSelectOptionId: '4b2fdd91' }
      }
    );

    console.log(res);

    console.log('successfully did the project stuff');
    return { success: true };
  } catch (error) {
    console.log('failed to do project stuff');
    console.log(error);
    // Fail the workflow run if an error occurs
    core.setFailed(error.message);
    return { success: false };
  }
}

module.exports = { doProjectStuff };

// https://docs.github.com/en/issues/planning-and-tracking-with-projects/automating-your-project/using-the-api-to-manage-projects

/* 
// this returns the name and id of the fields

query GetProjectId($owner: String!, $repo: String!) {
  repository(owner: $owner, name: $repo) {
    projectsV2(first: 1) {
      nodes {
        title
        number
        id
        fields(first: 20) {
          nodes {
            ... on ProjectV2FieldCommon {
              __typename
              id
              name
            }
          }
        }
      }
    }
  }
}
*/

/* 
// this returns every field and the subfields

query GetProjectId($owner: String!, $repo: String!) {
  repository(owner: $owner, name: $repo) {
    projectsV2(first: 1) {
      nodes {
        title
        number
        id
        fields(first: 20) {
          nodes {
            ... on ProjectV2Field {
              id
              name
            }
            ... on ProjectV2IterationField {
              id
              name
              configuration {
                iterations {
                  startDate
                  id
                }
              }
            }
            ... on ProjectV2SingleSelectField {
              id
              name
              options {
                id
                name
              }
            }
          }
        }
      }
    }
  }
}

*/

/* 
// this is the returned fields and subfields from the above query

{
  "data": {
    "repository": {
      "projectsV2": {
        "nodes": [
          {
            "title": "testing project workflows and github actions",
            "number": 1,
            "id": "PVT_kwHOBk645c4AVbXf",
            "fields": {
              "nodes": [
                {
                  "id": "PVTF_lAHOBk645c4AVbXfzgNsVfU",
                  "name": "Title"
                },
                {
                  "id": "PVTF_lAHOBk645c4AVbXfzgNsVfY",
                  "name": "Assignees"
                },
                {
                  "id": "PVTSSF_lAHOBk645c4AVbXfzgNsVfc",
                  "name": "Status",
                  "options": [
                    {
                      "id": "29536673",
                      "name": "🆕 New"
                    },
                    {
                      "id": "4044f4ca",
                      "name": "📋 Backlog"
                    },
                    {
                      "id": "4b2fdd91",
                      "name": "Ready"
                    },
                    {
                      "id": "017d1c1e",
                      "name": "🏗 In progress"
                    },
                    {
                      "id": "198d83de",
                      "name": "👀 In review"
                    },
                    {
                      "id": "b9b25c34",
                      "name": "✅ Done"
                    }
                  ]
                },
                {
                  "id": "PVTF_lAHOBk645c4AVbXfzgNsVfg",
                  "name": "Labels"
                },
                {
                  "id": "PVTF_lAHOBk645c4AVbXfzgNsVfk",
                  "name": "Linked pull requests"
                },
                {
                  "id": "PVTF_lAHOBk645c4AVbXfzgNsVfs",
                  "name": "Reviewers"
                },
                {
                  "id": "PVTF_lAHOBk645c4AVbXfzgNsVfw",
                  "name": "Repository"
                },
                {
                  "id": "PVTF_lAHOBk645c4AVbXfzgNsVf0",
                  "name": "Milestone"
                },
                {
                  "id": "PVTSSF_lAHOBk645c4AVbXfzgNsVig",
                  "name": "Priority",
                  "options": [
                    {
                      "id": "34f31df0",
                      "name": "🌋 Urgent"
                    },
                    {
                      "id": "587b547f",
                      "name": "🏔 High"
                    },
                    {
                      "id": "12ca4b8f",
                      "name": "🏕 Medium"
                    },
                    {
                      "id": "88410b46",
                      "name": "🏝 Low"
                    }
                  ]
                },
                {
                  "id": "PVTSSF_lAHOBk645c4AVbXfzgNsVik",
                  "name": "Size",
                  "options": [
                    {
                      "id": "26c1c5a8",
                      "name": "🐋 X-Large"
                    },
                    {
                      "id": "64b85857",
                      "name": "🦑 Large"
                    },
                    {
                      "id": "89951593",
                      "name": "🐂 Medium"
                    },
                    {
                      "id": "cf052b26",
                      "name": "🐇 Small"
                    },
                    {
                      "id": "cf6c1408",
                      "name": "🦔 Tiny"
                    }
                  ]
                }
              ]
            }
          }
        ]
      }
    }
  }
}

*/
