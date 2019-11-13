/*
|--------------------------------------------------------------------------
| webpack.config.js -- Configuration for Webpack
|--------------------------------------------------------------------------
|
| Webpack turns all the clientside HTML, CSS, Javascript into one bundle.js file.
| Thi
|
*/

const path = require("path");
const entryFile = path.resolve(__dirname, "client", "src", "index.js");
const outputDir = path.resolve(__dirname, "client", "dist");

const webpack = require("webpack");

module.exports = {
  entry: ["@babel/polyfill", entryFile],
  output: {
    path: outputDir,
    publicPath: "/",
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: "babel-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.(scss|css)$/,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
          },
        ],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          {
            loader: "url-loader",
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ["*", ".js", ".jsx"],
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
  devServer: {
    historyApiFallback: true,
    contentBase: "./client/dist",
    hot: true,
    proxy: {
      "/api": "http://localhost:3000",
    },
  },
};
