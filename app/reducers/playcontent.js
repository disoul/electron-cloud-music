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
        lyric: null,
        lyricError: null,
      };
    }
  }
  newState = Object.assign({}, state);
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
      return newState;
    case 'LRCERROR':
      newState.lyricState = 'error';
      newState.lyricError = action.payload;
      return newState;
    default:
      return newState;
  }
}
