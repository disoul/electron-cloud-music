'use strict'
export default function player(state, action) {
  switch (action.type) {
    case 'PLAYER':
      if (action.state == 'PLAYER_PLAY') {
        return { isplay: true }
      } else {
        return { isplay: false }
      }

    default:
      if (state) {
        return state;
      } else {
        return { isplay: false }
      }
  }
}
