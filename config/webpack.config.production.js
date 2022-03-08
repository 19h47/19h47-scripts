/**
 * Webpack config production
 *
 * @file webpack.production.js
 * @author Jérémy Levron <jeremylevron@19h47.fr> (https://19h47.fr)
 */

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

const resolve = require('./webpack.utils');

module.exports = {
	mode: 'production',
	devtool: false,
	watch: false,
	output: {
		filename: 'js/[name].[chunkhash:8].js',
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				exclude: /node_modules/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
						options: {
							publicPath: '../',
						},
					},
					{
						loader: 'css-loader',
						options: {
							sourceMap: false,
						},
					},
					{
						loader: 'postcss-loader',
						options: {
							sourceMap: false,
						},
					},
				],
			},
		],
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
	],
};
