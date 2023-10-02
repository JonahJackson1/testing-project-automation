```mermaid
---
title: Master Repo with Submodules Git Diagram
---
gitGraph
   commit
   commit
   branch SubmoduleA
   checkout SubmoduleA
   commit
   commit
   checkout main
   merge SubmoduleA
   commit
   branch SubmoduleB
   checkout SubmoduleB
   commit
   commit
   checkout main
   merge SubmoduleB
   commit
   commit

```

```mermaid
---
title: SubmoduleA Commit Diagram
---
gitGraph
   commit
   commit
   branch featureX
   checkout featureX
   commit
   commit
   checkout main
   merge featureX
   commit
   branch bugfixY
   checkout bugfixY
   commit
   checkout main
   merge bugfixY
   commit
   commit

```

---

## General overview

### **1. Initialize the Master Repository**

- **What**: Create a new repository or use an existing one as the master
  repository.
- **Why**: This will serve as the central hub that will contain references to
  all the submodules.

---

### **2. Add Submodules to the Master Repository**

- **What**: Use the `git submodule add <repository-url> <path>` command to add
  each submodule.
- **Why**: This links the specified submodule repository to the master
  repository at the given path.

---

### **3. Clone the Master Repository with Submodules**

- **What**: Use `git clone --recursive <master-repo-url>` to clone the master
  repository and all its submodules.
- **Why**: The `--recursive` flag ensures that all submodules and their content
  are fetched and checked out.

---

### **4. Update Submodules**

- **What**: After cloning, if there are changes in the submodule repositories,
  use `git submodule update --remote` to fetch the latest changes.
- **Why**: This ensures that your local submodules are up-to-date with their
  respective remote repositories.

---

### **5. Work within a Submodule**

- **What**: Navigate to the submodule's directory and treat it like any other
  Git repository—make changes, commit them, and push them.
- **Why**: Each submodule is essentially a separate Git repository, allowing you
  to manage its history independently.

---

### **6. Commit Submodule Changes in the Master Repository**

- **What**: After making changes in a submodule, navigate back to the master
  repository and commit the submodule's new state.
- **Why**: The master repository tracks the submodule's state (i.e., the commit
  it points to). This step ensures that the master repository references the
  latest commit of the submodule.

---

### **7. Pulling Changes with Updated Submodules**

- **What**: When pulling changes in the master repository that include submodule
  updates, use `git pull` followed by `git submodule update --recursive`.
- **Why**: This ensures that after updating the master repository, all
  submodules are also updated to their latest referenced commits.

---

### **8. Handling Merge Conflicts with Submodules**

- **What**: If there's a merge conflict involving a submodule, resolve the
  conflict by deciding which submodule state (commit) is the correct one to use.
- **Why**: Merge conflicts can arise if different branches reference different
  submodule states. Resolving the conflict ensures a consistent state across
  branches.

---

### **9. Removing a Submodule**

- **What**: To remove a submodule, delete its entry in the `.gitmodules` file,
  its configuration in the `.git/config` file, and untrack and remove its
  directory.
- **Why**: This ensures that the submodule is completely removed from the master
  repository and won't be fetched in future updates.

---

### **10. Regular Maintenance**

- **What**: Periodically run `git submodule foreach git pull origin main` (or
  the default branch of your submodule) to ensure all submodules are up-to-date.
- **Why**: This helps in keeping all submodules updated and reduces the chances
  of large, unexpected changes when updating them.

---

## Creating a new feature

### **1. Create a New Repository for the Feature**

- **What**: Initialize a new Git repository for the new feature. This can be
  done on platforms like GitHub, GitLab, etc.
- **Why**: This new repository will serve as the submodule for the specific
  feature you're developing.

---

### **2. Add the New Repository as a Submodule to the Master Repository**

- **What**: Navigate to the master repository locally and use the command
  `git submodule add <new-repo-url> <path/feature-name>`.
- **Why**: This links the new feature repository as a submodule to the master
  repository.

---

### **3. Clone the Master Repository with the New Submodule**

- **What**: If you're setting this up on a new machine or for a new developer,
  use `git clone --recursive <master-repo-url>`.
- **Why**: The `--recursive` flag ensures the new submodule and its content are
  fetched and checked out.

---

### **4. Navigate to the New Submodule Directory**

- **What**: Use `cd <path/feature-name>` to navigate into the submodule's
  directory.
- **Why**: This allows you to work directly within the submodule, treating it as
  its own standalone repository.

---

### **5. Create a New Branch for Development**

- **What**: Inside the submodule directory, use
  `git checkout -b feature-branch-name` to create a new branch.
- **Why**: It's a best practice to develop new features on separate branches,
  keeping the main branch stable.

---

### **6. Start Coding the Feature**

- **What**: Develop the feature as you would in any Git repository—write code,
  make commits, etc.
- **Why**: The submodule acts as an independent repository, allowing for
  isolated development of the feature.

---

### **7. Push Changes to the Feature Repository**

- **What**: Regularly push your changes to the remote feature repository using
  `git push origin feature-branch-name`.
- **Why**: This ensures that your changes are backed up remotely and allows
  other developers to see or collaborate on the feature.

---

### **8. Commit Submodule Changes in the Master Repository**

- **What**: After making significant progress or reaching milestones in the
  submodule, navigate back to the master repository and commit the submodule's
  new state.
- **Why**: The master repository tracks the submodule's state (i.e., the commit
  it points to). This step ensures that the master repository references the
  latest commit of the submodule.

---

### **9. Continue Development as Needed**

- **What**: Keep iterating on the feature, making commits in the submodule, and
  updating the master repository as necessary.
- **Why**: Continuous development and regular commits ensure that progress is
  tracked and that any issues can be pinpointed to specific changes.

---

### **10. Once the Feature is Complete**

- **What**: Merge the feature branch into the main branch of the submodule, then
  update the master repository to point to the merged state of the submodule.
- **Why**: This integrates the completed feature into the main codebase and
  ensures that the master repository references the stable version of the
  submodule.
