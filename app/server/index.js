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

// 登录
export function Login(username, pw) {
  return new Promise((resolve, reject) => {
    const emailReg = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;
    const phoneReg = /^[0-9]{11}$/i
    let fetchUrl= ''
    if (phoneReg.test(username)) {
      fetchUrl = 'http://localhost:11015/login/cellphone?phone=' + username + '&password=' + pw;
    } else if (emailReg.test(username)) {
      fetchUrl = 'http://localhost:11015/login?email=' + username + '&password=' + pw;
    } else {
      reject('用户名格式错误');
    }

    fetch(fetchUrl, {
      credentials: 'include',    
    })
    .then( res => {
      return res.json();
    }).then( json => {
      if (json.code != 200) {
        reject('Error:' + JSON.stringify(json));
      } else {
      console.log('resolve', json);
        resolve(json);
      }
    }).catch( e => {
      reject(e);
    });
  })
}

export function getPlayList(uid) {
  return new Promise((resolve, reject) => {
    fetch('http://localhost:11015/user/playlist?uid=' + uid, {
      credentials: 'include',    
    })
    .then( res => {
      return res.json();
    }).then( json => {
      resolve(json);
    }).catch( e => {
      reject(e);
    });
  })
}

// 获取歌单详情
export function SonglistDetail(id) {
  return new Promise((resolve, reject) => {
    fetch('http://localhost:11015/playlist/detail?id=' + id)
    .then( res => {
      return res.json();
    }).then( json => {
      resolve(json.playlist);
    }).catch( e => {
      reject(e);
    });
  })
}
