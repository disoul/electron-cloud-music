import React, { Component } from 'react';
import SearchContent from './SearchContent.jsx';
import HomeContent from './HomeContent.jsx';
import SideBar from './SideBar.jsx';

export default class Content extends Component {
  constructor(props: any) {
    super(props);
  }

  renderSearchContent() {
    console.log(this);
    if (this.props.search.hidden) {
      return;
    } else {
      return <SearchContent
                search={this.props.search} 
                changeSong={this.props.actions.changeSong}
                addSong={this.props.actions.addSong}
                />
    }
  }

  render() {
    return (
      <div className="content">
        <SideBar />
        <div className="main-content">
          {this.renderSearchContent()} 
          <HomeContent />
        </div>
      </div>
    );
  }
}
