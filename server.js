var path = require('path');  
var express = require('express');  
var webpack = require('webpack');  
var webpackMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var config = require('./webpack.config.js');

var app = express();  
var compiler = webpack(config);

app.use(express.static(__dirname));  
app.use(webpackMiddleware(compiler));
app.use(webpackHotMiddleware(compiler));
app.get('/', function response(req, res) {  
  res.sendFile(path.join(__dirname, './index.html'));
});

app.listen(8080);  
