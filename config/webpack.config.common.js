/**
 * Webpack config Common
 *
 * @file webpack.config.common.js
 * @author Jérémy Levron <jeremylevron@19h47.fr> (https://19h47.fr)
 */

const fs = require("fs");
const path = require("path");

const cwd = path.resolve(process.cwd());

// Webpack plugins
const CopyPlugin = require("copy-webpack-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");
const { WebpackManifestPlugin } = require("webpack-manifest-plugin");
const SpriteLoaderPlugin = require("svg-sprite-loader/plugin");
const WebpackNotifierPlugin = require("webpack-notifier");
const { VueLoaderPlugin } = require("vue-loader");
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

// Webpack Options
const alias = require("./webpack.resolve.alias");
const rules = require("./webpack.module.rules");

// Webpack utils
const { resolve } = require("./webpack.utils");

// Options
const eslintOptions = require("../.eslintrc");

const plugins = [
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
];

const staticExists = fs.existsSync(path.join(cwd, "static"));

if (staticExists) {
	plugins.push(
		new CopyPlugin({
			patterns: [
				{
					from: resolve("static"),
				},
			],
		})
	);
}

module.exports = {
	target: ["web", "es2017"],
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
			minSize: 0,
			minChunks: 3,
		},
		minimize: true,
		minimizer: [
			new TerserPlugin(),
			new ImageMinimizerPlugin({
				minimizer: {
					implementation: ImageMinimizerPlugin.imageminMinify,
					options: {
						// Lossless optimization with custom option
						// Feel free to experiment with options for better result for you
						plugins: [
							["gifsicle", { interlaced: true }],
							["jpegtran", { progressive: true }],
							["optipng", { optimizationLevel: 5 }],
							// Svgo configuration here https://github.com/svg/svgo#configuration
							[
								"svgo",
								{
									plugins: [
										{
											name: "preset-default",
											params: {
												overrides: {
													removeViewBox: false,
													addAttributesToSVGElement: {
														params: {
															attributes: [{ xmlns: "http://www.w3.org/2000/svg" }],
														},
													},
												},
											},
										},
									],
								},
							],
						],
					},
				},
			}),
		],
	},
	externals: {
		jquery: "jQuery",
		$: "jQuery",
	},
	plugins,
};
