import React, { Component } from 'react';
import Spinner from './Spinner.jsx';
import SongCard from './SongCard.jsx';
import SongList from './SongList.jsx';

export default class SearchContent extends Component {
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
    if (this.props.search.searchState == 'START') {
      return this.renderSearching();
    }
    if (this.props.search.searchState == 'FINISH') {
      return this.renderFinish();
    }
    if (this.props.search.searchState == 'ERROR') {
      return this.renderError();
    }
  }

  renderSearching() {
    return (
      <div className="search-content">
        <div className="search-content__headinfo">
          <p>
            <span className="keywords">{this.props.search.searchInfo.keywords}</span>
            搜索中...
          </p>
        </div>
        <div className="search-content__loading">
          <Spinner />
        </div>
      </div>
    ); 
  }

  renderFinish() {
    return (
      <div className="search-content">
        <div className="search-content__headinfo">
          <p>
            <span className="keywords">{this.props.search.searchInfo.keywords}</span>
            <span>搜索到{this.props.search.searchResponse.songCount}首歌曲</span>
          </p>
        </div>
        { this.renderResult() }
      </div>
    ); 
  }

  renderError() {
    return (
      <div className="search-content">Error</div>
    ); 
  }
}
