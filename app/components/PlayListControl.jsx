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

  render() {
    return (
      <div className="player__playlistcontrol">
        <div className="player__playlistcontrol__playlistrule">
          <img 
            className="i" 
            src={require('../assets/icon/' + this.props.song.rules[this.props.song.playRule] + '.svg')}
            onClick={e => this._changeRule(e)}
            />
        </div>
        <div className={this.getClassName()}>
          <img 
            className="i" 
            src={require('../assets/icon/playlist.svg')}
            onClick={e => this._showorhidePlaylist(e)}
            />
          <div className="player__playlistcontrol__playlist__count">
            <p>{this.props.song.songlist.length + 1}</p>
          </div>
        </div>
      </div>    
    );
  }
}
