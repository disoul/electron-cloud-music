'use strict'
import { Search, Login } from '../server';
export function play() {
  return { type: 'PLAYER', state: 'PLAYER_PLAY' };
}

export function pause() {
  return { type: 'PLAYER', state: 'PLAYER_PAUSE' };
}

export function startSearch(keywords) {
  return { type: 'SEARCH', state: 'START', payload: { keywords: keywords }}
}

export function errorSearch(e) {
  return { type: 'SEARCH', state: 'ERROR', payload: e }
}

export function finishSearch(res) {
  return { type: 'SEARCH', state: 'FINISH', payload: res }
}

export function closeSearch() {
  return { type: 'SEARCH', state: 'CLOSE' }
}

export function search(keywords) {
  return dispatch => {
    dispatch(startSearch(keywords));
    Search(keywords).then( res => {
      dispatch(finishSearch(res));
    } )
    .catch( e => {
      dispatch(errorSearch(e));
    } )
  };
} 

export function changeSong(id, br) {
  return { type: 'SONG', state: 'CHANGE', payload: {id: id, br: br}}
}

export function logging_in(form) {
  return { type: 'USER', state: 'LOGIN_STATE_LOGGING_IN', payload: form }
};

export function logged_in(res) {
  return { type: 'USER', state: 'LOGIN_STATE_LOGGED_IN', payload: res }
};

export function logged_failed(errorinfo) {
  return { type: 'USER', state: 'LOGIN_STATE_LOGGED_FAILED', payload: errorinfo }
}

export function loginform(flag) {
  return { type: 'USER', state: 'LOGINFORM', payload: flag }
}

export function login(form) {
  return dispatch => {
    dispatch(logging_in(form));
    Login(form.phone, form.password)
    .then(res => {
      dispatch(logged_in(res))
    })
    .catch(error => {
      dispatch(logged_failed(error.toString()));
    });
  }
}
