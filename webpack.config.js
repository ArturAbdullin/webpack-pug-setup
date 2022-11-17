const PugPlugin = require("pug-plugin");

module.exports = {
  entry: {
    // unlike the common webpack configs, Pug config has .pug files as the entries
    index: "./src/index.pug",
  },
  plugins: [new PugPlugin()],
  module: {
    rules: [
      {
        test: /\.pug$/, // search for files with names ending in .pug
        loader: PugPlugin.loader, // Pug loader
      },
    ],
  },
};
