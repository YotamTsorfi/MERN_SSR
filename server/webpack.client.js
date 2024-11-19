const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = merge(common, {
  mode: "production", // הוסף את השורה הזו
  entry: "../client/src/index.js", // עדכן את הנתיב בהתאם למיקום הקובץ שלך
  output: {
    path: path.resolve(__dirname, "../client/build"),
    filename: "bundle.js",
    publicPath: "/",
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "../client/public/index.html", // עדכן את הנתיב בהתאם למיקום הקובץ שלך
      filename: "index.html",
      inject: true,
    }),
  ],
  devServer: {
    historyApiFallback: true,
  },
});
