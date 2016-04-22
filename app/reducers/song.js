'use strict'
export default function song(state, action) {
  if (action.type !== 'SONG') {
    if (state) {
      return state;
    } else {
      return {
        songlist: [],
        playRule: 'loop', // loop one shuffle
      };
    }
  }
  newState = Object.assign({}, state);
  switch (action.state) {
    case 'CHANGE':
      newState.songlist.push(action.payload);
      newState.currentSongIndex = newState.songlist.length - 1;
      return newState;
    case 'ADD':
      newState.songlist.push(action.payload);
      return newState;
    case 'NEXT':
      switch (newState.playRule) {
        case 'loop':
          if (newState.currentSongIndex === newState.songlist.length - 1){
            newState.currentSongIndex = 0;
          } else {
            newState.currentSongIndex++;
          }
          return newState;
        case 'one':
          return newState;
      }
        //TODO: shuffle
    case 'PREVIOUS':
      switch (newState.playRule) {
        case 'loop':
          if (newState.currentSongIndex === 0){
            newState.currentSongIndex = newState.songlist.length - 1;
          } else {
            newState.currentSongIndex--;
          }
          return newState;
        case 'one':
          return newState;
      }
    default:
      return newState;
  }
}
