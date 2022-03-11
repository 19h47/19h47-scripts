/**
 * Webpack config Common
 *
 * @file webpack.config.common.js
 * @author Jérémy Levron <jeremylevron@19h47.fr> (https://19h47.fr)
 */

'use strict';

// Webpack Options
const alias = require('./webpack.resolve.alias');
const rules = require('./webpack.module.rules');

// Webpack plugins
const ESLintPlugin = require('eslint-webpack-plugin');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');
const WebpackNotifierPlugin = require('webpack-notifier');

// Webpack utils
const { resolve } = require('./webpack.utils');

// Options
const eslintOptions = require('../.eslintrc');

module.exports = {
	module: {
		rules,
	},
	output: {
		path: resolve('dist'),
	},
	resolve: {
		alias,
	},
	plugins: [
		new WebpackManifestPlugin({
			publicPath: 'dist/',
		}),
		new ESLintPlugin({
			baseConfig: eslintOptions,
		}),
		new SpriteLoaderPlugin({ plainSprite: true }),
		new WebpackNotifierPlugin({
			title: 'Webpack',
			excludeWarnings: true,
			alwaysNotify: true,
		}),
	],
};
