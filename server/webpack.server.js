const path = require("path");
const nodeExternals = require("webpack-node-externals");
const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = merge(common, {
  mode: "production",
  entry: "./server.js",
  target: "node",
  externals: [nodeExternals()],
  output: {
    path: path.resolve(__dirname, "build-server"),
    filename: "server.js",
  },
});
