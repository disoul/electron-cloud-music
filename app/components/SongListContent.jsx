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
      <div className="content">
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
    return (
      <div id="songlist-content" className="content">
        <div className="content__headinfo">
          <p>歌单详情</p>
        </div>
        <div className="content__card">
          <AlbumCard data={this.props.songlist.content} />
        </div>
      </div>
    ); 
  }

  renderError() {
    return (
      <div className="songlist-content">Error</div>
    ); 
  }
}
