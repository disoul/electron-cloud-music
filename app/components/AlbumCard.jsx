import React, { Component } from 'react';

export default class AlbumCard extends Component {
  constructor(props: any) {
    super(props);
  }

  _addsonglist(e, isplay) {
    this.props.addSongList(this.props.songs, isplay);
  }

  render() {
    return (
      <div
        className="albumcard card"
        >
        <div className="albumcard__cover">
          <img src={this.props.data.picUrl} />
          <div className="albumcard__cover__playcount">
            <p>{this.props.data.playCount}</p>
          </div>
        </div>
        <div className="albumcard-left">
        <div className="albumcard__info">
          <p className="albumcard__info__name">
            {this.props.data.name}
          </p>
          <p className="albumcard__info__creator">
            来自:{this.props.data.creator.nickname}
          </p>
        </div>
        <div className="albumcard__tags">
          {this.props.data.tags.length > 0 ? <p>TAGS:</p> : ''}
          {this.props.data.tags.map(tag => {
            return (
              <div className="albumcard__tags__tag">
                {tag}
              </div>
            );
          })}
        </div>
        <div className="albumcard__buttons">
          <button
            onClick={e => this._addsonglist(e, true)}
            className="albumcard__buttons__button btn-normal">PLAY</button>
          <button 
            onClick={e => this._addsonglist(e, false)}
            className="albumcard__buttons__button btn-normal">ADD</button>
        </div>
        </div>
      </div>
    );
  }
}
