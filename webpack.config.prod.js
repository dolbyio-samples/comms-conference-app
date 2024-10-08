const path = require("path");
const webpack = require("webpack");
const package = require("./package.json");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require("terser-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

try {
  require('os').networkInterfaces();
} catch (e) {
  require('os').networkInterfaces = () => ({});
}

module.exports = {
  mode: "production",
  entry: ["./src/app/index.js"],
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
  },
  output: {
    path: path.join(__dirname, "dist"),
    filename: "bundle.js",
    libraryTarget: "umd",
  },
  externals: {},
  module: {
    rules: [
      {
        test: /.jsx?$/,
        loader: "babel-loader",
        exclude: /node_modules/,
        include: path.resolve(__dirname),
      },
      {
        test: /\.(less)$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'less-loader'
        ],
      },
      {
        test: /\.mp3$/,
        exclude: /node_modules/,
        type: 'asset/resource',
        generator: {
          filename: 'sounds/[name][ext][query]'
        }
      },
      {
        test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name][ext][query]'
        }
      },
      {
        test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name][ext][query]'
        }
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name][ext][query]'
        }
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name][ext][query]'
        }
      },
      {
        test: /\.otf(\?v=\d+\.\d+\.\d+)?$/,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name][ext][query]'
        }
      },
      {
        test: /\.svg$/,
        type: 'asset/resource',
        generator: {
          filename: 'images/[name][ext][query]'
        },
      },
      {
        test: /\.(jpg|jpeg|gif|png)$/,
        exclude: /node_modules/,
        type: 'asset/resource',
        generator: {
          filename: 'images/[name][ext][query]'
        }
      },
      {
        test: /\.svg$/,
        type: 'asset/resource',
        generator: {
          filename: 'images/[name][ext][query]'
        },
      },
      {
        test: /\.(jpg|jpeg|gif|png)$/,
        exclude: /node_modules/,
        type: 'asset/resource',
        generator: {
          filename: 'images/[name][ext][query]'
        }
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: `"production"`,
      },
      __VERSION__: JSON.stringify(package.version),
    }),
    new MiniCssExtractPlugin({
      filename: "bundle.css"
    }),
    new HtmlWebpackPlugin({
      inject: true,
      template: "./src/static/index.html",
      js: [],
    }),
    // new webpack.NoEmitOnErrorsPlugin(),
    new CopyWebpackPlugin({
      patterns:[
       { from: "./node_modules/@voxeet/voxeet-web-sdk/dist/dvwc_impl.wasm", noErrorOnMissing: true },
       { from: "./node_modules/@voxeet/voxeet-web-sdk/dist/voxeet-dvwc-worker.js", noErrorOnMissing: true },
       { from: "./node_modules/@voxeet/voxeet-web-sdk/dist/voxeet-worklet.js", noErrorOnMissing: true },
       { from: "./node_modules/@voxeet/voxeet-web-sdk/dist/voxeet-dvwc-worker.js.map", noErrorOnMissing: true },
       // VSL WASM resources
       { from: "./node_modules/@voxeet/voxeet-web-sdk/dist/vsl_impl.pkgwvsl", noErrorOnMissing: true },
       { from: "./node_modules/@voxeet/voxeet-web-sdk/dist/vsl_impl.wasm", noErrorOnMissing: true },
     ]
    }),
  ],
};
