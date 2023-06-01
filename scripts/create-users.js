const { spawnSync } = require('child_process');
const numModels = parseInt(process.argv[2]);

if (numModels < 1) {
    console.log('misssing numModels, you can just use "npx prisma db seed"')
    return
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
