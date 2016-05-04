'use strict'
export default function search(state, action) {
  if (action.type !== 'SEARCH') {
    if (state) {
      return state;
    } else {
      return {
        searchState: 'FINISH',
        searchResponse: null,
        errorInfo: null,
      }
    }
  }
  let newState = Object.assign({}, state);
  newState.searchState = action.state;
  switch (action.state) {
    case 'START':
      newState.searchInfo = action.payload;
      return newState;
    case 'CLOSE':
      return newState;
    case 'FINISH':
      newState.searchResponse = action.payload;
      return newState;
    case 'ERROR':
      newState.errorInfo = action.payload;
      return newState;
    default:
      return newState;
  }
}
