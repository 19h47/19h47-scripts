/**
 * Webpack config Production
 *
 * @file webpack.config.common.js
 * @author Jérémy Levron <jeremylevron@19h47.fr> (https://19h47.fr)
 */

const glob = require('glob-all');

// Webpack Plugins
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const PurgecssPlugin = require('purgecss-webpack-plugin');
const purgecssWordpress = require('purgecss-with-wordpress');

// Webpack Utils
const { resolve, useTailwind, getStyleLoader } = require('./webpack.utils');

module.exports = {
	mode: 'production',
	output: {
		filename: 'js/[name].[chunkhash:8].js',
	},
	module: {
		rules: [getStyleLoader(false)],
	},
	plugins: [
		new CleanWebpackPlugin({
			cleanOnceBeforeBuildPatterns: [resolve('dist')],
		}),
		new MiniCssExtractPlugin({
			filename: 'css/main.[chunkhash:8].css',
			chunkFilename: "css/[id].[chunkhash:8].css",
		}),
		new CompressionPlugin(),
		!useTailwind && new PurgecssPlugin({
			paths: glob.sync(
				[resolve('inc/**/*'), resolve('src/scripts/**/*'), resolve('views/**/*')],
				{
					nodir: true,
				},
			),
			safelist: purgecssWordpress.safelist,
			defaultExtractor: content => content.match(/[^<>"'`\s]*[^<>"'`\s:]/g) || [],
		}),
	]
};
