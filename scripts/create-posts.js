const { spawnSync } = require('child_process');
const numUsers = parseInt(process.argv[2]);
const maxNumPosts = parseInt(process.argv[3]);

if (!numUsers || numUsers < 1) {
    console.log('misssing or invalid amount of posts (1st arguemnt)')
    return
}

if (!maxNumPosts || maxNumPosts < 1) {
    console.log('misssing or invalid amount of users to had posts (2nd arguemnt)')
    return
}

// Execute the main script using cross-env to set the environment variables
const result = spawnSync(
    'cross-env',
    [`NUM_USERS=${numUsers}`, `MAX_POSTS=${maxNumPosts}`,
        'ts-node', '--swc', '--compiler-options', '{"module":"CommonJS"}',
        'prisma/seed/seedPost.ts'
    ],
    { stdio: 'inherit' }
);

// Print the output of the main script execution
console.log(result.stdout?.toString());
console.error(result.stderr?.toString());
