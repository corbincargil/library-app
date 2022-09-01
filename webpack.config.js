const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");


module.exports = {
    mode: "production",
    devtool: "inline-source-map",
    entry: {
      main: path.resolve(__dirname, "./src/index.js"),
    },
    output: {
      filename: "[name].js",
      path: path.resolve(__dirname, "dist"),
      assetModuleFilename: "[name][ext]",
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
          title: "Weather App",
          filename: "index.html",
          template: "src/index.html",
        }),
      ],
};
