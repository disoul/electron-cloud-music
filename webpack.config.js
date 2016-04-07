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
  module: {
    preloaders: [
      { test: /\.jsx?$/, loaders: ['eslint-loader']}
    ],
    loaders: [
      { test: /\.jsx?$/, exclude: /node_modules/, loader: "react-hot!babel" },
      { test: /\.css?$/, loader: "style-loader!css-loader!postcss-loader" },
      { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&minetype=application/font-woff" },
      { test: /\.(ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader" },
      { test: /\.(png|jpg|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url?limit=40000" },
    
    ]
  },
  postcss: function() {
    return [precss, autoprefixer({ browsers: browserslist('last 2 Chrome versions') })]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
};
