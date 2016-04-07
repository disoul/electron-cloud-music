'use strict'
export function play() {
  return { type: 'PLAYER', state: 'PLAYER_PLAY' };
}

export function pause() {
  return { type: 'PLAYER', state: 'PLAYER_PAUSE' };
}
