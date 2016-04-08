var path = require('path');
var webpack = require('webpack');
var browserslist = require('browserslist');
var precss = require('precss');
var autoprefixer = require('autoprefixer');

module.exports = {
  entry: path.join(__dirname, 'app/main.js'),
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/dist/',
    filename: 'main.js',
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
  module: {
    preloaders: [
      { test: /\.jsx?$/, loaders: ['eslint-loader']}
    ],
    loaders: [
      { test: /\.(js|jsx)?$/, exclude: /node_modules/, loader: "babel" },
      { test: /\.css?$/, loader: "style-loader!css-loader!postcss-loader" },
      { test: /\.(ttf|eot|woff(2)?)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url?name=[path]" },
      { test: /\.(png|jpg|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url?name=[path]" },
    
    ]
  },
  postcss: function() {
    return [precss, autoprefixer({ browsers: browserslist('last 2 Chrome versions') })]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
};
