var Encrypt = require('./crypto.js');
var express = require('express');
var http = require('http');

var app = express();



function createWebAPIRequest(host, path, method, data, callback) {
  var music_req = '';
  var cryptoreq = Encrypt(data);
  var http_client = http.request({
    hostname: host,
    method: method,
    path: path,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  }, function(res) {
    res.setEncoding('utf8');
    if (res.statusCode == 500) {
      console.log("500");
      createWebAPIRequest(host, path, method, data, callback);
      return;
    } else { 
      console.log("200");
      res.on('data', function (chunk) {
        music_req += chunk;
      });
      res.on('end', function() {
        callback(music_req);
      })
    }
  });
  http_client.write('params=' + cryptoreq.params + '&encSecKey=' + cryptoreq.encSecKey);
  http_client.end(); 
}

function createRequest(path, method, data, callback) {
  var ne_req = '';
  var http_client = http.request({
    hostname: 'music.163.com',
    method: method,
    path: path,
    headers: {
      'Referer': 'http://music.163.com',
      'Cookie' : 'appver=2.0.2',
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  }, function(res) {
    res.setEncoding('utf8');
    res.on('data', function (chunk) {
      ne_req += chunk;
    });
    res.on('end', function() {
      callback(ne_req);
    })
  });
  console.log(data);
  http_client.write(data);
  http_client.end(); 
}

app.get('/music/url', function(request, response) {
  var id = parseInt(request.query.id);
  var data = {
    "ids": [id],
    "br": 128000,
    "csrf_token": "",
  };

  createWebAPIRequest(
    'music.163.com',
    '/weapi/song/enhance/player/url',
    'POST',
    data,
    function(music_req) {
      response.setHeader("Content-Type", "application/json");
      response.send(music_req);
    }
  )
});

app.get('/search', function(request, response) {
  var keywords = request.query.keywords;
  var type = request.query.type;
  var limit = request.query.limit;
  var data = 's=' + keywords + '&limit=' + limit + '&type=' + type + '&offset=0';
  createRequest('/api/search/get/', 'POST', data, function(res) {
    response.setHeader("Content-Type", "application/json");
    response.send(res);
  });

});

process.on('SIGHUP', function() {
  console.log('server: bye bye');
  process.exit();
});

app.listen(11015, function() {
  console.log('cloud music server listening on port 11015...')
});
