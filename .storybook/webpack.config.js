const path = require("path");

module.exports = {
  module: {
    rules: [
      {
        test: /\.(scss|css)$/,
        loaders: ["style-loader", "css-loader"],
        include: path.resolve(__dirname, "../")
      }
    ]
  }
};