'use strict'
export default function song(state, action) {
  switch (action.type) {
    case 'SONG':
      return action.payload;
    default:
      if (state) {
        return state;
      } else {
        return { id: null }
      }
  }
}
