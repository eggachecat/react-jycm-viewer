const MonacoWebpackPlugin = require("monaco-editor-webpack-plugin");

const path = require("path");


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
        type: 'asset/resource'
      },
      {
        test: /\.less$/i,
        use: [
          "style-loader",
          "css-loader",
          "less-loader"
        ],
      },
    ],
  },
  resolve: {
    extensions: [".js", ".json", '.jsx', '.ts', '.tsx'],
    modules: [
      'node_modules',
      path.join(__dirname, 'node_modules')
    ]
  },
  plugins: [
    new MonacoWebpackPlugin({
      languages: ["json"],
    }),
  ]
};
