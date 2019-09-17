module.exports = function (api) {
	api.cache(true);

	const presets = [ "@babel/preset-env", "@babel/preset-react" ];
	const plugins = [ "transform-react-remove-prop-types" ];

	return {
		presets,
		plugins
	};
};
