'use strict';
import lyricParser from '../libs/lrcparse';

function requestPromise(path, res, rej) {
  return new Promise((resolve, reject) => {
    if (rej) {
      reject(rej);
    }
    fetch('http://localhost:11015/' + path, {
      credentials: 'include',    
    })
    .then( res => {
      return res.json();
    }).then(json => {
      let [flag, response] = res(json);
      if (flag) {
        resolve(response);
      } else {
        reject(response);
      }
    }).catch(e => {
      reject(e);
    });
  })
}

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
  fetch('http://localhost:11015/music/url?id=' + id + '&br=' + br, {
    credentials: 'include',
  })
  .then( res => {
    return res.json();
  }).then( json => {
    callback(json.data[0]);
  } )
}

// 搜索歌曲
export function Search(keywords) {
  return requestPromise(
      'search/?keywords=' + keywords + '&type=1&limit=40',
      json => { return [true, json.result] });
}

// 登录
export function Login(username, pw) {
  const emailReg = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;
  const phoneReg = /^[0-9]{11}$/i
  let fetchUrl= ''
  if (phoneReg.test(username)) {
    fetchUrl = 'login/cellphone?phone=' + username + '&password=' + pw;
  } else if (emailReg.test(username)) {
    fetchUrl = 'login?email=' + username + '&password=' + pw;
  } else {
    var rej = '用户名格式错误';
  }

  return requestPromise(
      fetchUrl, 
      json => {
        if (json.code != 200) {
          return [false, 'Error:' + JSON.stringify(json)];
        } else {
        console.logg('resolve', json);
          return [true, json];
        }
      }, rej)
}

export function getPlayList(uid) {
  return requestPromise(
      'user/playlist?uid=' + uid,
      json => {
        return [true, json]
      });
}

// 获取歌单详情
export function SonglistDetail(id) {
  return requestPromise(
      'playlist/detail?id=' + id,
      json => {
        return [true, json.playlist]
      });
}

export function recommendResource() {
  return requestPromise(
      'recommend/resource',
      json => {
        return [true, json]
      });
}

export function recommendSongs() {
  return requestPromise(
      'recommend/songs',
      json => {
        return [true, json]
      });
}

export function playlistTracks(op, pid, tracks) {
  return requestPromise(
      'playlist/tracks?op='+op+'&pid='+pid+'&tracks='+tracks,
      json => {
        return [true, json]
      });
}

// 获取歌词
export function getLyric(id) {
  return requestPromise(
      'lyric?id=' + id,
      json => {
        return [true, json]
      });
}

export function logWeb(action, id, time, end) {
  var json = {
    'id': id,
    'type': 'song',
    'wifi': 0,
    'download': 0,
    'time': time,
    'end': end,
  };
  json = JSON.stringify(json);
  return requestPromise(
      'log/web?action=' + action + '&json=' + json,
      json => {
        return [true, json]
      });
}
