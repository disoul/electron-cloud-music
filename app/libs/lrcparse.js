'use strict';
export default function lyricParser(lrc) {
  return {
    'lyric': parseLrc(lrc.lrc.lyric),
    'tlyric': parseLrc(lrc.tlyric.lyric),
    'lyricuser': lrc.lyricUser,
    'transuser': lrc.transUser,
  } 
}

function parseLrc(lrc) {
  let _lrc = lrc.split('\n');
  return _lrc.map(lyricItem => {
    let timeReg = /^\[([0-9][0-9])\:([0-9][0-9].*)](.*)$/i;
    let parsed = timeReg.exec(lyricItem);
    if (parsed == null) {
      return null;
    }
    let min = parseInt(parsed[1]);
    let sec = parseFloat(parsed[2]);

    return {
      'time': sec * 1000 + min * 60 * 1000,
      'content': parsed[3],
    };
  });
}
