"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var path_1 = require("path");
var minimatch_1 = require("minimatch");
// Load module-to-glob-pattern mapping
var moduleMapping_json_1 = require("./moduleMapping.json");
// CLI argument parsing for --module=<name1,name2>
var moduleArg = process.argv.find(function (arg) { return arg.startsWith('--module='); });
var modules = !moduleArg || moduleArg === '--module='
    ? Object.keys(moduleMapping_json_1.default)
    : moduleArg.split('=')[1].split(',').filter(Boolean);
if (modules.length === 0) {
    console.error('No modules provided and moduleMapping is empty.');
    process.exit(1);
}
// Read the combined coverage JSON
var coveragePath = path_1.default.resolve('coverage/coverage-final.json');
if (!fs_1.default.existsSync(coveragePath)) {
    console.error("Coverage file not found at ".concat(coveragePath));
    process.exit(1);
}
var rawCoverage = JSON.parse(fs_1.default.readFileSync(coveragePath, 'utf-8'));
modules.forEach(function (mod) {
    var patterns = moduleMapping_json_1.default[mod];
    if (!patterns) {
        console.warn("\u26A0\uFE0F No mapping found for module: ".concat(mod));
        return;
    }
    var filtered = {};
    var _loop_1 = function (filePath) {
        // Normalize Windows paths to Unix-style
        var normalized = filePath.replace(/\\/g, '/');
        if (patterns.some(function (pattern) { return (0, minimatch_1.minimatch)(normalized, pattern); })) {
            filtered[filePath] = rawCoverage[filePath];
        }
    };
    for (var filePath in rawCoverage) {
        _loop_1(filePath);
    }
    // Prepare output directory and file
    var outputDir = path_1.default.resolve('module-coverage', mod);
    fs_1.default.mkdirSync(outputDir, { recursive: true });
    var outputFile = path_1.default.join(outputDir, 'coverage-final.json');
    fs_1.default.writeFileSync(outputFile, JSON.stringify(filtered, null, 2), 'utf-8');
    console.log("\u2705 Saved filtered coverage to ".concat(outputFile));
});
