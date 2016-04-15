import React, { Component } from 'react';

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
      <div className="search-content">Searching...</div>
    ); 
  }

  renderFinish() {
    return (
      <div className="search-content">Finish</div>
    ); 
  }

  renderError() {
    return (
      <div className="search-content">Error</div>
    ); 
  }
}
