const path = require('path');
import webpack, {Configuration} from "webpack";
const HtmlWebpackPlugin = require("html-webpack-plugin");
import {TsconfigPathsPlugin} from "tsconfig-paths-webpack-plugin";

const webpackConfig = () => ({
  entry: "./src/index.tsx",
  resolve: {
      extensions: [".ts", ".tsx", ".js", ".json"],
      plugins: [new TsconfigPathsPlugin()]
  },
  output: {
      path: path.join(__dirname, "/public"),
      filename: "bundle.js"
  },
  mode: 'development',
  module: {
      rules: [
          {
              test: /\.tsx?$/,
              loader: "ts-loader",
              options: {
                  transpileOnly: true
              },
              exclude: /public/
          },
      ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "public", "index.html"),
    })
  ],
});

export default webpackConfig;