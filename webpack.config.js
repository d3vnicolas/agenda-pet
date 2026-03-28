const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const CopyWebpackPlugin = require("copy-webpack-plugin")

module.exports = {
  entry: path.resolve(__dirname, "src", "js", "main.js"),
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  mode: "development",
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
          from: path.resolve(__dirname, "src", "assets", "fonts"),
          to: path.resolve(__dirname, "dist", "src", "assets", "fonts"),
        },
        {
          from: path.resolve(__dirname, "src", "assets", "images", "icons"),
          to: path.resolve(__dirname, "dist", "src", "assets", "images", "icons")
        }
      ],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
        exclude: /node_modules/,
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
