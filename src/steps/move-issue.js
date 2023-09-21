// // https://docs.github.com/en/graphql/guides/forming-calls-with-graphql#working-with-variables
// // https://docs.github.com/en/graphql/reference
// https://docs.github.com/en/rest/webhooks/repos?apiVersion=2022-11-28#ping-a-repository-webhook

// https://docs.github.com/en/graphql/reference/objects#projectv2
// https://docs.github.com/en/graphql/reference/objects#projectv2item
// https://docs.github.com/en/graphql/reference/mutations#linkprojectv2torepository
// https://docs.github.com/en/graphql/reference/mutations#linkrepositorytoproject
// https://docs.github.com/en/graphql/reference/mutations#updateprojectv2

// // will probably use this to trigger a webhook to move the item in a project
// // https://octokit.github.io/rest.js/v20#repos-create-dispatch-event
// // i guess this could be used to keep it in JS?
// // https://octokit.github.io/rest.js/v20#repos-create-webhook

// /*
//  **********************************************
//  **********************************************
//  *This will have to been done soley in graphQL*
//  **********************************************
//  **********************************************
//  */

// const core = require('@actions/core');
// const github = require('@actions/github');

// /**
//  * The main function for the action.
//  * @returns {Promise<void>} Resolves when the action is complete.
//  */
// async function moveIssue() {
//   try {
//     /**
//      * We need to fetch all the inputs that were provided to our action
//      * and store them in variables for us to use.
//      **/
//     // const project = core.getInput('project', { required: true });
//     // const columnName = core.getInput('column_name', { required: true });
//     // const issueNumber = core.getInput('issue_number', { required: true });
//     const token = core.getInput('token', { required: true });

//     /**
//      * Now we need to create an instance of Octokit which will use to call
//      * GitHub's REST API endpoints.
//      * We will pass the token as an argument to the constructor. This token
//      * will be used to authenticate our requests.
//      * You can find all the information about how to use Octokit here:
//      * https://octokit.github.io/rest.js/v18
//      **/
//     const octokit = new github.getOctokit(token);

//     const issue = github.context.payload.issue;

//     // First, use the GraphQL API to request the project's node ID.
//     const idResp = await octokit.graphql(
//       `query getProject{
//         user(login: JonahJackson1) {
//         projectV2(number: 1) {
//           id
//         }
//       }
//     }`
//     );

//     const projectId = idResp[ownerTypeQuery]?.projectV2.id;
//     const contentId = issue?.node_id;

//     // Next, use the GraphQL API to add the issue to the project.
//     // If the issue has the same owner as the project, we can directly
//     // add a project item. Otherwise, we add a draft issue.

//     await octokit.graphql(
//       `mutation updateProjectV2ItemFieldValue($input: AddProjectV2ItemByIdInput!) {
//         addProjectV2ItemById(input: $input) {
//           item {
//             id
//           }
//         }
//       }`,
//       {
//         input: {
//           projectId,
//           contentId
//         }
//       }
//     );

//     //
//   } catch (error) {
//     // Fail the workflow run if an error occurs
//     core.setFailed(error.message);
//   }
// }

// module.exports = { moveIssue };
