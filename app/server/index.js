'use strict'
// 因为Electron cors的问题使用本地node相互通信

// id --> mp3url
export function getSongUrl(song, callback) {
  var id = song.id, br;
  if (song.hMusic) {
    br = song.hMusic.bitrate;
  } else if (song.mMusic) {
    br = song.mMusic.bitrate;
  } else if (song.lMusic) {
    br = song.lMusic.bitrate;
  }
  fetch('http://localhost:11015/music/url?id=' + id + '&br=' + br)
  .then( res => {
    return res.json();
  }).then( json => {
    callback(json.data[0].url);
  } )
}

// 搜索歌曲
export function Search(keywords) {
  return new Promise((resolve, reject) => {
    fetch(
      'http://localhost:11015/search/?keywords=' + keywords + '&type=1&limit=40'
    )
    .then( res => {
      return res.json();
    }).then( json => {
      resolve(json.result);
    }).catch( e => {
      reject(e);
    });
  })
}

export function Login(phone, pw) {
  return new Promise((resolve, reject) => {
    fetch(
      'http://localhost:11015/login/cellphone?phone=' + phone + '&password=' + pw
    )
    .then( res => {
      return res.json();
    }).then( json => {
      if (json.code == 400) {
        reject('Error:' + JSON.stringify(json) + '   可能是因为用户名或者密码错误');
      } else {
      console.log('resolve', json);
        resolve(json);
      }
    }).catch( e => {
      reject(e);
    });
  })
  
}
