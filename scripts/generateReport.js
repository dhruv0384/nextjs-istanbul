// scripts/generateReport.js
const fs = require("fs");
const path = require("path");
const libCoverage = require("istanbul-lib-coverage");
const libReport = require("istanbul-lib-report");
const reports = require("istanbul-reports");
const { Writable } = require("stream");

// Parsing modules from CLI
const arg = process.argv.find((a) => a.startsWith("--module="));
if (!arg) {
  console.error("❌ Please provide --module=<name1,name2>");
  process.exit(1);
}
const modules = arg.split("=")[1].split(",");

// Accumulate summaries
const summaryRows = [];

modules.forEach((mod) => {
  const covJson = path.resolve(`module-coverage/${mod}/coverage-final.json`);
  if (!fs.existsSync(covJson)) {
    console.warn(`⚠️ No coverage data for module '${mod}', skipping.`);
    return;
  }

  // Load and map coverage
  const raw = JSON.parse(fs.readFileSync(covJson, "utf-8"));
  const coverageMap = libCoverage.createCoverageMap(raw);

  const reportDir = path.resolve(`coverage/${mod}`);
  fs.mkdirSync(reportDir, { recursive: true });

  //  context for HTML report
  const htmlContext = libReport.createContext({
    dir: reportDir,
    coverageMap,
    defaultSummarizer: "pkg",
  });

  reports.create("html").execute(htmlContext);

  // Text report

  const textContext = libReport.createContext({
    dir: reportDir,
    coverageMap,
    defaultSummarizer: "pkg",
  });

  let textOutput = "";
  const writer = new Writable({
    write(chunk, enc, cb) {
      textOutput += chunk.toString();
      cb();
    }
  });


  textContext.writer = writer;

  reports.create("text-summary").execute(textContext);

  // Extract raw counts + percentages
  const sum = coverageMap.getCoverageSummary().toJSON();
  summaryRows.push({
    module: mod,
    statements: `${sum.statements.pct}% (${sum.statements.covered}/${sum.statements.total})`,
    branches:   `${sum.branches.pct}% (${sum.branches.covered}/${sum.branches.total})`,
    functions:  `${sum.functions.pct}% (${sum.functions.covered}/${sum.functions.total})`,
    lines:      `${sum.lines.pct}% (${sum.lines.covered}/${sum.lines.total})`,
    link: `./${mod}/index.html`,
    textSummary: textOutput.trim(),
  });

  console.log(`Generated reports for '${mod}'`);
});

// Build master summary index.html
const masterDir = path.resolve("coverage");
fs.mkdirSync(masterDir, { recursive: true });

const tableRows = summaryRows.map(r => `
  <tr>
    <td>${r.module}</td>
    <td>${r.statements}</td>
    <td>${r.branches}</td>
    <td>${r.functions}</td>
    <td>${r.lines}</td>
    <td><a href="${r.link}" target="_blank">View</a></td>
  </tr>
`).join("");

const textSections = summaryRows.map(r => `
  <details>
    <summary><strong>${r.module} Text Summary</strong></summary>
    <pre>${r.textSummary}</pre>
  </details>
`).join("");

const masterHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Module Coverage Summary</title>
  <style>
    body { font-family: Arial, sans-serif; margin: 2rem; background: #f5f5f5; }
    table { width: 100%; border-collapse: collapse; background: white; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
    th, td { padding: 0.75rem 1rem; border: 1px solid #ddd; text-align: center; }
    th { background: #eee; }
    tr:hover { background: #fafafa; }
    details { margin: 1rem 0; padding: 1rem; background: white; border: 1px solid #ddd; border-radius: 4px; }
    pre { background: #fafafa; padding: 1rem; border-radius: 4px; overflow-x: auto; }
    a { color: #0366d6; text-decoration: none; }
    a:hover { text-decoration: underline; }
  </style>
</head>
<body>
  <h1>📊 Module Coverage Summary</h1>
  <table>
    <thead>
      <tr>
        <th>Module</th><th>Statements</th><th>Branches</th><th>Functions</th><th>Lines</th><th>Report</th>
      </tr>
    </thead>
    <tbody>${tableRows}</tbody>
  </table>

</body>
</html>
`;

fs.writeFileSync(path.join(masterDir, "index.html"), masterHtml, "utf-8");
console.log(`Master summary at: coverage/index.html`);