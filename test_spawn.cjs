const { spawnSync } = require('child_process');
try {
    const result = spawnSync('node', ['-v']);
    console.log('Spawned node -v successfully:');
    console.log(result.stdout.toString());
} catch (e) {
    console.error('Failed to spawn:', e);
}
