import { cwd } from 'process';
const path = require('path'); // eslint-disable-line import/no-extraneous-dependencies

const root = path.resolve(cwd);

const resolve = dir => {
	return path.join(root, dir);
};

module.exports = resolve;
