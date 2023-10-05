const presets = [
	[
		'@babel/preset-env',
		{
			useBuiltIns: 'entry',
			corejs: '3.33.3',
		},
	],
];

const plugins = [require.resolve('@babel/plugin-transform-runtime')];

module.exports = { presets, plugins };
