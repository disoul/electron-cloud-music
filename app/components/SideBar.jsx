import React, { Component } from 'react';

export default class SideBar extends Component {
  constructor(props: any) {
    super(props);
  }

  render() {
    return (
      <div className="sidebar">
        <div className="sidebar__name">
          <p>Side</p>
        </div>
      </div>
    );
  }
}
