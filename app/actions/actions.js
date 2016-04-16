'use strict'
import { Search } from '../server';
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
