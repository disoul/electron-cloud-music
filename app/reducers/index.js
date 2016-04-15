import { combineReducers } from 'redux';
import player from './player';
import search from './search';

const cloudMusic = combineReducers({
  player,
  search,
});

export default cloudMusic;
