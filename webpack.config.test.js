const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { common, PATHS } = require("./webpack.config.common");

module.exports = {
  ...common,
  mode: "production",
  entry: path.resolve(PATHS.SRC, "example", "index.js"),
  output: {
    ...common.output,
    path: PATHS.EXAMPLE
  },
  module: {
    rules: [
      ...common.module.rules,
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          "style-loader", // creates style nodes from JS strings
          "css-loader" // translates CSS into CommonJS
        ]
      }
    ]
  },
  plugins: [
    ...common.plugins,
    new HtmlWebpackPlugin({
      template: path.resolve(PATHS.SRC, "example", "index.html")
    })
  ]
};
