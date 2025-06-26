import moduleMapping from '../moduleMapping.json';

export function getModulesFromArgs(): string[] {
    const arg = process.argv.find(a => a.startsWith('--module='));
    const modules: string[] =
    !arg || arg === '--module=' ? Object.keys(moduleMapping) : arg.split('=')[1].split(',').filter(Boolean);

    if (modules.length === 0) {
        console.error('No modules provided and moduleMapping is empty.');
        process.exit(1);
    } 

    return modules;
}