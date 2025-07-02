# GITHUB ACTIONS HANDS-ON

Welcome to the GitHub Actions kata Ekino!  
(For Node.js project)

## What is GitHub Actions?

GitHub Actions is a CI/CD platform that allows you to automate your build, test, and deployment pipeline directly from your GitHub repository. It uses workflows defined in `.github/workflows` directory to execute jobs triggered by events like pushes, pull requests, or scheduled tasks.

**Objective**:  
This kata is designed to introduce you to the concept of GitHub Actions, how to create CI/CD pipelines, and the benefits of automation in the development process. By completing each exercise, you'll learn how to configure and customize jobs, steps, and workflows in GitHub Actions.

## Getting started

### Prerequisites

Before starting, make sure you have the following tools installed on your machine:

- **Git**: To clone the repository and manage branches.  
  [Download Git](https://git-scm.com/downloads)

- **Node.js (version 22)** and **npm**: Required to run the project and install dependencies.  
  [Download Node.js](https://nodejs.org/en/download)

- **Docker** (optional, for the Docker build & push part):  
  [Get Docker](https://www.docker.com/products/docker-desktop/)

You will also need a **GitHub account** with access to the repository.

- Clone the repository

```sh
git clone https://github.com/ekino/githubworkflow-handson-nodejs.git
cd githubworkflow-handson-nodejs
```

- Create your own branch  
  Example:

```sh
git checkout -b john
# or git switch -c john
```

- Install the project dependencies

```sh
npm install
```

- Create the first empty commit from your account

```sh
git commit --allow-empty -m "chore: init kata john"
```

- Create a folder `.github/workflows`.
- Add `ci.yml` inside.
- To make your workflow work, you need to add a trigger to your YML file. Several triggers are documented [in the official documentation](https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions#on). For the purpose of the katas, we will use a trigger that activates only on your branch.

```sh
on:
  push:
    branches:
      - john
```

### Documentation

For each exercise, you'll probably need the documentation for each community GitHub Action.
Here's a list of the actions used in this kata.

- [actions/checkout](https://github.com/actions/checkout)
- [actions/setup-node](https://github.com/actions/setup-node)
- [davelosert/vitest-coverage-report-action](https://github.com/davelosert/vitest-coverage-report-action)
- [docker/setup-buildx-action](https://github.com/docker/setup-buildx-action)
- [docker/login-action](https://github.com/docker/login-action)
- [docker/metadata-action](https://github.com/docker/metadata-action)
- [docker/build-push-action](https://github.com/docker/build-push-action)

### Job 1: Linting

**Exercise**:  
Create a job called `lint` that checks the code for linting errors. The job should run on an Ubuntu environment and execute the linting tool Biome.

**Tasks**:

1. Checkout the repository code.
2. Set up Node.js with version 22.
3. Install the required dependencies using `npm`.
4. Run the linting command (`npm run lint`).

### Job 2: Type Checking

**Exercise**:  
Create a job called `verify-typescript-types` that checks for TypeScript type errors in the codebase. The job should:

1. Checkout the repository code.
2. Set up Node.js with version 22.
3. Install the required dependencies using `npm`.
4. Run the TypeScript type checking command (`npm run typing-check`).

### Job 3: Test Coverage

**Exercise**:  
Create a job called `code-coverage` that runs the tests with coverage and reports the coverage results. The job should:

1. Checkout the repository code.
2. Set up Node.js with version 22.
3. Install the required dependencies using `npm`.
4. Run tests and generate coverage reports (`npm run coverage`).
5. Report the coverage results using a coverage report action.

### Job 4: Docker Build and Push

**Exercise**:  
Create a job called `build-and-push` that builds a Docker image from the Dockerfile and pushes it to GitHub Container Registry (GHCR). The job should:

1. Only run when the previous jobs (lint, verify-typescript-types, code-coverage) have completed successfully
2. Checkout the repository code
3. Set up Docker Buildx for multi-platform builds
4. Log in to GitHub Container Registry using GitHub secrets
5. Extract metadata from Git for proper image tagging
6. Build and push the Docker image with appropriate tags
