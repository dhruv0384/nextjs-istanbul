const fs = require('fs');
const path = require('path');
const { minimatch } = require('minimatch');

const arg = process.argv.find(arg => arg.startsWith('--module='));
if (!arg) {
  console.error('Please provide --module=<name1,name2>');
  process.exit(1);
}
const modules = arg.split('=')[1].split(',');
const moduleMapping = require('./moduleMapping.json');
const rawCoverage = JSON.parse(fs.readFileSync('coverage/coverage-final.json', 'utf-8'));

for (const mod of modules) {
  const patterns = moduleMapping[mod];
  if (!patterns) {
    console.warn(`No mapping found for module: ${mod}`);
    continue;
  }

  const filtered = {};
  for (const file in rawCoverage) {
    const normalizedFile = file.replace(/\\/g, '/');
    if (patterns.some(pattern => minimatch(normalizedFile, pattern))) {
      filtered[file] = rawCoverage[file];
    }
  }

  const outputDir = path.resolve(`module-coverage/${mod}`);
  fs.mkdirSync(outputDir, { recursive: true });
  fs.writeFileSync(`${outputDir}/coverage-final.json`, JSON.stringify(filtered, null, 2));

  console.log(`✅ Saved filtered coverage to ${outputDir}/coverage-final.json`);
}
