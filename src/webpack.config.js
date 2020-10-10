const webpack = require("webpack");
const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const FileManagerPlugin = require("filemanager-webpack-plugin");
const GoogleFontsPlugin = require("@beyonk/google-fonts-webpack-plugin");
const HtmlWebpackPluginChangeUrl = require("./webpack-plugins/html-webpack-plugin-change-url");

const fontPath = "font.css";

module.exports = (env) => {
  return {
    entry: {
      index: "./js/index.ts",
    },
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "[name].[contenthash].js",
      publicPath: "",
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          use: "babel-loader",
          exclude: /node_modules/,
        },
        {
          test: /\.ts(x)?$/,
          loader: "ts-loader",
          exclude: /node_modules/,
          options: {
            transpileOnly: true,
          },
        },
        {
          test: /\.svg$/,
          loader: "file-loader",
        },
        {
          test: /\.(scss|css)$/,
          use: [
            MiniCssExtractPlugin.loader,
            "css-loader",
            "postcss-loader",
            "sass-loader",
          ],
        },
      ],
    },
    plugins: [
      new GoogleFontsPlugin({
        filename: fontPath,
        fonts: [
          {
            family: "Lora",
            variants: ["400", "700"],
          },
          {
            family: "Montserrat",
            variants: ["400", "700"],
          },
          {
            family: "IBM Plex Mono",
            variants: ["400"],
          },
        ],
      }),
      new CopyPlugin({
        patterns: [{ from: "layouts", to: "layouts" }],
        options: {
          concurrency: 100,
        },
      }),
      new HtmlWebpackPlugin({
        appMountId: "index",
        filename: "layouts/_default/baseof.html",
        template: "index.html",
        scriptLoading: "defer",
        hash: true,
        cache: false,
        minify: false,
        templateParameters: { fontPath, templateName: "base" },
      }),
      new HtmlWebpackPluginChangeUrl({
        bundlePath: "webpack",
      }),
      new MiniCssExtractPlugin(),
      new CleanWebpackPlugin(),
      new ForkTsCheckerWebpackPlugin(),
      new FileManagerPlugin({
        onStart: {
          delete: ["../layouts"],
        },
        onEnd: {
          copy: [
            {
              source: "./dist/font/*",
              destination: "../static/font",
            },
            {
              source: "./dist/*.{css,js,svg}",
              destination: "../static",
            },
          ],
          move: [
            {
              source: "./dist/layouts",
              destination: "../layouts",
            },
          ],
        },
      }),
    ],
    resolve: {
      extensions: [".tsx", ".ts", ".js"],
    },
    optimization: {
      usedExports: true,
      moduleIds: "hashed",
      runtimeChunk: "single",
      splitChunks: {
        chunks: "all",
        maxInitialRequests: Infinity,
        minSize: 0,
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name(module) {
              // get the name. E.g. node_modules/packageName/not/this/part.js
              // or node_modules/packageName
              const packageName = module.context.match(
                /[\\/]node_modules[\\/](.*?)([\\/]|$)/
              )[1];

              // npm package names are URL-safe, but some servers don't like @ symbols
              return `npm.${packageName.replace("@", "")}`;
            },
          },
        },
      },
    },
    watchOptions: {
      aggregateTimeout: 200,
      poll: 1000,
      ignored: /node_modules/,
    },
  };
};
