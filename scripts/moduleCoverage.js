const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

// module mapping
const moduleMapping = {
  calendar: "src/modules/calendar", 
//   admin: "src/modules/admin",
  cfm: "src/modules/cfm",
};

// Loading merged file
const mergedCoveragePath = path.resolve(".nyc_output/out.json");
if (!fs.existsSync(mergedCoveragePath)) {
  console.error("Merged coverage file not found: .nyc_output/out.json");
  process.exit(1);
}
const mergedCoverage = JSON.parse(fs.readFileSync(mergedCoveragePath, "utf-8"));

// Create module-specific outputs
for (const [moduleName, modulePath] of Object.entries(moduleMapping)) {
  const filteredCoverage = {};

  for (const filePath in mergedCoverage) {
    if (filePath.includes(modulePath)) {
      filteredCoverage[filePath] = mergedCoverage[filePath];
    }
  }

  if (Object.keys(filteredCoverage).length === 0) {
    console.warn(`No files matched for module: ${moduleName}`);
    continue;
  }

  const nycOutputDir = path.resolve(`.nyc_output_${moduleName}`);
  fs.mkdirSync(nycOutputDir, { recursive: true });

  const outJsonPath = path.join(nycOutputDir, "out.json");
  fs.writeFileSync(outJsonPath, JSON.stringify(filteredCoverage, null, 2));
  console.log(`Created filtered coverage for ${moduleName} in ${outJsonPath}`);

  // 4. Run NYC report for this module
  const reportDir = `coverage/${moduleName}`;
  try {
    execSync(
      `npx nyc report --reporter=html --report-dir=${reportDir} --temp-dir=${nycOutputDir}`,
      { stdio: "inherit" }
    );
    console.log(`📊 HTML report generated for module ${moduleName} at ${reportDir}/index.html\n`);
  } catch (err) {
    console.error(`❌ Failed to generate report for ${moduleName}`, err);
  }
}
