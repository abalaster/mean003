// import webpack from 'webpack';
import path from 'path';

// webpack is configured by exporting an object
export default {
  // debug: true, // enables some debugging information as we run our build.
  devtool: 'inline-source-map', // a number of dev tools to consider. Compilation speed vs quality. Higher quality takes longer.
  // noInfo: true,  // This means that Webpack will display a list of files. Typically leave this off but will have it on to start.
  watch: true,
  mode: 'development',
  entry: [ // Can pass an array of entrypoints. A good way to inject middleware for hot reloading. Keeping it simple for now.
          path.resolve(__dirname, 'src/index') // __dirname is a node keyname that provides the full path.
  ],
  target: 'web', // Set for browser. Could set this to 'node' to build an app running in node. Could also set to 'electron' for desktop-style apps with JS.
  output: { // This is where it should create it's bundle. Note: Does not actually create a file. Creates a bundle in memory and then serves it to the browser. Need a path to simulate the existence of a file.
    path: path.resolve(__dirname, 'src'),
    publicPath: '/',
    filename: 'bundle.js'
  },
  // devServer: {
  //   contentBase: path.resolve(__dirname, 'src')
  // },
  plugins: [], // we will use some plugins to enhance Webpack. eg hot-reloading, catching errors, linting styles.
  module: { // Need to tell Webpack the filetypes we want it to handle. Webpack calls them 'loaders'.
    rules: [
      {test: /\.js$/, exclude: /node_modules/, loaders: ['babel-loader']},
      {test: /\.css$/, loaders: ['style-loader', 'css-loader']}, // could add other handlers here for SASS, LESS, images and more
    ]
  },
}
