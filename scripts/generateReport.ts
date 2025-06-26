import * as fs from "fs";
import * as path from "path";
import { createCoverageMap, CoverageMap } from "istanbul-lib-coverage";
import { createContext, ReportContext } from "istanbul-lib-report";
import { create as createReport } from "istanbul-reports";
import { Writable } from "stream";
import moduleMapping from "./moduleMapping.json";
import {
  getModuleCoveragePath,
  getModuleReportDir,
} from "./utils/coveragePaths";

type SummaryRow = {
  module: string;
  statements: string;
  branches: string;
  functions: string;
  lines: string;
  link: string;
  textSummary: string;
};


const arg = process.argv.find((a) => a.startsWith("--module="));
const modules: string[] =
  !arg || arg === "--module="
    ? Object.keys(moduleMapping)
    : arg.split("=")[1].split(",").filter(Boolean);

if (modules.length === 0) {
  console.error("No modules provided and moduleMapping is empty.");
  process.exit(1);
}


const summaryRows: SummaryRow[] = [];

for (const mod of modules) {
  const covJson = getModuleCoveragePath(mod);
  if (!fs.existsSync(covJson)) {
    console.warn(`⚠️ No coverage data for module '${mod}', skipping.`);
    continue;
  }

  // load raw coverage JSON and build a CoverageMap
  const raw = JSON.parse(fs.readFileSync(covJson, "utf-8"));
  const coverageMap: CoverageMap = createCoverageMap(raw);

  // ensure report directory exists
  const reportDir = getModuleReportDir(mod);
  fs.mkdirSync(reportDir, { recursive: true });

  // HTML report
  const htmlContext: ReportContext = createContext({
    dir: reportDir,
    coverageMap,
    defaultSummarizer: "pkg",
  });
  createReport("html").execute(htmlContext);

  // Text-summary report (capture output in a string)
  const textContext: ReportContext = createContext({
    dir: reportDir,
    coverageMap,
    defaultSummarizer: "pkg",
  });
  let textOutput = "";
  textContext.writer = new Writable({
    write(chunk, _enc, cb) {
      textOutput += chunk.toString();
      cb();
    },
  });
  createReport("text-summary").execute(textContext);

  // pull metrics
  const sum = coverageMap.getCoverageSummary().toJSON();
  summaryRows.push({
    module: mod,
    statements: `${sum.statements.pct}% (${sum.statements.covered}/${sum.statements.total})`,
    branches: `${sum.branches.pct}% (${sum.branches.covered}/${sum.branches.total})`,
    functions: `${sum.functions.pct}% (${sum.functions.covered}/${sum.functions.total})`,
    lines: `${sum.lines.pct}% (${sum.lines.covered}/${sum.lines.total})`,
    link: `./${mod}/index.html`,
    textSummary: textOutput.trim(),
  });

  console.log(`Generated reports for '${mod}'`);
}

const masterDir = path.resolve("coverage");
fs.mkdirSync(masterDir, { recursive: true });

const tableRows = summaryRows
  .map(
    (r) => `
  <tr>
    <td>${r.module}</td>
    <td>${r.statements}</td>
    <td>${r.branches}</td>
    <td>${r.functions}</td>
    <td>${r.lines}</td>
    <td><a href="${r.link}" target="_blank">View</a></td>
  </tr>`
  )
  .join("");

const masterHtml = `<!DOCTYPE html>
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
</html>`;

fs.writeFileSync(path.join(masterDir, "index.html"), masterHtml, "utf-8");
console.log("Master summary at: coverage/index.html");
