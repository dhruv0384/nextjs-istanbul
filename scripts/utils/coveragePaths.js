const path = require('path');

function getModuleCoveragePath(moduleName) {
  return path.resolve(`module-coverage/${moduleName}/coverage-final.json`);
}

function getModuleReportDir(moduleName) {
  return path.resolve(`coverage/${moduleName}`);
}

module.exports = {
  getModuleCoveragePath,
  getModuleReportDir,
};
