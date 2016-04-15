import React, { Component } from 'react';
import SearchContent from './SearchContent.jsx'

export default class Content extends Component {
  constructor(props: any) {
    super(props);
  }

  renderSearchContent() {
    console.log(this);
    if (this.props.search.hidden) {
      return;
    } else {
      return <SearchContent search={this.props.search} />
    }
  }

  render() {
    return (
      <div className="content">
        {this.renderSearchContent()} 
      </div>
    );
  }
}
