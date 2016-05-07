import React, { Component } from 'react';
import SearchContent from './SearchContent.jsx';
import HomeContent from './HomeContent.jsx';
import SideBar from './SideBar.jsx';
import Player from './Player.jsx';

export default class Content extends Component {
  constructor(props: any) {
    super(props);
  }

  renderContent() {
    const { router } = this.props;
    let Component = router.routerStack[router.routerStack.length - 1];
    return <Component {...this.props} />
  }

  render() {
    return (
      <div id="content">
        <SideBar {...this.props} />
        <div className="main-content">
          {this.renderContent()} 
        </div>
        <Player {...this.props} />
      </div>
    );
  }
}
