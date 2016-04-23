import React, { Component } from 'react';

export default class PlayListControl extends Component {
  constructor(props: any) {
    super(props);
  }

  _changeRule(e) {
    this.props.changeRule();
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
      </div>    
    );
  }
}
