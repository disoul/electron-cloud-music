var Encrypt = require('./crypto.js');
var express = require('express');
var http = require('http');

var app = express();

function webapi_request(client, data) {
  client.write('params=' + data.params + '&encSecKey=' + data.encSecKey);
  client.end(); 
}

function createRequest(host, path, method, data, callback) {
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
      createRequest(host, path, method, data, callback);
      return;
    } else { 
      console.log("200");
      res.on('data', function (chunk) {
        music_req += chunk;
      });
      res.on('end', function() {
        if (music_req == '') {
          console.log('empty');
          createRequest(host, path, method, data, callback);
          return;
        }
        callback(music_req);
      })
    }
  });
  http_client.write('params=' + cryptoreq.params + '&encSecKey=' + cryptoreq.encSecKey);
  http_client.end(); 
}

app.get('/music/url', function(request, response) {
  var id = parseInt(request.query.id);
  var data = {
    "ids": [id],
    "br": 128000,
    "csrf_token": "",
  };

  createRequest(
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

app.listen(11015, function() {
  console.log('cloud music server listening on port 11015...')
});
