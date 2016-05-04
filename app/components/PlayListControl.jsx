import React, { Component } from 'react';

export default class PlayListControl extends Component {
  constructor(props: any) {
    super(props);
  }

  _changeRule(e) {
    this.props.changeRule();
  }

  _showorhidePlaylist(e) {
    if (this.props.song.showplaylist) {
      this.props.closePlayList();
    } else {
      this.props.showPlayList();
    }
  }

  getClassName() {
    if (this.props.song.showplaylist) {
      return "player__playlistcontrol__playlist active";
    } else {
      return "player__playlistcontrol__playlist";
    }
  }

  getPlayRule() {
    //FIXME: svg-loader only accept string args
    if (this.props.song.rules[this.props.song.playRule] == 'one') {
      return require('../assets/icon/one.svg');
    }
    if (this.props.song.rules[this.props.song.playRule] == 'loop') {
      return require('../assets/icon/loop.svg');
    }
    if (this.props.song.rules[this.props.song.playRule] == 'shuffle') {
      return require('../assets/icon/shuffle.svg');
    }
  }

  render() {
    let PlayRule = this.getPlayRule();
    let PlayListIcon = require('../assets/icon/playlist.svg');
    return (
      <div className="player__playlistcontrol">
        <div className="player__playlistcontrol__playlistrule">
          <PlayRule
            className="i" 
            onClick={e => this._changeRule(e)}
            />
        </div>
        <div 
          onClick={e => this._showorhidePlaylist(e)}
          className={this.getClassName()}>
          <PlayListIcon
            className="i" 
            />
          <div className="player__playlistcontrol__playlist__count">
            <p>{this.props.song.songlist.length}</p>
          </div>
        </div>
      </div>    
    );
  }
}
