const fs = require('fs');
const path = require('path');
const { minimatch } = require('minimatch');

const moduleMapping = require('./moduleMapping.json');

const arg = process.argv.find(arg => arg.startsWith('--module='));
const modules =
  !arg || arg === '--module='
    ? Object.keys(moduleMapping)
    : arg.split('=')[1].split(',').filter(Boolean);

if (modules.length === 0) {
  console.error('No modules provided and moduleMapping is empty.');
  process.exit(1);
}
const rawCoverage = JSON.parse(fs.readFileSync('coverage/coverage-final.json', 'utf-8'));

for (const mod of modules) {
  const patterns = moduleMapping[mod];
  if (!patterns) {
    console.warn(`No mapping found for module: ${mod}`);
    continue;
  }

  const filtered = {};
  for (const file in rawCoverage) {
    const normalizedFile = file.replace(/\\/g, '/');       // Normalize Windows paths to Unix style
    if (patterns.some(pattern => minimatch(normalizedFile, pattern))) {
      filtered[file] = rawCoverage[file];
    }
  }

  const outputDir = path.resolve(`module-coverage/${mod}`);
  fs.mkdirSync(outputDir, { recursive: true });
  fs.writeFileSync(`${outputDir}/coverage-final.json`, JSON.stringify(filtered, null, 2));

  console.log(`✅ Saved filtered coverage to ${outputDir}/coverage-final.json`);
}
