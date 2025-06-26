import * as path from 'path';

export const ROOT_DIR = path.resolve(); 
export const SRC_DIR = path.join(ROOT_DIR, 'src'); 
export const MODULE_MAPPING_PATH = path.join(__dirname, 'moduleMapping.json'); 
export const COVERAGE_OBJECT_PATH = path.join(ROOT_DIR, 'coverage/coverage-final.json');
export const COVERAGE_DIR = path.join(ROOT_DIR, 'coverage');


