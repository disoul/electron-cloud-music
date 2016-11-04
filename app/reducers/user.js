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
  let newState = Object.assign({}, state);
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
    case 'GUEST':
      newState.loginState = 'guest';
      removeCookie();
      return newState;
    default:
      return newState;
  }
}

function removeCookie() {
  Electron.ipcRenderer.sendSync('removecookie', 'http://localhost:11015', 'MUSIC_U');
  Electron.ipcRenderer.sendSync('removecookie', 'http://loaclhost:11015', 'NETEASE_WDA_UID');
  Electron.ipcRenderer.sendSync('removecookie', 'http://localhost:11015', '__csrf');
  Electron.ipcRenderer.sendSync('removecookie', 'http://localhost:11015', '__remember_me');
}
