'use strict'
export default function songlist(state, action) {
  if (action.type !== 'SONGLIST') {
    if (state) {
      return state;
    } else {
      return {
        state: 'fetching',
      };
    }
  }
  newState = Object.assign({}, state);
  switch (action.state) {
    case 'FETCHING':
      newState.state = 'fetching';
      return newState;
    case 'GET':
      newState.content = action.payload;
      newState.state = 'get';
      return newState;
    case 'ERROR':
      newState.errorinfo = action.payload;
      newState.state = 'error';
      return newState;
    default:
      return newState;
  }
}
