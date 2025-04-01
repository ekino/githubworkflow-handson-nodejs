# GITHUB ACTIONS HANDS-ON

Welcome to the GitHub Actions kata Ekino!  
(For Node.js project)

## What is GitHub Actions?

GitHub Actions is a CI/CD platform that allows you to automate your build, test, and deployment pipeline directly from your GitHub repository. It uses workflows defined in `.github/workflows` directory to execute jobs triggered by events like pushes, pull requests, or scheduled tasks.

## Prepare

- Clone the repository

```sh
git clone https://github.com/ekino/githubworkflow-handson-nodejs.git
cd githubworkflow-handson-nodejs
```

- Create a branch with your name  
  Example:

```sh
git checkout -b john
# git switch -c john
```

- Install the project dependencies

```sh
npm install
```

- Create the first empty commit from your account

```sh
git commit --allow-empty -m "Init kata john"
```

## Create Your First GitHub Actions Workflow

<details>
<summary>Expand</summary>

1. Create a `.github/workflows` directory in the root of your project if it doesn't exist:

```sh
mkdir -p .github/workflows
```

2. Create a new workflow file, for example `ci.yml`:

```sh
touch .github/workflows/ci.yml
```

3. Modify the `ci.yml` file:

```yaml
name: CI Pipeline

on:
  push:
    branches:
      - john #replace by your branch name

jobs:
  install:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 22

      - name: Install dependencies
        run: npm ci

      - name: Install biome
        run: npm install -D @biomejs/cli-linux-x64
```

4. Commit and push your workflow file:

```sh
git add .github/workflows/ci.yml
git commit -m "Add GitHub Actions workflow"
git push origin john
```

Once you push your changes, GitHub will automatically trigger the workflow.

5. Open your GitHub repository in a browser and navigate to the **Actions** tab to see your workflow running 🚀.

### 🔍 Explanation

- `name:` Sets the name of the GitHub Actions workflow.

- `on:` Defines when the pipeline should run:

  - On each push to the main branch.

- `jobs:` Defines the list of jobs to run.

- `install:`

- `runs-on:`

  - `ubuntu-latest:` Specifies that the job will run on an Ubuntu environment.

  - `steps:` Lists the steps of the job:

        1. Checkout repository – Clones the repository.

        2. Setup Node.js – Uses the latest Node.js 22 version.

        3. Install dependencies – Runs npm ci to install dependencies.

        4. Install biome – Installs @biomejs/cli-linux-x64 to avoid issues in GitHub Actions.

</details>

## 🚀 Using Artifacts and Cache in GitHub Actions

In GitHub Actions, artifacts and cache serve similar purposes as in GitLab CI:

- **Artifacts** are files generated during a job that you want to persist and share between stages (e.g., build outputs, test reports).
- **Cache** helps store dependencies or frequently used files to speed up workflow runs.

🔗 Refer to the [GitHub Actions documentation](https://docs.github.com/en/actions/using-workflows/caching-dependencies-and-builds) on caching and artifacts for more details.

### 🏋️ Exercise

1. Enhance the `install` job to include artifacts and cache configurations:

   - **Artifacts**: Save `node_modules/` as an artifact and set an expiration time of 2 weeks.
   - **Cache**: Use a cache key based on `package-lock.json` and enable pull-push behavior to reuse dependencies across jobs.

2. Commit your updated workflow
   - Push your changes to trigger the GitHub Actions workflow.

### 🎯 Correction

<details>
<summary>Expand</summary>

```yaml
name: CI Pipeline

on:
  push:
    branches:
      - john

jobs:
  install:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 22

      - name: Cache dependencies
        uses: actions/cache@v4
        with:
          path: node_modules
          key: node-modules-${{ hashFiles('package-lock.json') }}
          restore-keys: node-modules-

      - name: Install dependencies
        run: npm ci

      - name: Upload node_modules as an artifact
        uses: actions/upload-artifact@v4
        with:
          name: node-modules
          path: node_modules
          retention-days: 14
```

### 🔍 Explanation

#### `actions/cache`:

- Caches `node_modules/` based on `package-lock.json`.
- If `package-lock.json` changes, a new cache is created.
- Uses `restore-keys` for fallback cache retrieval.

#### `actions/upload-artifact`:

- Saves `node_modules/` as an artifact.
- The artifact remains available for 2 weeks (14 days).

💡 This setup ensures faster builds by caching dependencies and preserving files across jobs! 🚀

</details>

## 🚀 Adding a Lint Job in GitHub Actions

Linting helps detect potential errors, enforce coding standards, and maintain code quality.  
By adding a **lint job** in the pipeline, we ensure that all code adheres to best practices before merging changes.

🔗 Refer to the [GitHub Actions documentation](https://docs.github.com/en/actions/using-jobs/defining-job-dependencies) to learn more about job dependencies.

### 📝 Exercise

Enhance the workflow by:

1. Creating a new stage called **check**.
2. Adding a **lint job** that runs `npm run lint`.
3. Reusing `node_modules/` from the **install** job using GitHub Actions cache & artifacts.
4. Making **lint** depend on **install**, ensuring dependencies are installed first.
5. Commit your updated workflow
   - Push your changes to trigger the GitHub Actions workflow.
   - Verify that the **lint job** runs successfully in the **Actions** tab. 🚀

### 🎯 Correction

<details>
<summary>Expand</summary>

```yaml
name: CI Pipeline

on:
  push:
    branches:
      - john

jobs:
  install:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 22

      - name: Cache dependencies
        uses: actions/cache@v4
        with:
          path: node_modules
          key: node-modules-${{ hashFiles('package-lock.json') }}
          restore-keys: node-modules-

      - name: Install dependencies
        run: npm ci

      - name: Upload node_modules as an artifact
        uses: actions/upload-artifact@v4
        with:
          name: node-modules
          path: node_modules
          retention-days: 1

  lint:
    runs-on: ubuntu-latest
    needs: install # Ensures the install job completes first
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Download node_modules artifact
        uses: actions/download-artifact@v4
        with:
          name: node-modules
          path: node_modules

      - name: Run linter
        run: npm run lint
```

### 🔍 Explanation

### **install job**:

- Installs dependencies using `npm ci`.
- Caches `node_modules/` using `actions/cache` for efficiency.
- Uploads `node_modules/` as an artifact to be used in later jobs.

### **lint job**:

- Declares `needs: install`, ensuring that dependencies are installed first.
- Downloads `node_modules/` from the artifact saved in the **install** job.
- Runs `npm run lint` to check code quality.

### 💡 Why use both **cache** and **artifacts**?

- **Cache (`actions/cache`)** is shared between workflow runs (persists across multiple commits).
- **Artifacts (`actions/upload-artifact`)** are job-specific (persist only within the same workflow execution).

Using both ensures that dependencies are efficiently reused across jobs and across multiple workflow runs.

🚀 **This setup ensures faster builds and enforces linting rules before merging any code!**

</details>
Happy automating!
