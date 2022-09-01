const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");


module.exports = {
    mode: "development",
    entry: {
      index: path.resolve(__dirname, "./src/index.js"),
    },
    output: {
      filename: "[name].[contenthash].js",
      path: path.resolve(__dirname, "dist"),
      clean: true,
      assetModuleFilename: "[name][ext]",
    },
    devtool: "inline-source-map",
    devServer: {
        static: {
          directory: path.resolve(__dirname, "dist"),
        },
        port: 3000,
        open: true,
        hot: true,
        compress: true,
        historyApiFallback: true,
      },
    module: {
        rules: [
          {
            test: /\.css$/i,
            use: ["style-loader", "css-loader"],
          },
          {
            test: /\.(png|jpg|svg|jpeg|gif)$/i,
            type: "asset/resource",
          },
        ],
      },
      plugins: [
        new HtmlWebpackPlugin({
          title: "Library App",
          filename: "index.html",
          template: "src/index.html",
        }),
      ],
};
