var webpack = require('webpack');

module.exports = {
  entry: [
    './src/app'
  ],

  output: {
    path: __dirname + '/dist',
    filename: 'bundle.js',
    publicPath: '/dist/'
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: [/node_modules/, /.+\.config.js/],
        loader: 'babel'
      }
    ]
  }
}
