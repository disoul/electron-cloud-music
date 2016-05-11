var Encrypt = require('./crypto.js');
var express = require('express');
var http = require('http');
var crypto = require('crypto');
var tough = require('tough-cookie');
var Cookie = tough.Cookie;

var app = express();

function createWebAPIRequest(host, path, method, data, cookie) {
  return new Promise(function(resolve, reject) {
    console.log('reqCookie', cookie);
    var music_req = '';
    var cryptoreq = Encrypt(data);
    var http_client = http.request({
      hostname: host,
      method: method,
      path: path,
      headers: {
        'Accept': '*/*',
        'Accept-Language': 'zh-CN,zh;q=0.8,gl;q=0.6,zh-TW;q=0.4',
        'Connection': 'keep-alive',
        'Content-Type': 'application/x-www-form-urlencoded',
        'Referer': 'http://music.163.com',
        'Host': 'music.163.com',
        'Cookie': cookie,
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/33.0.1750.152 Safari/537.36',

      },
    }, function(res) {
      res.setEncoding('utf8');
      res.on('error', function(err) {
        reject(err);
      });

      if (res.statusCode != 200) {
        console.log("500");
        return createWebAPIRequest(host, path, method, data, cookie);
      } else { 
        console.log("200");
        res.on('data', function (chunk) {
          music_req += chunk;
        });
        res.on('end', function() {
          if (music_req == '') {
            console.log('empty');
            return createWebAPIRequest(host, path, method, data, cookie);
          }
          if (res.headers['set-cookie']) {
            resolve(music_req, res.headers['set-cookie']);
          } else {
            resolve(music_req);
          }
        })
      }
    });
    http_client.write('params=' + cryptoreq.params + '&encSecKey=' + cryptoreq.encSecKey);
    http_client.end(); 
  });
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
  if (method == 'POST') {
    http_client.write(data);
  }
  http_client.end(); 
}

app.get('/music/url', function(request, response) {
  var id = parseInt(request.query.id);
  var br = parseInt(request.query.br);
  var data = {
    "ids": [id],
    "br": br,
    "csrf_token": ""
  };
  console.log(data);
  var cookie = request.get('Cookie') ? request.get('Cookie') : '';

  createWebAPIRequest(
    'music.163.com',
    '/weapi/song/enhance/player/url',
    'POST',
    data,
    cookie
  ).then(function(req) {
      response.setHeader("Content-Type", "application/json");
      response.send(req);
  }).catch(function(err) {
    response.setState(502).send(err)
  });
});

app.get('/search', function(request, response) {
  var keywords = request.query.keywords;
  var type = request.query.type;
  var limit = request.query.limit;
  var data = 's=' + keywords + '&limit=' + limit + '&type=' + type + '&offset=0';
  createRequest('/api/search/pc/', 'POST', data, function(res) {
    response.setHeader("Content-Type", "application/json");
    response.send(res);
  });
});

app.get('/login/cellphone', function(request, response) {
  var phone = request.query.phone;
  var cookie = request.get('Cookie') ? request.get('Cookie') : '';
  var md5sum = crypto.createHash('md5');
  md5sum.update(request.query.password);
  var data = {
    'phone': phone,
    'password': md5sum.digest('hex'),
    'rememberLogin': 'true'
  };

  console.log(data);

  createWebAPIRequest(
    'music.163.com',
    '/weapi/login/cellphone',
    'POST',
    data,
    cookie
  ).then(function(music_req, cookie) {
      console.log(music_req);
      response.set({
        'Set-Cookie': cookie,
      });
      response.send(music_req);
  }).catch(function(err) {
    response.setState(502).send(err)
  });
});

app.get('/login', function(request, response) {
  var email = request.query.email;
  var cookie = request.get('Cookie') ? request.get('Cookie') : '';
  var md5sum = crypto.createHash('md5');
  md5sum.update(request.query.password);
  var data = {
    'username': email,
    'password': md5sum.digest('hex'),
    'rememberLogin': 'true'
  };

  console.log(data);

  createWebAPIRequest(
    'music.163.com',
    '/weapi/login',
    'POST',
    data,
    cookie
  ).then(function(music_req, cookie) {
      console.log(music_req);
      response.set({
        'Set-Cookie': cookie,
      });
      response.send(music_req);
  }).catch(function(err) {
    response.setState(502).send(err)
  });
});

