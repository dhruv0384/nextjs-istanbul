const fs = require('fs');
const path = require('path');
const { createInstrumenter } = require('istanbul-lib-instrument');
const { createCoverageMap } = require('istanbul-lib-coverage');
const { transform } = require('@swc/core');
const { promisify } = require('util');
const glob = require('glob');
const { minimatch } = require('minimatch');

const globAsync = promisify(glob);

const ROOT_DIR = path.resolve();
const SRC_DIR = path.join(ROOT_DIR, 'src');
const COVERAGE_FINAL = path.join(ROOT_DIR, 'coverage/coverage-final.json');
const MODULE_MAPPING_PATH = path.join(__dirname, 'moduleMapping.json');

// Load module mappings
const moduleMapping = JSON.parse(fs.readFileSync(MODULE_MAPPING_PATH, 'utf-8'));

async function instrumentFile(filePath) {
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

function fileMatchesModule(relativePath, moduleName) {
  const patterns = moduleMapping[moduleName] || [];
  return patterns.some(pattern => minimatch(relativePath, pattern));
}

async function collectUncoveredCoverage(selectedModules, existingFilesSet) {
  const allFiles = await globAsync('**/*.{ts,tsx}', {
    cwd: SRC_DIR,
    absolute: true,
    ignore: ['**/*.d.ts', '**/__tests__/**'],
  });

  const uncoveredMap = createCoverageMap({});

  for (const fileAbsPath of allFiles) {
    const fileRelPath = path.relative(ROOT_DIR, fileAbsPath);

    const belongsToModule = selectedModules.some(module => fileMatchesModule(fileRelPath, module));

    // Skip if not part of selected module
    if (!belongsToModule) continue;

    // Skip if already in coverage
    if (existingFilesSet.has(fileAbsPath)) continue;

    try {
      const fileCoverage = await instrumentFile(fileAbsPath);
      uncoveredMap.addFileCoverage(fileCoverage);
      console.log(`➡️  Adding file: ${fileRelPath}`);
    } catch (err) {
      console.warn(`Failed to instrument ${fileAbsPath}: ${err.message}`);
    }
  }

  return uncoveredMap;
}

async function run() {
  const args = process.argv.slice(2);
  const moduleArg = args.find(arg => arg.startsWith('--module='));

  if (!moduleArg) {
    console.error('Please provide --module=<name1,name2>');
    process.exit(1);
  }

  const selectedModules = moduleArg.split('=')[1].split(',');

  // Load existing coverage-final.json
  const existingCoverageMap = fs.existsSync(COVERAGE_FINAL)
    ? createCoverageMap(JSON.parse(fs.readFileSync(COVERAGE_FINAL, 'utf-8')))
    : createCoverageMap({});

  // Create a Set of already covered file paths
  const alreadyCoveredFiles = new Set(existingCoverageMap.files());

  // Collect new uncovered files only for selected modules
  const newCoverageMap = await collectUncoveredCoverage(selectedModules, alreadyCoveredFiles);

  // Merge raw data using .toJSON() to avoid issues
  const merged = createCoverageMap(existingCoverageMap.toJSON());
  merged.merge(newCoverageMap.toJSON());

  // Write back to file
  fs.writeFileSync(COVERAGE_FINAL, JSON.stringify(merged.toJSON(), null, 2));
  console.log('✅ Successfully merged *new uncovered files* into coverage-final.json');
}

run();
