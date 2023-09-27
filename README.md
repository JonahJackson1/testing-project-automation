```mermaid
---
title: Basic issue flow
---
flowchart TD
  A[User opens an issue from a project]
  B[Create the linked branch]
  C[Create the pull request]
  D1[Add a comment to the pull request with the issue #]
  D2[Add a comment to the issue with the pull request #]
  E[Label issue as ready]
  F[Move to 'ready for development' column in the project]

  A --> B
  B --> C
  C --> D1
  C --> D2
  D1 --> E
  D2 --> E
  E --> F
```

```mermaid
---
title: Example github flow
---
gitGraph
  commit
  branch staging
  branch develop
  branch bugFix
  branch feature1
  checkout feature1
  commit
  commit
  commit
  checkout develop
  merge feature1
  checkout staging
  merge develop
  checkout main
  merge staging
  branch feature2
  checkout feature2
  commit id: "bug"
  commit
  checkout develop
  merge feature2
  checkout staging
  merge develop tag: "found a bug"
  checkout main
  branch feature3
  checkout feature3
  commit
  commit
  checkout bugFix
  merge staging
  commit tag: "fixed the bug"
  checkout develop
  merge bugFix tag: "merge bug fix"
  checkout feature3
  commit
  checkout develop
  merge feature3
  checkout staging
  merge develop
  checkout main
  merge staging
```

# To do

- [x] Label an issue
- [x] Create a new branch linked to the issue ticket
- [x] Create a pull request for the issue ticket
- [x] Link an issue and pull request together
  - [x] Add a comment to an issue with the pull #
  - [x] Add a comment to an pull request with the issue #
  - [ ] Actually link the tickets together
    - I haven't been able to find a way to link them together the same way a user can manually do it -- this is a work around
- [ ] fix locating a project card to find the specific issue, not just the newest created draft / issue
- [ ] check out https://docs.github.com/en/issues/managing-your-tasks-with-tasklists/about-tasklists
- [ ] check out milestones
- [x] ? create a workflow chart for a "draft issue" when it is converted to an issue
- [ ] Mark a branch as stale after after 30 commits behind / needs rebase
- [ ] Create a flowchart for a branch being created, what happens on commits, when it is ready to merge, etc.
- [ ] Create a flowchart for a project item from draft to completion
- [ ] 


# Links

## GraphQL

### Main pages 
- https://docs.github.com/graphql
- https://docs.github.com/en/graphql/overview/explorer
- https://docs.github.com/en/graphql/reference

### Random pages 
- https://medium.com/swlh/introduction-to-graphql-with-github-api-64ee8bb11630
- https://docs.github.com/en/graphql/guides/forming-calls-with-graphql#working-with-variables

### mutations 
- https://docs.github.com/en/graphql/reference/mutations#createissue
- https://docs.github.com/en/graphql/reference/mutations#updateissue
- https://docs.github.com/en/graphql/reference/mutations#linkprojectv2torepository
- https://docs.github.com/en/graphql/reference/mutations#linkrepositorytoproject
- https://docs.github.com/en/graphql/reference/mutations#updateprojectv2
- https://docs.github.com/en/graphql/reference/mutations#addpullrequestreview

### objects 
- https://docs.github.com/en/graphql/reference/objects#issue
- https://docs.github.com/en/graphql/reference/objects#projectv2
- https://docs.github.com/en/graphql/reference/objects#projectv2item
- https://docs.github.com/en/graphql/reference/objects#pullrequest

### interfaces 
- https://docs.github.com/en/graphql/reference/interfaces#repositorynode


## Learning github and flows

### github flow branching 
https://nvie.com/posts/a-successful-git-branching-model/

### gitflow 
https://docs.github.com/en/get-started/quickstart/github-flow

### learning games 
https://learngitbranching.js.org/
https://ohmygit.org/
