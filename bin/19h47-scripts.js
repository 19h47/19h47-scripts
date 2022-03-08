#!/usr/bin/env node
const spawn = require('cross-spawn');


const args = process.argv.slice(2);
const index = args.findIndex(x => ['prod', 'dev'].includes(x));

const config = require.resolve(`../config/webpack.config.js`);


const command = index === -1 ? args[0] : args[index];

if (!command) {
    throw new Error(`Unknown or missing command.`);
}

let result = '';

switch (command) {
    case 'dev':
        result = spawn.sync(
            "webpack",
            ["--mode=development", "--config", config],
        );
        break;
}

console.log(result.status);

process.exit(result.status)