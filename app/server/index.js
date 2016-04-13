'use strict'
// 因为Electron cors的问题使用本地node相互通信
// id --> mp3url
export function getSongUrl(id) {
  fetch('http://localhost:11015/music/url?id=' + id.toString())
  .then( res => {
    return res.json();
  }).then( json => {
    return json.data[0].url;
  } )
}
