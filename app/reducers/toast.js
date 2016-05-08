'use strict'
export default function toast(state, action) {
  if (action.type !== 'TOAST') {
    if (state) {
      return state;
    } else {
      return {
        toastQuery: [],
      }
    }
  }
  let newState = _.clone(state, true);
  switch (action.state) {
    case 'ADD':
      var query = _.clone(newState.toastQuery, true);
      query.push(action.payload);
      newState.toastQuery = query;
      return newState;
    case 'FINISH':
      var query = _.clone(newState.toastQuery, true);
      query.splice(0, 1);
      newState.toastQuery = query;
      return newState;
    default:
      return newState;
  }
}
