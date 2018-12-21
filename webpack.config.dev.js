const { common, PATHS } = require("./webpack.config.common");

module.exports = {
  ...common,
  mode: "development",
  devServer: {
    publicPath: "/",
    contentBase: PATHS.OUT,
    compress: true,
    disableHostCheck: true
  },
  plugins: [...common.plugins]
};
