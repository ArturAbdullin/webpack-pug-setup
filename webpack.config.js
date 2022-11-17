const path = require("path");
const PugPlugin = require("pug-plugin");

module.exports = {
  mode: "development",
  entry: {
    // unlike the common webpack configs, Pug config has .pug files as the entries
    index: "./src/index.pug",
  },
  output: {
    // set the output folder to be 'build'
    path: path.resolve(__dirname, "build"),
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
  devServer: {
    static: {
      directory: path.resolve(__dirname, "build"),
    },
    port: 3000, // add a port to serve
    open: true, // open browser upon serve
    hot: true, // add HMR (hot module replacement)
    compress: true, // enable gzip compression
    // reload on change in (watchFiles)
    watchFiles: {
      paths: ["src/**/*.*"], // everything in the src folder
      options: {
        // It is typically necessary to set this to true to successfully watch files over a network, and it may be necessary to successfully watch files in other non-standard situations https://github.com/paulmillr/chokidar
        usePolling: true,
      },
    },
  },
};
