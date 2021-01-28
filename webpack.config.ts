const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");

const webpackConfig = () => ({
  entry: "./src/index.tsx",
  resolve: {
      extensions: [".ts", ".tsx", ".js", ".json"],
  },
  output: {
      path: path.join(__dirname, "public"),
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