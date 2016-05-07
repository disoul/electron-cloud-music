'use strict';
// 歌单内容

import React, { Component } from 'react';
import Spinner from './Spinner.jsx';
import AlbumCard from './AlbumCard.jsx';
import SongList from './SongList.jsx';

export default class SongListContent extends Component {
  constructor(props: any) {
    super(props);
  }

  renderResult() {
    if (this.props.search.searchResponse.songCount === 0) {
      return ( <p>无结果</p> );
    } else {
      return (
        <div className="search-content__main">
        <section className="search-content__main__bestmarch">
          <h2>最佳匹配</h2>
          <SongCard
            data={this.props.search.searchResponse.songs[0]}
            changeSong={this.props.changeSong}
            />
        </section>
        <div className="search-content__main__result">
          <SongList
            data={this.props.search.searchResponse.songs} 
            changeSong={this.props.changeSong}
            addSong={this.props.addSong}
            />
        </div>
        </div>
      );
    }
  }

  render() {
    if (this.props.songlist.state == 'fetching') {
      return this.renderFetching();
    }
    if (this.props.songlist.state == 'get') {
      return this.renderFinish();
    }
    if (this.props.songlist.state == 'error') {
      return this.renderFetching();
    }
  }

  renderFetching() {
    return (
      <div
        style={{
          display: this.props.display ? this.props.display : null,
        }} 
        className="content">
        <div className="content__headinfo">
          <p>歌单详情</p>
        </div>
        <div className="content__main">
          <Spinner />
        </div>
      </div>
    ); 
  }

  renderFinish() {
    let songs = this.props.songlist.content.tracks;
    songs.map(song => {
      song.artists = song.ar;
      song.album = song.al;
      song.duration = song.dt;
      song.score = song.pop;
      if (song.h) {
        song.hMusic = song.h;
        song.hMusic.bitrate = song.h.br;
      }
      if (song.m) {
        song.mMusic = song.m;
        song.mMusic.bitrate = song.m.br;
      }
      if (song.l) {
        song.lMusic = song.l;
        song.lMusic.bitrate = song.l.br;
      }
    });
    return (
      <div
        style={{
          display: this.props.display ? this.props.display : null,
        }} 
        id="songlist-content" className="content">
        <div className="content__headinfo">
          <p>歌单详情</p>
        </div>
        <div className="content__main">
          <div className="content__main__card">
            <AlbumCard 
              data={this.props.songlist.content}
              songs={songs}
              addSongList={this.props.actions.addSongList}
              />
          </div>
          <div className="content__main__list">
            <SongList
              data={songs} 
              changeSong={this.props.actions.changeSong}
              addSong={this.props.actions.addSong}
              />
          </div>
        </div>
      </div>
    ); 
  }

  renderError() {
    return (
      <div
        style={{
          display: this.props.display ? this.props.display : null,
        }} 
        className="songlist-content">Error</div>
    ); 
  }
}
