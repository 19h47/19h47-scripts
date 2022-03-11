/**
 * Webpack config Production
 *
 * @file webpack.config.common.js
 * @author Jérémy Levron <jeremylevron@19h47.fr> (https://19h47.fr)
 */

// Webpack Plugins
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

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
	]
};
