'use strict'
export default function user(state, action) {
  if (action.type !== 'USERSONG') {
    if (state) {
      return state;
    } else {
      return {
        create: [],
        collect: [],
        state: 'nouser',
        uid: null,
      };
    }
  }
  let newState = Object.assign({}, state);
  switch (action.state) {
    case 'FETCHING':
      newState.state = 'fetching';
      newState.uid = action.payload;
      return newState;
    case 'GET':
      [newState.create, newState.collect] = separatePlayList(newState.uid, action.payload);
      newState.state = 'get';
      return newState;
    case 'ERROR':
      newState.state = 'error';
      newState.errorinfo = action.payload;
      return newState;
    default:
      return newState;
  }
}

function separatePlayList(id, list) {
  let create = [], collect = [];
  list.map(songlist => {
    if (songlist.userId === id) {
      create.push(songlist);
    } else {
      collect.push(songlist);
    }
  });

  return [create, collect];
}
