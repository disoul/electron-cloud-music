import React, { Component } from 'react';
import Spinner from './Spinner.jsx';
import SongCard from './SongCard.jsx';

export default class SearchContent extends Component {
  constructor(props: any) {
    super(props);
  }

  renderResult() {
    if (this.props.search.searchResponse.songCount === 0) {
      return ( <p>无结果</p> );
    } else {
      return (
        <section className="search-content__main__bestmarch">
          <h2>最佳匹配</h2>
          <SongCard data={this.props.search.searchResponse.songs[0]} />
        </section>
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
        <div className="search-content__main">
        { this.renderResult() }
        </div>
      </div>
    ); 
  }

  renderError() {
    return (
      <div className="search-content">Error</div>
    ); 
  }
}
