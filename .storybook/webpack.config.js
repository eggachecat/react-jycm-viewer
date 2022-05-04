const custom = require("../config/webpack.base");

module.exports = async ({ config, mode }) => {
  return {
    ...config,
    module: {
      ...config.module,
      rules: custom.module.rules,
    },
    plugins: [...config.plugins, ...custom.plugins],
    resolve: {
      ...config.resolve,
      alias: { ...config.resolve.alias, ...custom.resolve.alias },
    },
  };
};
