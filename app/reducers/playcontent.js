'use strict'
export default function playcontent(state, action) {
  if (action.type !== 'PLAYCONTENT') {
    if (state) {
      return state;
    } else {
      return {
        mode: 'mini',
        state: 'show',
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
    default:
      return newState;
  }
}
