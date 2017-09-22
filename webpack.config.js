var webpack = require('webpack');
var path = require('path');
var HTMLWebpackPlugin = require('html-webpack-plugin');

const VENDOR_LIBS = [
  'faker',
  'lodash',
  'redux',
  'react-redux',
  'react-input-range',
  'redux-form',
  'redux-thunk'
]

module.exports = {
  entry: {
    bundle: './src/index.js',
    vendor: VENDOR_LIBS
  },
  output: {
    path: path.join(__dirname, 'dist'),
    // [name]: Refers to the property name in the entry object
    // [chunkhash]: Refers the hash that webpack generates for each bundle
    filename: '[name].[chunkhash].js'
  },
  module: {
    rules: [{
      test: /\.js$/,
      use: 'babel-loader',
      // Excludes the specified resources that matches the given RegEx
      exclude: /node_modules/
    }, {
      test: /\.css$/,
      use: ['style-loader', 'css-loader']
    }]
  },
  plugins: [
    // Without this plugin, the vendor code would be in both the bundle.js and
    // vendor.js file
    new webpack.optimize.CommonsChunkPlugin({
      // Tells webpack to look at the sum of all project files (listed in
      // `entry`) and extract any modules that are common across both, extract
      // them out of other files and only include them in 'vendor' bundle.
      //
      // Using just `name`, webpack will think that any change to the main
      // bundle also resulted in a change to the vendor bundle
      // name: 'vendor'
      //
      // Creates a 3rd JS file, manifest, which helps to tell the browser if
      // the vendor bundle changed.
      names: ['vendor', 'manifest']
    }),
    new HTMLWebpackPlugin({
      template: 'src/index.html'
    })
  ]
};
