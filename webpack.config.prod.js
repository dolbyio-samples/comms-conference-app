const path = require("path");
const webpack = require("webpack");
const package = require("./package.json");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

try {
  require("os").networkInterfaces();
} catch (e) {
  require("os").networkInterfaces = () => ({});
}

module.exports = {
  mode: "production",
  entry: ["./src/app/index.js"],
  output: {
    path: path.join(__dirname, "dist"),
    filename: "bundle.js",
    publicPath: "",
  },
  module: {
    rules: [
      {
        test: /.jsx?$/,
        loaders: ["babel-loader"],
        exclude: /node_modules/,
        include: path.resolve(__dirname),
      },
      {
        test: /\.(less)$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "less-loader"
        ]
      },
      {
        test: /\.mp3$/,
        exclude: /node_modules/,
        loader: "file-loader",
        options: {
          name: "sounds/[name].[ext]",
        },
      },
      {
        test: /\.woff$/,
        loader:
          "url-loader?limit=65000&mimetype=application/font-woff&name=fonts/[name].[ext]",
      },
      {
        test: /\.woff2$/,
        loader:
          "url-loader?limit=65000&mimetype=application/font-woff2&name=fonts/[name].[ext]",
      },
      {
        test: /\.[ot]tf$/,
        loader:
          "url-loader?limit=65000&mimetype=application/octet-stream&name=fonts/[name].[ext]",
      },
      {
        test: /\.eot$/,
        loader:
          "url-loader?limit=65000&mimetype=application/vnd.ms-fontobject&name=fonts/[name].[ext]",
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url-loader?limit=10000&mimetype=image/svg+xml",
      },
      {
        test: /\.(jpg|jpeg|gif|png)$/,
        exclude: /node_modules/,
        loader: "url-loader?limit=65000&name=images/[name].[ext]",
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: `"production"`,
      },
      __VERSION__: JSON.stringify(package.version),
    }),
    new CopyWebpackPlugin([{ from: "./src/static", ignore: ["*.html"] }]),
    new MiniCssExtractPlugin({
      filename: "bundle.css"
    }),
    new HtmlWebpackPlugin({
      inject: true,
      template: "./src/static/index.html",
      js: [],
    }),
    new webpack.NoEmitOnErrorsPlugin(),
  ],
};
