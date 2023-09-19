// packages
const core = require('@actions/core');

// files
// const { labelIssue } = require('./label-issue');
const { createBranch } = require('./create-branch');

/**
 * The main function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
async function run() {
  try {
    // call label-issue.js
    // labelIssue();
    createBranch();
  } catch (error) {
    // Fail the workflow run if an error occurs
    core.setFailed(error.message);
  }
}

module.exports = {
  run
};
