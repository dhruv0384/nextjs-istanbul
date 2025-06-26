import * as fs from 'fs';
import * as path from 'path';
import { minimatch } from 'minimatch';
import { createInstrumenter } from 'istanbul-lib-instrument';
import { createCoverageMap, CoverageMap } from 'istanbul-lib-coverage';
import { transform } from '@swc/core';
import { promisify } from 'util';
import globModule from 'glob';

const globAsync = promisify(globModule);
import { getModulesFromArgs } from './utils/getModules';
import { ROOT_DIR, SRC_DIR, MODULE_MAPPING_PATH, COVERAGE_OBJECT_PATH } from './constants';

// Load module mappings
const moduleMapping: Record<string, string[]> = JSON.parse(fs.readFileSync(MODULE_MAPPING_PATH, 'utf-8'));

type FileCoverage = any;

async function instrumentFile(filePath: string): Promise<FileCoverage> {
  const code = fs.readFileSync(filePath, 'utf-8');
  const { code: transpiled } = await transform(code, {
    filename: filePath,
    jsc: {
      parser: {
        syntax: 'typescript',
        tsx: filePath.endsWith('.tsx'),
      },
      transform: {
        react: {
          runtime: 'automatic',
        },
      },
    },
  });

  const instrumenter = createInstrumenter({ produceSourceMap: false });
  instrumenter.instrumentSync(transpiled, filePath);
  return instrumenter.fileCoverage;
}

function fileMatchesModule(relativePath: string, moduleName: string): boolean {
  const patterns = moduleMapping[moduleName] || [];
  return patterns.some((pattern: string) => minimatch(relativePath, pattern));
}

async function collectUncoveredCoverage(
  selectedModules: string[],
  existingCoverageMap: typeof CoverageMap.prototype
): Promise<void> {
  const allFiles = await globAsync('**/*.{ts,tsx}', {
    cwd: SRC_DIR,
    absolute: true,
    ignore: ['**/*.d.ts', '**/__tests__/**'],
  });

  const alreadyCoveredFiles = new Set<string>(existingCoverageMap.files());

  for (const fileAbsPath of allFiles) {
    const fileRelPath = path.relative(ROOT_DIR, fileAbsPath);

    const belongsToModule = selectedModules.some(module => fileMatchesModule(fileRelPath, module));

    // Skip if not part of selected module
    if (!belongsToModule) continue;

    // Skip if already in coverage
    if (alreadyCoveredFiles.has(fileAbsPath)) continue;

    try {
      const fileCoverage = await instrumentFile(fileAbsPath);
      existingCoverageMap.addFileCoverage(fileCoverage);
      console.log(`➡️  Adding file: ${fileRelPath}`);
    } catch (err: any) {
      console.warn(`Failed to instrument ${fileAbsPath}: ${err.message}`);
    }
  }
}

async function run(): Promise<void> {
  const selectedModules = getModulesFromArgs();

  // Load existing coverage-final.json
  const existingCoverageMap = fs.existsSync(COVERAGE_OBJECT_PATH)
    ? createCoverageMap(JSON.parse(fs.readFileSync(COVERAGE_OBJECT_PATH, 'utf-8')))
    : createCoverageMap({});

  // Directly update this map with uncovered files
  await collectUncoveredCoverage(selectedModules, existingCoverageMap);

  // Write back to file
  fs.writeFileSync(COVERAGE_OBJECT_PATH, JSON.stringify(existingCoverageMap.toJSON(), null, 2));
  console.log('✅ Successfully merged *new uncovered files* into coverage-final.json');
}

run().catch(e => {
  console.log(e);
  process.exit(1);
});
