module.exports = function (api) {
  api.cache(false);

  const presets = [
    "@babel/preset-env",
    "@babel/preset-react",
    "@babel/preset-typescript",
  ];
  const plugins = [
    "@babel/plugin-proposal-private-property-in-object",
    "@babel/plugin-transform-private-property-in-object",
    // "@babel/plugin-transform-private-methods",
  ];

  return {
    presets,
    plugins,
  };
};