app.get('/recommend/songs', function(request, response) {
  var cookie = request.get('Cookie') ? request.get('Cookie') : '';
  var data = {
    "offset": 0,
    "total": true,
    "limit": 20,
    "csrf_token": ""
  };

  console.log(data);

  createWebAPIRequest(
    'music.163.com',
    '/weapi/v1/discovery/recommend/songs',
    'POST',
    data,
    cookie
  ).then(function(music_req) {
    console.log(music_req);
    response.send(music_req);
  }).catch(function(err) {
    response.setState(502).send(err)
  });
});

// 获取每日推荐歌单
app.get('/recommend/resource', function(request, response) {
  var cookie = request.get('Cookie') ? request.get('Cookie') : '';
  var data = {
    "csrf_token": ""
  };

  console.log(data);

  createWebAPIRequest(
    'music.163.com',
    '/weapi/v1/discovery/recommend/resource',
    'POST',
    data,
    cookie
  ).then(function(music_req) {
    console.log(music_req);
    response.send(music_req);
  }).catch(function(err) {
    response.setState(502).send(err)
  });
});

app.get('/lyric', function(request, response) {
  var id = request.query.id;
  createRequest('/api/song/lyric?os=osx&id=' + id + '&lv=-1&kv=-1&tv=-1', 'GET', null, function(res) {
    response.setHeader("Content-Type", "application/json");
    response.send(res);
  });
});

app.get('/user/playlist', function(request, response) {
  var cookie = request.get('Cookie') ? request.get('Cookie') : '';
  var data = {
    "offset": 0,
    "uid": request.query.uid,
    "limit": 1000,
    "csrf_token": ""
  };

  console.log(data);

  createWebAPIRequest(
    'music.163.com',
    '/weapi/user/playlist',
    'POST',
    data,
    cookie
  ).then(function(music_req) {
    console.log(music_req);
    response.send(music_req);
  }).catch(function(err) {
    response.setState(502).send(err)
  });
});

app.get('/playlist/detail', function(request, response) {
  var cookie = request.get('Cookie') ? request.get('Cookie') : '';
  var detail, imgurl;
  var data = {
    "id": request.query.id,
    "offset": 0,
    "total": true,
    "limit": 1000,
    "n": 1000,
    "csrf_token": ""
  };

  console.log(data);

  createWebAPIRequest(
    'music.163.com',
    '/weapi/v3/playlist/detail',
    'POST',
    data,
    cookie
  ).then(function(music_req) {
    console.log(music_req);
    detail = music_req;
    mergeRes();
  }).catch(function(err) {
    response.setState(502).send(err)
  });

  // FIXME:i dont know the api to get coverimgurl
  // so i get it by parsing html
  var http_client = http.get({
    hostname: 'music.163.com',
    path: '/playlist?id=' + request.query.id,
    headers: {
      'Referer': 'http://music.163.com',
    },
  }, function(res) {
    res.setEncoding('utf8');
    var html = '';
    res.on('data', function (chunk) {
      html += chunk;
    });
    res.on('end', function() {
      console.log('end', html);
      var regImgCover = /\<img src=\"(.*)\" class="j-img"/ig;
        imgurl = regImgCover.exec(html)[1];
        mergeRes();

    })
  });

  var mergeRes = function() {
    if (imgurl != undefined && detail != undefined) {
      detail = JSON.parse(detail);
      detail.playlist.picUrl = imgurl;
      response.send(detail);
    }
  };
  
});

app.get('/playlist/tracks', function(request, response) {
  var op = request.query.op
  var pid = request.query.pid;
  var tracks = request.query.tracks;
  var cookie = request.get('Cookie') ? request.get('Cookie') : '';
  console.log('COOKIESS', cookie);
  var data = {
    "op": op,
    "pid": pid,
    "tracks": tracks,
    "trackIds": JSON.stringify([tracks]),
    "csrf_token": "",
  };

  console.log(data);

  createWebAPIRequest(
    'music.163.com',
    '/weapi/playlist/manipulate/tracks',
    'POST',
    data,
    cookie
  ).then(function(music_req) {
    console.log(music_req);
    response.send(music_req);
  }).catch(function(err) {
    response.setState(502).send(err)
  });
});

app.get('/log/web', function(request, response) {
  var cookie = request.get('Cookie') ? request.get('Cookie') : '';
  var data = {
    "action": request.query.action,
    "json": request.query.json,
    "csrf_token": "",
  };

  console.log(data);

  createWebAPIRequest(
    'music.163.com',
    '/weapi/log/web',
    'POST',
    data,
    cookie
  ).then(function(music_req) {
    console.log(music_req);
    response.send(music_req);
  }).catch(function(err) {
    response.setState(502).send(err)
  });
});

process.on('SIGHUP', function() {
  console.log('server: bye bye');
  process.exit();
});

module.exports = app;
