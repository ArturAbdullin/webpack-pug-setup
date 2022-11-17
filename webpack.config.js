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
    // set the output folder for scripts
    // and a script output name
    // for multiple scripts has to be set to path/[name].js
    filename: "js/[name].[contenthash].js",
    clean: true,
  },
  resolve: {
    // use alias to avoid relative paths like `./../../images/`
    alias: {
      Images: path.resolve(__dirname, "src/img"),
      JSscripts: path.resolve(__dirname, "src/js"),
    },
  },
  plugins: [
    new PugPlugin({
      extractCss: {
        filename: "css/[name].[contenthash].css",
      },
    }),
  ],
  module: {
    rules: [
      {
        test: /\.pug$/, // search for files with names ending in .pug
        loader: PugPlugin.loader, // Pug loader
      },
      {
        test: /\.(css|sass|scss)$/,
        use: ["css-loader", "sass-loader"],
      },
      {
        test: /\.(png|jpg|jpeg|ico)/,
        type: "asset",
        generator: {
          filename: "assets/img/[name].[contenthash][ext]",
        },
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
