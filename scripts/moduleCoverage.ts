import * as fs from 'fs';
import * as path from 'path';
import { minimatch } from 'minimatch';

// Enable JSON imports in tsconfig.json: "resolveJsonModule": true
interface ModuleMapping {
  [moduleName: string]: string[];
}

// Load module-to-glob-pattern mapping
import moduleMapping from './moduleMapping.json';

// CLI argument parsing for --module=<name1,name2>
const moduleArg = process.argv.find(arg => arg.startsWith('--module='));
const modules: string[] =
  !moduleArg || moduleArg === '--module='
    ? Object.keys(moduleMapping)
    : moduleArg.split('=')[1].split(',').filter(Boolean);

if (modules.length === 0) {
  console.error('No modules provided and moduleMapping is empty.');
  process.exit(1);
}

// Read the combined coverage JSON
const coveragePath = path.resolve('coverage/coverage-final.json');
if (!fs.existsSync(coveragePath)) {
  console.error(`Coverage file not found at ${coveragePath}`);
  process.exit(1);
}

const rawCoverage: Record<string, any> = JSON.parse(fs.readFileSync(coveragePath, 'utf-8'));

modules.forEach(mod => {
  const patterns = moduleMapping[mod];
  if (!patterns) {
    console.warn(`⚠️ No mapping found for module: ${mod}`);
    return;
  }

  const filtered: Record<string, any> = {};

  for (const filePath in rawCoverage) {
    // Normalize Windows paths to Unix-style
    const normalized = filePath.replace(/\\/g, '/');
    if (patterns.some(pattern => minimatch(normalized, pattern))) {
      filtered[filePath] = rawCoverage[filePath];
    }
  }

  // Prepare output directory and file
  const outputDir = path.resolve('module-coverage', mod);
  fs.mkdirSync(outputDir, { recursive: true });
  const outputFile = path.join(outputDir, 'coverage-final.json');

  fs.writeFileSync(outputFile, JSON.stringify(filtered, null, 2), 'utf-8');
  console.log(`✅ Saved filtered coverage to ${outputFile}`);
});
