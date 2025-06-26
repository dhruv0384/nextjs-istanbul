const fs = require('fs');
const path = require('path');
const { minimatch } = require('minimatch');
const { createInstrumenter } = require('istanbul-lib-instrument');
const { createCoverageMap, CoverageMap } = require('istanbul-lib-coverage');
const { transform } = require('@swc/core');
const { promisify } = require('util');
const glob = require('glob');

const globAsync = promisify(glob);

const ROOT_DIR = path.resolve();
const SRC_DIR = path.join(ROOT_DIR, 'src');
const COVERAGE_FINAL = path.join(ROOT_DIR, 'coverage/coverage-final.json');
const MODULE_MAPPING_PATH = path.join(__dirname, 'moduleMapping.json');

// Load module mappings
const moduleMapping: Record<string, string[]> =
  JSON.parse(fs.readFileSync(MODULE_MAPPING_PATH, 'utf-8'));

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

async function collectUncoveredCoverage(selectedModules: string[], existingCoverageMap: typeof CoverageMap.prototype): Promise<void> {
  const allFiles = await globAsync('**/*.{ts,tsx}', {
    cwd: SRC_DIR,
    absolute: true,
    ignore: ['**/*.d.ts', '**/__tests__/**'],
  });

  const alreadyCoveredFiles = new Set<string>(existingCoverageMap.files());

  for (const fileAbsPath of allFiles) {
    const fileRelPath = path.relative(ROOT_DIR, fileAbsPath);

    const belongsToModule = selectedModules.some(module =>
      fileMatchesModule(fileRelPath, module)
    );

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
  const args = process.argv.slice(2);
  const moduleArg = args.find(arg => arg.startsWith('--module='));

  const selectedModules =
    !moduleArg || moduleArg === '--module='
      ? Object.keys(moduleMapping)
      : moduleArg.split('=')[1].split(',').filter(Boolean);

  if (selectedModules.length === 0) {
    console.error('No modules provided and moduleMapping is empty.');
    process.exit(1);
  }

  // Load existing coverage-final.json
  const existingCoverageMap = fs.existsSync(COVERAGE_FINAL)
    ? createCoverageMap(JSON.parse(fs.readFileSync(COVERAGE_FINAL, 'utf-8')))
    : createCoverageMap({});

  // Directly update this map with uncovered files
  await collectUncoveredCoverage(selectedModules, existingCoverageMap);

  // Write back to file
  fs.writeFileSync(COVERAGE_FINAL, JSON.stringify(existingCoverageMap.toJSON(), null, 2));
  console.log('✅ Successfully merged *new uncovered files* into coverage-final.json');
}

run().catch(e => {
  console.log(e);
  process.exit(1);
});
