// https://docs.github.com/graphql

// packages
const core = require('@actions/core');

// files
const { wait } = require('./wait');
const { labelIssue } = require('./steps/label-issue');
const { createBranch } = require('./steps/create-branch');
const { createPR } = require('./steps/create-pr');

/* TODO: */
/* 
- read up on graphQL in order to do the more advanced automations not possible with the REST api

  - should be able:
    - to move items/issues in a project
    - assign a pull request to an issue ticket
    - assign an issue ticket to a pull request / repo
    - 
*/
/**
 * The main function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
async function run() {
  try {
    const ms = core.getInput('milliseconds', { required: true });

    // Debug logs are only output if the `ACTIONS_STEP_DEBUG` secret is true
    core.debug(`Waiting ${ms} milliseconds ...`);

    // Log the current timestamp, wait, then log the new timestamp
    core.debug(new Date().toTimeString());
    await wait(parseInt(ms, 10));
    core.debug(new Date().toTimeString());

    // Set outputs for other workflow steps to use
    core.setOutput('time', new Date().toTimeString());

    // labels the ticket "test"
    labelIssue();

    // creates a branch from the most recent commit to the development branch
    // await createBranch();

    // creates a pull request from the most recent commit and links it to the newly created branch
    // await createPR();
  } catch (error) {
    // Fail the workflow run if an error occurs
    core.setFailed(error.message);
  }
}

module.exports = {
  run
};
