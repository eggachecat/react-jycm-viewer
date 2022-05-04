const MonacoWebpackPlugin = require("monaco-editor-webpack-plugin");

const path = require("path");

function resolveTsconfigPathsToAlias(tsconfigPath, webpackConfigBasePath) {
  const { paths } = require(tsconfigPath).compilerOptions;

  const aliases = {};

  Object.keys(paths).forEach((item) => {
    const key = item.replace("/*", "");
    const value = path.resolve(
      webpackConfigBasePath,
      paths[item][0].replace("/*", "").replace("*", "")
    );

    aliases[key] = value;
  });

  console.log("aliases parsed from tsconfig.json:", aliases);

  return aliases;
}

module.exports = {
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: ["ts-loader"],
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.ttf$/,
        type: "asset/resource",
      },
      {
        test: /\.less$/i,
        use: ["style-loader", "css-loader", "less-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".js", ".json", ".jsx", ".ts", ".tsx"],
    modules: ["node_modules", path.join(__dirname, "node_modules")],
    alias: {
      ...resolveTsconfigPathsToAlias(
        path.resolve(__dirname, "../tsconfig.json"),
        path.resolve(__dirname, "../")
      ),
    },
  },
  plugins: [
    new MonacoWebpackPlugin({
      languages: ["json"],
    }),
  ],
};
