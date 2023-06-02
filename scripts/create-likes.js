const { spawnSync } = require('child_process');
const maxLikes = parseInt(process.argv[2]) || 10;
const maxPosts = parseInt(process.argv[3]) || 10;

if (maxLikes < 1 || maxPosts < 1) {
    console.log(`misssing ${maxLikes < 1 ? 'maxLikes as 1st Arguement' : 'maxPosts as 2nd Arguement'}`)
    return
}

// Execute the main script using cross-env to set the environment variables
const result = spawnSync(
    'cross-env',
    [`MAX_LIKES=${maxLikes}`, `NUM_POSTS=${maxPosts}`,
        'ts-node', '--swc', '--compiler-options', '{"module":"CommonJS"}',
        'prisma/seed/seedLikes.ts'
    ],
    { stdio: 'inherit' }
);

// Print the output of the main script execution
console.log(result.stdout?.toString());
console.error(result.stderr?.toString());
