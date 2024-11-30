const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = merge(common, {
  mode: "development",
  entry: path.resolve(__dirname, "../client/src/index.js"), // נתיב לקובץ index.js
  devServer: {
    port: 3000,
    hot: true,
    allowedHosts: "auto",
    server: {
      type: "http",
    },
    historyApiFallback: {
      disableDotRule: true,
    },

    static: path.resolve(__dirname, "../client/build"),

    proxy: [
      {
        context: ["/api"],
        target: "http://localhost:3000",
      },
    ],
    watchFiles: ["../client/src/**/*", "../client/build/**/*"], // צפה בשינויים בקבצי הקליינט
  },
  output: {
    path: path.resolve(__dirname, "../client/build"),
    filename: "bundle.js",
    publicPath: "/",
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "../client/src/template.html"), // נתיב לקובץ index.html בתיקיית src
      favicon: path.resolve(__dirname, "../client/public/favicon.ico"), // נתיב לקובץ favicon.ico
    }),
  ],
});
