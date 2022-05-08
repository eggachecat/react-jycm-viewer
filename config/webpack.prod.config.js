const path = require("path");
const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.base.js');

const prodConfig = {
  mode: "production",
  entry: path.join(__dirname, "../src/sand-box.tsx"),
  output: {
    path: path.join(__dirname, "../sandbox/"),
    filename: "index.js",
    libraryTarget: 'commonjs2'
  }
};

module.exports = merge(prodConfig, baseConfig);
