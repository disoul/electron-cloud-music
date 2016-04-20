'use strict'
export default function user(state, action) {
  if (action.type !== 'USER') {
    if (state) {
      return state;
    } else {
      return {
        loginState: 'guest',
        showForm: false,
      };
    }
  }
  newState = Object.assign({}, state);
  switch (action.state) {
    case 'LOGIN_STATE_LOGGING_IN':
      newState.loginState = 'logging_in';
      return newState;
    case 'LOGIN_STATE_LOGGED_IN':
      newState.loginState = 'logged_in';
      newState.account = action.payload.account;
      newState.profile = action.payload.profile;
      return newState;
    case 'LOGIN_STATE_LOGGED_FAILED':
      newState.loginState = 'logged_failed';
      newState.loginError = action.payload;
      return newState;
    case 'LOGINFORM':
      newState.showForm = action.payload;
      return newState;
    default:
      return newState;
  }
}
