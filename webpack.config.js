var path = require('path');
var webpack = require('webpack');
var browserslist = require('browserslist');

module.exports = {
  devtool: 'eval-source-map',
  entry: path.join(__dirname, 'app/main.js'),
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/dist/',
    filename: 'main.js',
  },
  module: {
    preloaders: [
      { test: /\.jsx?$/, loaders: ['eslint-loader']}
    ],
    loaders: [
      { test: /\.jsx?$/, exclude: /node_modules/, loader: "react-hot!babel" },
      { test: /\.css$/, loader: "style-loader!css-loader!postcss-loader" },
    
    ]
  },
  postcss: function() {
    return [precss, autoprefixer({ browsers: browserslist('last 2 Chrome versions') })]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
};
