const presets = [
	[
		'@babel/preset-env',
		{
			useBuiltIns: 'entry',
			corejs: '3.32.2',
		},
	],
];

const plugins = [require.resolve('@babel/plugin-transform-runtime')];

module.exports = { presets, plugins };
