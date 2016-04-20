'use strict'
export default function user(state, action) {
  if (action.type !== 'USER') {
    if (state) {
      return state;
    } else {
      return {};
    }
  }
  newState = Object.assign({}, state);
  switch (action.state) {
    case 'LOGIN_STATE_LOGGING_IN':
      newState.loginState = 'logging_in';
      return newState;
    case 'LOGIN_STATE_LOGGED_IN':
      newState.loginState = 'logged_in';
      newState.account = state.payload.account;
      newState.profile = state.payload.profile;
      return newState;
    case 'LOGIN_STATE_LOGGED_FAILED':
      newState.loginState = 'logged_failed';
      newState.loginError = state.payload;
      return newState;
    default:
      return newState;
  }
}
