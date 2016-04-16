import React, { Component } from 'react';
import Spinner from './Spinner.jsx';

export default class SearchContent extends Component {
  constructor(props: any) {
    super(props);
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
      </div>
    ); 
  }

  renderError() {
    return (
      <div className="search-content">Error</div>
    ); 
  }
}
