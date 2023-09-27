## 1. **Idea Drafting**:

- **What**:
  - Ideas for new features, enhancements, or fixes are initially drafted on a
    project board.
- **Why**:
  - **Visualization**: Project boards provide a visual representation of the
    development pipeline, making it easier to track progress.
  - **Collaboration**: Team members can discuss, prioritize, and refine ideas in
    a centralized location.

---

### 2. **Issue Creation**:

- **What**:
  - Once the idea is fully fleshed out, including design and other necessary
    details, it's converted into an issue.
- **Why**:
  - **Documentation**: Issues provide a detailed description of the task,
    ensuring everyone understands the requirements.
  - **Tracking**: Issues can be assigned, labeled, and tracked, ensuring
    accountability and progress monitoring.

---

### 3. **Branch Creation & Feature Branching**:

- **What**:
  - A new branch is created, linked to the issue. This ensures that the
    development work related to that issue is isolated from other tasks. Instead
    of developing directly on the main branch (often called `main` or `master`),
    every new feature, enhancement, or bugfix is developed on its own branch.
- **Why**:
  - **Isolation**: Separate branches allow for focused development without
    interference from other ongoing tasks.
  - **Traceability**: Linking branches to issues provides clear traceability of
    code changes to specific tasks.
  - **Stability**: The main branch remains stable and deployable at all times.
  - **Parallel Development**: Multiple features or fixes can be developed in
    parallel without interfering with each other.

---

### 4. **Pull Request Initiation**:

- **What**:
  - As soon as the branch is created, a pull request (PR) is opened. This PR
    will propose merging the new branch into a designated target branch
    (release, development, or staging). As soon as a PR is created or updated,
    tests are automatically run to ensure the new code doesn't introduce bugs.
- **Why**:
  - **Early Feedback**: Opening a PR early allows for continuous feedback during
    development.
  - **Integration**: It ensures that the new code will be integrated smoothly
    into the target branch once it's ready.
  - **Quality Assurance**: Ensure that new changes don't break existing
    functionality.
  - **Immediate Feedback**: Developers get immediate feedback if their changes
    pass or fail the tests.

---

### 5. **Automated Labeling - Ready to Code**:

- **What**:
  - An automated process adds a label "ready to code" to the issue, indicating
    to the developer that they can start working on the feature.
- **Why**:
  - **Status Indication**: Labels provide a quick visual indication of the
    status of an issue.
  - **Automation**: Reduces manual steps and ensures timely notifications.

---

### 6. **Developer Tagging for Review**:

- **What**:
  - Once the developer feels the feature or fix is ready for review, they
    manually add a tag to the PR to notify code reviewers.
- **Why**:
  - **Communication**: Ensures that code reviewers are aware that the PR is
    ready for their attention.
  - **Efficiency**: Streamlines the review process by clearly indicating when a
    PR is ready for review.

---

### 7. **Code Review**:

- **What**:
  - Before a PR is merged, it's reviewed by one or more team members.
- **Why**:
  - **Knowledge Sharing**: Team members become familiar with changes and reasons
    behind them.
  - **Mentoring**: Junior developers can learn from seniors through the review
    process.
  - **Error Detection**: More eyes on the code mean a higher chance of catching
    mistakes or areas of improvement.

---

### 8. **Merging & Continuous Integration**:

- **What**:
  - After the PR is reviewed and approved, it's merged into the main branch. The
    main branch is then automatically built and tested.
- **Why**:
  - **Up-to-date Main Branch**: The main branch always contains the latest
    approved changes.
  - **Ready for Deployment**: After passing all tests, the main branch remains
    in a state ready for deployment to production.

---

### 9. **Release Preparation**:

- **What**:
  - As the team approaches a release, a separate branch (often called a release
    branch) is created. This branch is dedicated to finalizing the release.
- **Why**:
  - **Focus**: The team can focus on final testing, bug fixes, and documentation
    updates without being disrupted by new features.
  - **Stability**: Ensures that the release is stable and thoroughly tested
    before it reaches users.

---

### 10. **Tagging and Release**:

- **What**:
  - Once the release is ready, the commit is tagged with a version number. A
    GitHub release is then created using this tag, and any relevant binaries,
    assets, or notes are attached.
- **Why**:
  - **Versioning**: Tags provide a clear version history, making it easy to
    track changes over time.
  - **Documentation**: Releases in GitHub allow for release notes, providing
    users with information about changes, fixes, and new features.
