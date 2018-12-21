const path = require("path");
const CleanWebpackPlugin = require("clean-webpack-plugin");

const PATHS = {
  SRC: path.resolve(__dirname, "src"),
  OUT: path.resolve(__dirname, "build", "lib"),
  EXAMPLE: path.resolve(__dirname, "build", "example")
};

const common = {
  target: "web",
  entry: {
    core: path.resolve(PATHS.SRC, "packages", "core", "index.js"),
    tags: path.resolve(PATHS.SRC, "packages", "tags", "index.js")
  },
  output: {
    filename: "[name].js",
    path: PATHS.OUT
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              [
                "@babel/preset-env",
                {
                  modules: false,
                  debug: true,
                  useBuiltIns: "usage",
                  targets: {
                    browsers: ["last 2 versions", "safari > 8", "not ie < 11"]
                  }
                }
              ]
            ],
            plugins: [
              "@babel/plugin-transform-runtime",
              "@babel/plugin-syntax-dynamic-import"
            ]
          }
        }
      }
    ]
  },
  plugins: [
    //new CleanWebpackPlugin([PATHS.EXAMPLE, PATHS.OUT])
  ]
};

module.exports = { PATHS, common };
