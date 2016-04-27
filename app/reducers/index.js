import { combineReducers } from 'redux';
import player from './player';
import search from './search';
import song from './song';
import user from './user';
import usersong from './usersong';

const cloudMusic = combineReducers({
  player,
  search,
  song,
  user,
  usersong,
});

export default cloudMusic;
