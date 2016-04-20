import { combineReducers } from 'redux';
import player from './player';
import search from './search';
import song from './song';

const cloudMusic = combineReducers({
  player,
  search,
  song,
  user,
});

export default cloudMusic;
