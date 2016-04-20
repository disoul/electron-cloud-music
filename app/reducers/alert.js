'use strict'
export default function alert(state, action) {
  if (action.type !== 'USER') {
    if (state) {
      return state;
    } else {
      return {
        showAlert: false,
      };
    }
  }
  newState = Object.assign({}, state);
  switch (action.state) {
    case 'NEWALERT':
      newState.showAlert = true;
      newState.body = action.payload;
      return newState;
    case 'CLOSEALERT':
      newState.showAlert = false;
      return newState;
    default:
      return newState;
  }
}
