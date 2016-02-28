var webpack = require('webpack');

module.exports = {
  entry: [
    'webpack-dev-server/client?http://localhost:8080',
    './src/app.js'
  ],

  output: {
    path: __dirname + '/dist',
    filename: 'bundle.js'
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
