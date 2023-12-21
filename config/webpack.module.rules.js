/**
 * Webpack Module Rules
 *
 * @file webpack.config.common.js
 * @author Jérémy Levron <jeremylevron@19h47.fr> (https://19h47.fr)
 */

const { presets, plugins } = require('../.babelrc');

// Webpack Utils
const { resolve } = require('./webpack.utils');

module.exports = [
	{
		test: /\.js$/,
		exclude: /node_modules/,
		loader: require.resolve('babel-loader'),
		options: {
			babelrc: false,
			configFile: false,
			cacheCompression: false,
			presets,
			plugins,
		},
	},
	{ test: /\.vue$/, loader: require.resolve('vue-loader') },
	{
		test: /\.(woff2?|eot|ttf|otf|woff|svg)?$/,
		exclude: [/img/, /icons/],
		type: 'asset/resource',
		generator: {
			filename: 'fonts/[hash][ext][query]',
		},
	},
	{
		test: /\.svg$/,
		exclude: [/img/, /fonts/],
		use: [
			{
				loader: require.resolve('svg-sprite-loader'),
				options: {
					spriteFilename: 'icons.svg',
					extract: true,
				},
			},
			'svg-transform-loader',
			'svgo-loader',
		],
	},
	{
		test: /\.(mp4|webm|ogg|mp3|wav|flac|aac|ogv)(\?.*)?$/,
		use: [
			{
				loader: require.resolve('url-loader'),
				options: {
					limit: 100000,
					name: '[name].[ext]',
					publicPath: resolve('src/videos'),
					outputPath: 'videos/',
				},
			},
		],
	},
	{
		test: /\.svg$/,
		exclude: [/fonts/, /icons/],
		type: 'asset',
		generator: {
			filename: 'img/svg/[name][ext]',
		},
	},
	{
		test: /\.(gif)$/i,
		exclude: [/animations/],
		type: 'asset',
		generator: {
			filename: 'img/gif/[name][ext]',
		},
	},
	{
		test: /\.(png)$/i,
		exclude: [/animations/],
		type: 'asset',
		generator: {
			filename: 'img/png/[name][ext]',
		},
	},
	{
		test: /\.(jpe?g)$/i,
		exclude: [/animations/],
		type: 'asset',
		generator: {
			filename: 'img/jpg/[name][ext]',
		},
	},
];
