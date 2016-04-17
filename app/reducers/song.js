'use strict'
export default function song(state, action) {
  if (action.type !== 'SONG') {
    if (state) {
      return state;
    } else {
      return {};
    }
  }
  newState = Object.assign({}, state);
  switch (action.state) {
    case 'CHANGE':
      newState.currentSong = action.payload;
      return newState;
    default:
      return newState;
  }
}
