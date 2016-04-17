'use strict'
// 因为Electron cors的问题使用本地node相互通信

// id --> mp3url
export function getSongUrl(id, callback) {
  fetch('http://localhost:11015/music/url?id=' + id.toString())
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
