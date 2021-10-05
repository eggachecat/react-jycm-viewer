const path = require("path");
const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.base.js');

const prodConfig = {
  mode: "production",
  entry: path.join(__dirname, "../src/index.tsx"),
  output: {
    path: path.join(__dirname, "../lib/"),
    filename: "index.js",
    libraryTarget: 'umd',
    libraryExport: 'default',
  },
  externals: {
    react: 'react',
    "react-dom": "react-dom"
  }
};

module.exports = merge(prodConfig, baseConfig);
