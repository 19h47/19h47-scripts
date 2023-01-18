/**
 * Webpack config Common
 *
 * @file webpack.config.common.js
 * @author Jérémy Levron <jeremylevron@19h47.fr> (https://19h47.fr)
 */

// Webpack plugins
const CopyPlugin = require("copy-webpack-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");
const { WebpackManifestPlugin } = require("webpack-manifest-plugin");
const SpriteLoaderPlugin = require("svg-sprite-loader/plugin");
const WebpackNotifierPlugin = require("webpack-notifier");
const { VueLoaderPlugin } = require("vue-loader");

// Webpack Options
const alias = require("./webpack.resolve.alias");
const rules = require("./webpack.module.rules");

// Webpack utils
const { resolve } = require("./webpack.utils");

// Options
const eslintOptions = require("../.eslintrc");

module.exports = {
	module: {
		rules,
	},
	output: {
		path: resolve("dist"),
	},
	resolve: {
		alias,
	},
	optimization: {
		splitChunks: {
			chunks: "all",
			name: "vendors",
		},
	},
	externals: {
		jquery: "jQuery",
		$: "jQuery",
	},
	plugins: [
		new CopyPlugin({

			patterns: [{
				context: resolve(__dirname, "static"),
				from: resolve("static")
			}],
		}),
		new WebpackManifestPlugin({
			publicPath: "dist/",
		}),
		new ESLintPlugin({
			baseConfig: eslintOptions,
		}),
		new VueLoaderPlugin(),
		new SpriteLoaderPlugin({ plainSprite: true }),
		new WebpackNotifierPlugin({
			title: "Webpack",
			excludeWarnings: true,
			alwaysNotify: true,
		}),
	],
};
