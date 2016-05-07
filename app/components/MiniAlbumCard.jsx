import React, { Component } from 'react';
import SongListContent from './SongListContent.jsx';

export default class MiniAlbumCard extends Component {
  constructor(props: any) {
    super(props);
  }

  _songlistdetail(e) {
    this.props.push(SongListContent);
    this.props.fetchsonglistdetail(this.props.data.id);
  }

  render() {
    return (
      <div
        className="minialbumcard card"
        onClick={ e => this._songlistdetail(e) }
        >
        <div className="minialbumcard__cover">
          <img src={this.props.data.picUrl} />
          <div className="minialbumcard__cover__playcount">
            <p>{this.props.data.playcount}</p>
          </div>
          <div className="minialbumcard__cover__name">
            <p>{this.props.data.name}</p>
          </div>
        </div>
      </div>
    );
  }
}
