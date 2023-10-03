10.3.2023

### **Setting Up the Master Repository within an Organization**:

1. **Log in to GitHub**:

   - Navigate to [GitHub](https://github.com/) and log in using your
     credentials.

2. **Access the Organization**:

   - From the top right corner, click on your profile picture and select your
     organization from the dropdown.

3. **Create a New Repository**:

   - Click on the "New" button (usually green in color) to create a new
     repository.
   - Name the repository (e.g., "MasterRepo").
   - Choose the visibility (public or private).
   - Optionally, initialize the repository with a README, .gitignore, or
     license.
   - Click on the "Create repository" button.

4. **Clone the Master Repository Locally**:
   - Open your terminal or command prompt.
   - Navigate to the directory where you want to clone the repository.
   - Use the command:
     `git clone https://github.com/<organization-name>/MasterRepo.git`

### **Setting Up Submodule Repositories and Adding Them to the Master Repository**:

1. **Create Submodule Repositories**:

   - Follow the same steps as above (2-3) to create submodule repositories
     within the organization. Name them appropriately based on their
     functionality (e.g., "AuthModule", "DatabaseModule").

2. **Add Submodule to the Master Repository**:

   - Navigate to the directory of the cloned master repository on your local
     machine (using the terminal or command prompt).
   - Use the command:
     `git submodule add https://github.com/<organization-name>/<SubmoduleName>.git <path/optional-directory-name>`
     - Replace `<SubmoduleName>` with the name of your submodule repository.
     - Replace `<path/optional-directory-name>` with the directory path where
       you want the submodule to reside within the master repository. If you
       don't provide a directory name, it will use the repository name by
       default.

3. **Commit and Push Changes**:

   - After adding the submodule, you'll notice that the master repository has
     tracked the changes (the new submodule).
   - Commit these changes using:
     ```
     git add .
     git commit -m "Added <SubmoduleName> as a submodule."
     ```
   - Push the changes to the remote master repository: `git push origin main`

4. **Repeat for Other Submodules**:

   - For each submodule repository you want to add, repeat step 2.

5. **Clone the Master Repository with Submodules**:

   - If you or another developer wants to clone the master repository along with
     all its submodules, use:
     `git clone --recursive https://github.com/<organization-name>/MasterRepo.git`
   - The `--recursive` flag ensures that all submodules are also cloned.

6. **Updating Submodules**:
   - Over time, as changes are made to submodule repositories, you'll want to
     pull those changes into your master repository.
   - To update a specific submodule, navigate to its directory and pull the
     latest changes.
   - Alternatively, from the root of the master repository, you can use
     `git submodule update --remote` to update all submodules to their latest
     commits.

By following these steps, you'll have a master repository set up within your
organization that contains references to multiple submodule repositories. This
structure allows for modular development while maintaining a centralized
repository for the overarching project.
