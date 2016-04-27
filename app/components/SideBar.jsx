import React, { Component } from 'react';

export default class SideBar extends Component {
  constructor(props: any) {
    super(props);
  }

  render() {
    return (
      <div className="sidebar">
        <div class="sidebar__mycreate">
          <h3>我创建的歌单</h3>
        </div>
      </div>
    );
  }
}
