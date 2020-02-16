const path = require("path");

module.exports = {
  entry: "./src/vue-mutable.js",
  output: {
    filename: "vue-mutable.js",
    path: path.resolve(__dirname, "dist")
  }
};
