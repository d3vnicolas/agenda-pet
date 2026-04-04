require("dotenv").config()

const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const CopyWebpackPlugin = require("copy-webpack-plugin")
const DotEnvPlugin = require("dotenv-webpack")

module.exports = {
  entry: path.resolve(__dirname, "src", "js", "main.js"),
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  mode: process.env.WEBPACK_MODE || "production",
  devServer: {
    static: {
      directory: path.join(__dirname, "dist"),
    },
    port: 3333,
    open: true,
    liveReload: true,
    watchFiles: ["src/**/*.html"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "src", "index.html"),
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "src", "assets", "images", "icons"),
          to: path.resolve(__dirname, "dist", "assets", "images", "icons"),
        },
      ],
    }),
    new DotEnvPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(ttf|woff|woff2|eot)$/i,
        type: "asset/resource",
        generator: {
          filename: "assets/fonts/[name][ext]",
        },
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              [
                "@babel/preset-env",
                {
                  targets: "defaults",
                },
              ],
            ],
          },
        },
      },
    ],
  },
}
