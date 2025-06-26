import * as path from 'path';

export function getModuleCoveragePath(moduleName: string): string {
  return path.resolve('module-coverage', moduleName, 'coverage-final.json');
}

export function getModuleReportDir(moduleName: string): string {
  return path.resolve('coverage', moduleName);
}

export function getModuleObjectDir(moduleName: string): string {
  return path.resolve('module-coverage', moduleName);
}

console.log(getModuleReportDir('cfm'));