import React, { Component } from 'react';

export default class SongCard extends Component {
  constructor(props: any) {
    super(props);
  }

  _playsong(e, song) {
    this.props.changeSong(song);
  }

  render() {
    return (
      <div
        className="songcard"
        onClick={e => this._playsong(e, this.props.data)}
        >
        <img src={this.props.data.album.picUrl} />
        <div className="songcard__info">
          <p className="songcard__name">
            {this.props.data.name}
          </p>
          <p className="songcard__album">
          专辑:<span className="songcard__album__name">{this.props.data.album.name}</span>
          歌手:<span className="songcard__album__artist">{this.props.data.artists[0].name}</span>
          </p>
        </div>
      </div>
    );
  }
}
