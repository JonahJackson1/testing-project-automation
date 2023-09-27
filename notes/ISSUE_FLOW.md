- Feature card is drafted in project

- Feature card is converted to an issue

  - Feature branch is created
  - Pull request is opened for new feature branch
  - Feature issue is labeled "ready for dev"

- Feature branch is committed to

  - Comment is added to pull request detailing changes on feature branch
  - Feature branch is linted
  - Feature branch passes linting checks
  - Automated tests are run on the feature branch
  - Feature branch passes all automated tests

- Feature branch is committed to

  - Comment is edited on the pull request detailing the new changes
  - Feature branch is linted
  - Feature branch passes linting checks
  - Automated tests are run on the feature branch
  - Feature branch passes all automated tests

- Developer tags PR for review

  - Code reviewers are assigned to the PR

- Code reviewers provide feedback on the PR

- Feedback is addressed, and necessary changes are made to the feature branch

- Feature branch is committed to again with changes based on feedback

  - Comment is edited on the pull request detailing the changes made based on
    feedback
  - Feature branch is linted again
  - Feature branch passes linting checks after feedback changes
  - Automated tests are run again on the feature branch
  - Feature branch passes all automated tests post-feedback

- Code reviewers approve the PR

  - PR is merged into the main branch
  - Continuous integration builds and tests the main branch with the new feature
  - Main branch passes all tests and builds successfully

- Changes are deployed to a staging environment for further testing

- QA team tests the new feature in the staging environment

  - Any issues found in staging are reported and addressed
  - Once all issues are resolved and the feature is stable in staging,
    preparations for production deployment begin

- Backup of critical data is taken before deploying the new feature to
  production

- New feature is deployed to production

- Post-deployment monitoring is initiated to ensure smooth performance

- Users are notified of the new feature
  - Feedback is gathered from users about the new feature
  - Any reported issues or feedback from users are addressed in subsequent
    updates.
