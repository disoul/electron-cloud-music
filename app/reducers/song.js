'use strict'
export default function song(state, action) {
  rules = ['loop', ]
  if (action.type !== 'SONG') {
    if (state) {
      return state;
    } else {
      return {
        songlist: [],
        playRule: 0, // loop one shuffle
        rules: ['loop', 'one', 'shuffle']
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
    case 'CHANGERULE':
      if (newState.playRule == 2) {
        newState.playRule = 0;
      } else {
        newState.playRule++;
      }
      return newState;
    case 'NEXT':
      if ((newState.playRule == 0) || (newState.playRule == 1)) {
        if (newState.currentSongIndex === newState.songlist.length - 1){
          newState.currentSongIndex = 0;
        } else {
          newState.currentSongIndex++;
        }
        return newState;
      }
        //TODO: shuffle
    case 'PREVIOUS':
      if ((newState.playRule == 0) || (newState.playRule == 1)) {
        if (newState.currentSongIndex === 0){
          newState.currentSongIndex = newState.songlist.length - 1;
        } else {
          newState.currentSongIndex--;
        }
        return newState;
      }
    default:
      return newState;
  }
}
