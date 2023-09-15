import core from "@actions/core";
import github from "@actions/github";

const main = async () => {
  try {
    /**
     * We need to fetch all the inputs that were provided to our action
     * and store them in variables for us to use.
     **/
    const owner = core.getInput("owner", { required: true });
    const repo = core.getInput("repo", { required: true });
    const issue_number = core.getInput("issue_number", { required: true });
    const token = core.getInput("token", { required: true });

    /**
     * Now we need to create an instance of Octokit which will use to call
     * GitHub's REST API endpoints.
     * We will pass the token as an argument to the constructor. This token
     * will be used to authenticate our requests.
     * You can find all the information about how to use Octokit here:
     * https://octokit.github.io/rest.js/v18
     **/
    const octokit = new github.getOctokit(token);

    octokit.rest.issues.addLabels({
      owner,
      repo,
      issue_number,
      labels: ["test"],
    });
  } catch (error) {
    core.setFailed(error.message);
  }
};

// Call the main function to run the action
main();
