# GITHUB ACTIONS HANDS-ON

Welcome to the GitHub Actions kata Ekino!  
(For Node.js project)

## What is GitHub Actions?

GitHub Actions is a CI/CD platform that allows you to automate your build, test, and deployment pipeline directly from your GitHub repository. It uses workflows defined in `.github/workflows` directory to execute jobs triggered by events like pushes, pull requests, or scheduled tasks.

**Objective**:  
This kata is designed to introduce you to the concept of GitHub Actions, how to create CI/CD pipelines, and the benefits of automation in the development process. By completing each exercise, you'll learn how to configure and customize jobs, steps, and workflows in GitHub Actions.

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

## Part 1

### Job 1: Linting

**Exercise**:  
Create a job called `lint` that checks the code for linting errors. The job should run on an Ubuntu environment and execute the linting tool Biome.

**Tasks**:

1. Checkout the repository code.
2. Set up Node.js with version 22.
3. Install the required dependencies using `npm`.
4. Run the linting command (`npm run lint`).

<details>
<summary>Expand</summary>

**Solution**:

```yaml
lint:
  runs-on: ubuntu-latest
  steps:
    - name: Checkout repository
      uses: actions/checkout@v4

    - name: Setup Node.js
      uses: actions/setup-node@v4
      with:
        node-version: 22
        cache: "npm"

    - name: Install dependencies
      run: npm install

    - name: Run lint
      run: npm run lint
```

**Explanation:**

- `runs-on`: ubuntu-latest: This specifies that the job will run on the latest Ubuntu environment.
- `actions/checkout@v4`: This step checks out the repository's code.
- `biomejs/setup-biome@v2`: This sets up the Biome CLI tool to run linting.
- `biome ci`: This runs the Biome CLI with the ci command to check for linting issues.

#### What you’ve learned:

**Skills acquired:**

- 📦 **Basic GitHub Actions usage**: You used `actions/checkout@v4` to fetch the repository code, and `actions/setup-node@v4` to configure the Node.js environment.
- 🧹 **Code quality checks**: You integrated a linter (Biome) to automatically detect style issues, bugs, and inconsistencies in the codebase.
- ⚡️ **Workflow optimization**: By using the npm cache with `cache: "npm"`, you’ve seen how caching can significantly reduce CI execution time.

**Why it matters:**

Linting enforces clean, consistent code formatting and helps prevent common issues early. Automating this step ensures that every contributor follows the same coding standards, reducing noise during code reviews.

</details>

### Job 2: Type Checking

**Exercise**:  
Create a job called `verify-typescript-types` that checks for TypeScript type errors in the codebase. The job should:

1. Checkout the repository code.
2. Set up Node.js with version 22.
3. Install the required dependencies using `npm`.
4. Run the TypeScript type checking command (`npm run typing-check`).

<details>
<summary>Expand</summary>

**Solution**:

```yaml
verify-typescript-types:
  runs-on: ubuntu-latest
  steps:
    - name: Checkout repository
      uses: actions/checkout@v4

    - name: Setup Node.js
      uses: actions/setup-node@v4
      with:
        node-version: 22
        cache: "npm"

    - name: Install dependencies
      run: npm install

    - name: Verify typescript types
      run: npm run typing-check
```

**Explanation:**

- `actions/setup-node@v4`: This action sets up the Node.js environment, including caching npm dependencies to speed up future runs.

- `npm install`: This installs the project's dependencies.

- `npm run typing-check`: This runs the type-checking script to ensure there are no TypeScript errors in the code.

#### What you’ve learned:

**Skills acquired:**

- 👓 **Static analysis**: By running `npm run typing-check`, you executed a static TypeScript check to catch potential issues without running the code.
- 🔄 **Reusing workflow patterns**: This job follows the same structure as the linting one, showing how consistent, reusable workflow design makes pipelines easier to manage.
- 📘 **Separation of concerns**: Each job is focused on a single responsibility, improving clarity and maintainability of the CI configuration.

**Why it matters:**

Strong type checking helps catch bugs before runtime, increasing confidence in your codebase. Automating this guarantees type safety throughout the development lifecycle.

</details>

### Job 3: Test Coverage

**Exercise**:  
Create a job called `code-coverage` that runs the tests with coverage and reports the coverage results. The job should:

1. Checkout the repository code.
2. Set up Node.js with version 22.
3. Install the required dependencies using `npm`.
4. Run tests and generate coverage reports (`npm run coverage`).
5. Report the coverage results using a coverage report action.

<details>
<summary>Expand</summary>

**Solution**:

```yaml
code-coverage:
  runs-on: ubuntu-latest
  steps:
    - name: Checkout repository
      uses: actions/checkout@v4

    - name: Setup Node.js
      uses: actions/setup-node@v4
      with:
        node-version: 22
        cache: "npm"

    - name: Install dependencies
      run: npm install

    - name: Run code coverage
      run: npm run coverage

    - name: Report Coverage
      if: always()
      uses: davelosert/vitest-coverage-report-action@v2
```

**Explanation:**

- `actions/setup-node@v4`: This action sets up the Node.js environment, including caching npm dependencies to speed up future runs.

- `npm install`: This installs the project's dependencies.

- `npm run coverage`: This command runs the tests and generates coverage reports.

- `davelosert/vitest-coverage-report-action@v2`: This action is used to report the coverage results. The if: always() ensures that the coverage report is generated regardless of whether the tests pass or fail.

#### What you've learned:

**Skills acquired:**

- ✅ **Running tests in CI**: You configured GitHub Actions to automatically execute the test suite using `npm run coverage`.
- 📊 **Generating and reporting code coverage**: You used the third-party action `davelosert/vitest-coverage-report-action@v2` to visualize coverage results.
- 🧩 **Using external actions**: You explored how to integrate community actions to enhance CI/CD capabilities.

**Why it matters:**

Test coverage highlights which parts of the code are tested and which aren't, helping teams identify gaps and prioritize test writing. Reporting this coverage ensures visibility and encourages better test practices.

</details>

### Conclusion:

<details>
<summary>Expand</summary>

With these three jobs, you’ve built a basic **quality pipeline** for any Node.js project:

- **Linting** ensures a clean codebase.
- **Typing** ensures static correctness.
- **Testing & Coverage** ensure reliability and confidence.

You now know how to set up **automated checks on every push or pull request**, forming the foundation of a **collaborative development workflow**.

</details>
