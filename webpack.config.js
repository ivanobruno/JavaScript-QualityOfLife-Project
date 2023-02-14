// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const Dotenv = require('dotenv-webpack');

const isProduction = process.env.NODE_ENV == "production";

const stylesHandler = isProduction
  ? MiniCssExtractPlugin.loader
  : "style-loader";

const config = {
  entry: "./src/js/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
  },
  devServer: {
    open: true,
    host: "localhost",
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Applicazione Webpack",
      template: "./src/index.html",
    }),

    new MiniCssExtractPlugin({
      filename: './app/style.css',
    }),
    
    new Dotenv({
      systemvars: true,
    }),
  ], 
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000
  },
  
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/i,
        loader: "babel-loader",
      },
      {
        test: /\.(css|s[ac]ss)$/i,
        use: ["style-loader","css-loader","sass-loader"]
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        type: "asset",
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'assets/images/'
            }
          }
        ]
      },
    ],
  },
};

module.exports = () => {
  if (isProduction) {
    config.mode = "production";

    config.plugins.push(new MiniCssExtractPlugin());
  } else {
    config.mode = "development";
  }
  return config;
};