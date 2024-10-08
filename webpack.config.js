const path = require("path");
const webpack = require("webpack");
const package = require("./package.json");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

try {
  require("os").networkInterfaces();
} catch (e) {
  require("os").networkInterfaces = () => ({});
}

module.exports = {
  entry: [
    "react-hot-loader/patch",
    "./src/app/index.js",
  ],
  devtool: "inline-source-map",
  mode: "development",
  output: {
    path: path.join(__dirname, "dist"),
    filename: "bundle.js",
    publicPath: "/",
  },
  devServer: {
    port: 8080,
    server: "http",
    allowedHosts: "all",
    static: {
        directory: path.join(__dirname, "src"),
        publicPath: "/static",
      },
    devMiddleware: {
      publicPath: '/',
    },
    hot: true,
    historyApiFallback: true
  },
  module: {
    rules: [
      {
        test: /.jsx?$/,
        loader: "babel-loader",
        exclude: [
          path.resolve(__dirname, '/node_modules/')
        ],
        include: path.resolve(__dirname),
      },
      {
        test: /.less$/,
        use: [
          'style-loader',
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
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json']
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: "src/static/index.html",
    }),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: `"development"`,
      },
      __VERSION__: JSON.stringify(package.version),
    }),
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
