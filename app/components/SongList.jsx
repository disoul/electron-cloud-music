import React, { Component } from 'react';

export default class SongList extends Component {
  constructor(props: any) {
    super(props);
  }

  secToTime(sec) {
    sec = sec / 1000;
    let min = parseInt(sec / 60);
    if (min < 10) {
      min = '0' + min;
    }
    let second = parseInt(sec % 60);
    if (second < 10) {
      second = '0' + second;
    }

    return min + ':' + second;
  }

  getShortName(name, limit) {
    if (name.length > limit) {
      return name.slice(0, limit) + '...';
    } else {
      return name;
    }
  }

  _playsong(e, song) {
    if (song.hMusic) {
      this.props.changeSong(song.id, song.hMusic.bitrate);
      return;
    }
    if (song.mMusic) {
      this.props.changeSong(song.id, song.mMusic.bitrate);
      return;
    }
    if (song.lMusic) {
      this.props.changeSong(song.id, song.lMusic.bitrate);
      return;
    }
  }

  render() {
    return (
      <div className="songlist">
        <table className="songlist-table">
          <thead>
            <tr>
              <th></th>
              <th>操作</th>
              <th>音乐标题</th>
              <th>歌手</th>
              <th>专辑</th>
              <th>时长</th>
              <th>热度</th>
            </tr>
          </thead>
          <tbody>
          {this.props.data.map( (song, index) => {
            return (
              <tr>
                <td className="songlist-table__index">{index + 1}</td>
                <td></td>
                <td 
                  className="songlist-table__name"
                  onClick={e => this._playsong(e, song)}
                  >
                  {this.getShortName(song.name, 30)}
                </td>
                <td className="songlist-table__artists">
                  {this.getShortName(song.artists[0].name, 15)}
                </td>
                <td className="songlist-table__album">
                  {this.getShortName(song.album.name, 18)}
                </td>
                <td className="songlist-table__duration">
                  {this.secToTime(song.duration)}
                </td>
                <td className="songlist-table__hot">
                  <div className="songlist-table__hotbar-wrapper">
                    <div
                      className="songlist-table__hotbar"
                      style={{ width: song.score + '%' }}
                      ></div>
                  </div>
                </td>
              </tr>
            );
          })}
          </tbody>
        </table>
      </div>
    );
  }
}
