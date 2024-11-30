const path = require("path");
// const HtmlWebpackPlugin = require("html-webpack-plugin");
const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = merge(common, {
  entry: "../client/src/index.js",
  mode: "development",
  watch: true,
  output: {
    path: path.resolve(__dirname, "../client/build"),
    filename: "bundle.js",
    publicPath: "/",
  },
  plugins: [],
  devServer: {
    historyApiFallback: true,
  },
});
