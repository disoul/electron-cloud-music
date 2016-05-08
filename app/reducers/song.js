'use strict'
export default function song(state, action) {
  rules = ['loop', ]
  if (action.type !== 'SONG') {
    if (state) {
      return state;
    } else {
      return {
        songlist: [],
        playRule: 0, // loop one shuffle
        rules: ['loop', 'one', 'shuffle'],
        showplaylist: false,
        currentSongIndex: 0,
      };
    }
  }
  newState = _.clone(state, true);
  switch (action.state) {
    case 'CHANGE':
      let index = isExist(action.payload, newState.songlist);
      if (index) {
        index--;
        newState.currentSongIndex = index;
      } else {
        var songlist = _.clone(newState.songlist, true);
        songlist.push(action.payload);
        newState.songlist = songlist;
        newState.currentSongIndex = newState.songlist.length - 1;
      }
      return newState;
    case 'REMOVEFROMLIST':
      if ((newState.currentSongIndex) == action.payload && (action.payload == newState.songlist.length - 1)) {
        newState.currentSongIndex--;
      }
      if (newState.currentSongIndex > action.payload) {
        newState.currentSongIndex--;
      }
      let songlist = _.clone(newState.songlist, true);
      songlist.splice(action.payload, 1);
      newState.songlist = songlist;
      return newState;
    case 'REMOVELIST':
      newState.songlist = [];
      return newState;
    case 'SHOWPLAYLIST':
      newState.showplaylist = true;
      return newState;
    case 'CLOSEPLAYLIST':
      newState.showplaylist = false;
      return newState;
    case 'PLAYFROMLIST':
      newState.currentSongIndex = action.payload;
      // FIXME
      if (newState.playRule == 2) {
        let toShuffle = [];
        for (let i = 0;i < newState.songlist.length;i++) {
          if (i == 0) {
            toShuffle[i] = newState.currentSongIndex;
          } else if (i == newState.currentSongIndex) {
            toShuffle[i] = 0;
          } else {
            toShuffle[i] = i;
          }
        }
        newState.shuffleList = getShuffle(toShuffle, 1);
        newState.shuffleIndex = 0;
      }
      return newState;
    case 'ADD':
      if (isExist(action.payload, state.songlist)) {
        return state;
      }
      var songlist = _.clone(newState.songlist, true);
      songlist.push(action.payload);
      newState.songlist = songlist;
      // if shuffle
      if (newState.playRule == 2) {
        newState.shuffleList.push(newState.songlist.length - 1);
        newState.shuffleList = getShuffle(
              newState.shuffleList, 
              newState.shuffleIndex + 1
              );
      }
      if (newState.songlist.length == 1) {
        newState.currentSongIndex = 0;
      }
      return newState;
    case 'ADDLIST':
      if (action.payload.play) {
        var playIndex = newState.songlist.length;
      }
      var songlist = _.clone(newState.songlist, true);
      action.payload.songlist.map(song => {
        if (isExist(song, newState.songlist)) {
          return;
        }
        songlist.push(song);
        if (newState.playRule == 2) {
          newState.shuffleList.push(songlist.length - 1);
        }
      });
      if (newState.playRule == 2) {
        newState.shuffleList = getShuffle(
              newState.shuffleList, 
              newState.shuffleIndex + 1
              );
      }
      if (action.payload.play && newState.songlist.length > playIndex) {
        newState.currentSongIndex = playIndex;
      }
      if (songlist.length == 1) {
        newState.currentSongIndex = 0;
      }
      newState.songlist = songlist;
      return newState;
    case 'CHANGERULE':
      if (newState.playRule == 2) {
        newState.playRule = 0;
      } else {
        newState.playRule++;
      }

      // if rule is shuffle
      if (newState.playRule == 2) {
        let toShuffle = [];
        for (let i = 0;i < newState.songlist.length;i++) {
          if (i == 0) {
            toShuffle[i] = newState.currentSongIndex;
          } else if (i == newState.currentSongIndex) {
            toShuffle[i] = 0;
          } else {
            toShuffle[i] = i;
          }
        }
        newState.shuffleList = getShuffle(toShuffle, 1);
        newState.shuffleIndex = 0;
      }

      return newState;
    case 'NEXT':
      if (newState.songlist.length == 0) {
        return newState;
      }
      if ((newState.playRule == 0) || (newState.playRule == 1)) {
        if (newState.currentSongIndex === newState.songlist.length - 1){
          newState.currentSongIndex = 0;
        } else {
          newState.currentSongIndex++;
        }
        return newState;
      } else if (newState.playRule == 2) {    // shuffle
        if (newState.shuffleIndex === newState.shuffleList.length - 1){
          newState.shuffleIndex = 0;
        } else {
          newState.shuffleIndex++;
        }
        newState.currentSongIndex = newState.shuffleList[newState.shuffleIndex];
        return newState;
      }
        //TODO: shuffle
    case 'PREVIOUS':
      if (newState.songlist.length == 0) {
        return newState;
      }
      if ((newState.playRule == 0) || (newState.playRule == 1)) {
        if (newState.currentSongIndex === 0){
          newState.currentSongIndex = newState.songlist.length - 1;
        } else {
          newState.currentSongIndex--;
        }
        return newState;
      } else if (newState.playRule == 2) {    // shuffle
        if (newState.shuffleIndex === 0){
          newState.shuffleIndex = newState.shuffleList.length - 1;
        } else {
          newState.shuffleIndex--;
        }
        newState.currentSongIndex = newState.shuffleList[newState.shuffleIndex];
        return newState;
      }
    default:
      return newState;
  }
}

function getShuffle(lastshuffle, index) {
  let toShuffle = lastshuffle.slice(index, lastshuffle.length);
  lastshuffle = lastshuffle.slice(0, index);
  doShuffle(toShuffle).map(value => {
    lastshuffle.push(value); 
  });

  return lastshuffle;
}

function doShuffle(list) {
  for (let i = list.length;i > 0;i--) {
    let j = Math.floor(Math.random() * i);
    let x = list[i - 1];
    list[i - 1] = list[j];
    list[j] = x;
  }

  return list;
}

function isExist(newsong, list) {
  for (let i = 0;i < list.length;i++) {
    if (list[i].id == newsong.id) {
      return i + 1;
    }
  }
  return false;
}
