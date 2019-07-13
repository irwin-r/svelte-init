const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const mode = process.env.NODE_ENV || "development";
const prod = mode === "production";

module.exports = {
  entry: {
    bundle: ["./src/main.js"]
  },
  resolve: {
    extensions: [".mjs", ".js", ".html", ".svelte"]
  },
  output: {
    path: __dirname + "/public",
    filename: "[name].js",
    chunkFilename: "[name].[id].js"
  },
  module: {
    rules: [
      {
        test: /(\.m?js?$)|(\.svelte$)/,
        exclude: /\bcore-js\b/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [["@babel/preset-env"]],
            plugins: [
              // '@babel/plugin-proposal-class-properties',
              // '@babel/plugin-transform-shorthand-properties'
            ],
            sourceType: "unambiguous"
          }
        }
      },
      {
        test: /\.svelte$/,
        exclude: /node_modules/,
        use: {
          loader: "svelte-loader",
          options: {
            emitCss: true,
            hotReload: true
          }
        }
      }
    ]
  },
  mode,
  plugins: [new HtmlWebpackPlugin()],
  devtool: prod ? false : "source-map"
};
