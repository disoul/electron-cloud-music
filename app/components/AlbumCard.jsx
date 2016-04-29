import React, { Component } from 'react';

export default class AlbumCard extends Component {
  constructor(props: any) {
    super(props);
  }

  _playsong(e, song) {
    this.props.changeSong(song);
  }

  render() {
    return (
      <div
        className="albumcard"
        >
        <div className="albumcard__cover">
          <img src={this.props.data.imgUrl} />
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
          <button className="albumcard__buttons__button btn-normal">PLAY</button>
          <button className="albumcard__buttons__button btn-normal">ADD</button>
        </div>
        </div>
      </div>
    );
  }
}
