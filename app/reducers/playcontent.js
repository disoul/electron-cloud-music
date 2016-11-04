'use strict'
export default function playcontent(state, action) {
  if (action.type !== 'PLAYCONTENT') {
    if (state) {
      return state;
    } else {
      return {
        mode: 'mini',
        state: 'show',
        lyricState: 'fetching',
        lyric: { lyric: [{content: '无歌词', time: '0'}]},
        currentLyric: 0,
        lyricError: null,
      };
    }
  }
  let newState = Object.assign({}, state);
  switch (action.state) {
    case 'SHOWMINI':
      newState.mode = 'mini';
      newState.state = 'show';
      return newState;
    case 'HIDDENMINI':
      newState.mode = 'mini';
      newState.state = 'hidden';
      return newState;
    case 'SHOWMAX':
      newState.mode = 'max';
      return newState;
    case 'HIDDENMAX':
      newState.mode = 'mini';
      return newState;
    case 'LRCFETCH':
      newState.lyricState = 'fetching';
      return newState;
    case 'LRCGET':
      newState.lyricState = 'get';
      newState.lyric = action.payload;
      newState.currentLyric = 0;
      return newState;
    case 'LRCERROR':
      newState.lyricState = 'error';
      newState.lyricError = action.payload;
      newState.lyric = { lyric: [{content: '无歌词', time: '0'}]};
      return newState;
    case 'LRCSET':
      newState.currentLyric = action.payload;
      return newState;
    default:
      return newState;
  }
}
