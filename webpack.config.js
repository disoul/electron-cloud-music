var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: path.join(__dirname, 'app/main.js'),
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'main.js',
  },
  module: {
    preloaders: [
      { test: /\.jsx?$/, loaders: ['eslint-loader']}
    ],
    loaders: [
      { test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel' },
    
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
};

