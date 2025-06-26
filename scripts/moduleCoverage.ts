import * as fs from 'fs';
import * as path from 'path';
import { minimatch } from 'minimatch';
import { getModuleCoveragePath, getModuleObjectDir } from './utils/coveragePaths';
import { getModulesFromArgs } from './utils/getModules';
import { COVERAGE_OBJECT_PATH } from './constants';

interface ModuleMapping {
  [moduleName: string]: string[];
}

import moduleMapping from './moduleMapping.json';

const modules = getModulesFromArgs();

// Read the combined coverage JSON
if (!fs.existsSync(COVERAGE_OBJECT_PATH)) {
  console.error(`Coverage file not found at ${COVERAGE_OBJECT_PATH}`);
  process.exit(1);
}

const rawCoverage: Record<string, any> = JSON.parse(fs.readFileSync(COVERAGE_OBJECT_PATH, 'utf-8'));

modules.forEach(mod => {
  const patterns = moduleMapping[mod];
  if (!patterns) {
    console.warn(`⚠️ No mapping found for module: ${mod}`);
    return;
  }

  const filtered: Record<string, any> = {};

  for (const filePath in rawCoverage) {
    const normalized = filePath.replace(/\\/g, '/');              // Normalize Windows paths to Unix style
    if (patterns.some(pattern => minimatch(normalized, pattern))) {
      filtered[filePath] = rawCoverage[filePath];
    }
  }

  // Prepare output directory and file
  const outputDir = getModuleObjectDir(mod);
  fs.mkdirSync(outputDir, { recursive: true });
  const outputFile = getModuleCoveragePath(mod);

  fs.writeFileSync(outputFile, JSON.stringify(filtered, null, 2), 'utf-8');
  console.log(`✅ Saved filtered coverage to ${outputFile}`);
});
