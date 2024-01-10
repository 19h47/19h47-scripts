#!/usr/bin/env node

const spawn = require("cross-spawn");

const args = process.argv.slice(2);

const scriptIndex = args.findIndex(x => ["prod", "dev"].includes(x));
const script = -1 === scriptIndex ? args[0] : args[scriptIndex];

const config = require.resolve("../config/webpack.config.js");

if (!script) {
	throw new Error(`Unknown or missing script.`);
}

let result = "";

if ("dev" === script) {
	result = spawn.sync("webpack", ["--mode=development", "--config", config, "--progress"], {
		stdio: "inherit",
	});
}

if ("prod" === script) {
	result = spawn.sync("webpack", ["--mode=production", "--config", config, "--progress"], {
		stdio: "inherit",
	});
}

if (result.signal) {
	process.exit(1);
}

process.exit(result.status);
