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
      };
    }
  }
  newState = Object.assign({}, state);
  switch (action.state) {
    case 'CHANGE':
      newState.songlist.push(action.payload);
      newState.currentSongIndex = newState.songlist.length - 1;
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
      // if shuffle
      newState.songlist.push(action.payload);
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
        newState.currentSongIndex = newState.songlist.length;
      }
      action.payload.songlist.map(song => {
        newState.songlist.push(song);
        if (newState.playRule == 2) {
          newState.shuffleList.push(newState.songlist.length - 1);
        }
      });
      if (newState.playRule == 2) {
        newState.shuffleList = getShuffle(
              newState.shuffleList, 
              newState.shuffleIndex + 1
              );
      }
      if (newState.songlist.length == 1) {
        newState.currentSongIndex = 0;
      }
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
