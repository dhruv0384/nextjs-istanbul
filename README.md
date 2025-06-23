
# Frontend Code Coverage Tool for JavaScript + Selenium

This project provides a structured and modular approach to measuring code coverage in a Next.js application using Selenium-based end-to-end (E2E) testing. It enables per-module test coverage reporting and supports manual instrumentation for uncovering files not touched by default test runs.


## Setup Instructions

1. Install Dependencies

```bash
    npm install
```

2. Setup Java Environment:
Ensure chromedriver is accessible and Java is installed on your system.

3. Confiure the modules
Define file glob patterns for each logical module in moduleMapping.json:
```json
    {
        "calendar": ["src/calendar/**"],
        "cfm": ["src/cfm/**"]
    }
```

## CLI Commands
These commands are defined in the package.json and can be run via npm run <command>

1. testAndMerge
```bash
    npm run testAndMerge
```
- Compiles and runs all Selenium tests.
- Captures per-test coverage using __coverage__ and merges them into coverage/coverage-final.json.

2. mergeUncoveredFiles
```bash
    npm run mergeUncoveredFiles --module=<modulename>
```
- Manually instruments and adds uncovered but relevant files (not hit by Selenium tests) to the overall coverage.
- Example
```bash
    npm run mergeUncoveredFiles --module=cfm,calendar
```

3. filterCoverage
```bash
    npm run filterCoverage --module=<modulename>
```
- Filters coverage-final.json to extract only the files belonging to the specified module.
- Output: module-coverage/<modulename>/coverage-final.json

4. generateModuleReport
```bash
    npm run generateModuleReport --module=<modulename>
```
- Generates an HTML report and a text-summary for the selected module.
- Output:
    - HTML: coverage/<modulename>/index.html
    - Summary: embedded inside coverage/index.html

5. testCoverage
```bash
    npm run testCoverage --module=<modulename>
```
- Runs the entire pipeline:    
    - Run tests + extract coverage
    - Manually instrument & add uncovered files
    - Filter module-specific coverage
    - Generate report
    - Auto-opens the coverage dashboard in browser
## Output
After running testCoverage, navigate to:

```bash
    coverage/index.html
```

You’ll find:

- A master table summarizing statements, branches, functions, and line coverage per module

- Clickable links to individual module reports

- Detailed reports (per file) inside each module folder
## Notes
- Make sure you’ve run your Next.js app (npm run dev) on http://localhost:3000 before running Selenium tests.

- Ensure that chromedriver matches your local Chrome version.

- Module mapping patterns must accurately match the file paths you want to include in a module.