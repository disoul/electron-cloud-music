import { combineReducers } from 'redux';
import player from './player';
import search from './search';
import song from './song';
import user from './user';
import usersong from './usersong';
import router from './router';

const cloudMusic = combineReducers({
  player,
  search,
  song,
  user,
  usersong,
  router,
});

export default cloudMusic;
