const path = require("path");
const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.base.js');
const HtmlWebpackPlugin = require("html-webpack-plugin");


const devConfig = {
  entry: "./example/index.tsx",
  mode: "development",
  devtool: "source-map",
  entry: path.join(__dirname, "../src/sand-box.tsx"),
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "../example", "index.html"),
      public_url: path.resolve("../example/"),
    }),
  ],
  devServer: {
    contentBase: path.join(__dirname, '../src/'),
    compress: true,
    host: '127.0.0.1',
    port: 9702,
    open: true
  },
};


module.exports = merge(devConfig, baseConfig);