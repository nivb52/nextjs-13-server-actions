const { spawnSync } = require('child_process');

const numModels = process.argv[2] || 1;
if (!numModels) {
    throw new Error('misssing numModels, you can just use "npx prisma db seed"')
}
// Execute the main script using cross-env to set the environment variables
const result = spawnSync(
    'cross-env',
    [`NUM_MODELS=${numModels}`, 'npx', 'prisma', 'db', 'seed'],
    { stdio: 'inherit' }
);

// Print the output of the main script execution
console.log(result.stdout?.toString());
console.error(result.stderr?.toString());
