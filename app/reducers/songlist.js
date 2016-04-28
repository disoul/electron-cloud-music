'use strict'
export default function songlist(state, action) {
  if (action.type !== 'SONGLIST') {
    if (state) {
      return state;
    } else {
      return {
      };
    }
  }
  newState = Object.assign({}, state);
  switch (action.state) {
    default:
      return newState;
  }
}
