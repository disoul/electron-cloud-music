import React, { Component } from 'react';

export default class SearchBar extends Component {
  render() {
    return (
      <div className="header__searchbar">
        <input type="text" placeholder="搜索音乐2333333" />
        <i className="fa fa-search"></i>
      </div>
    );
  }
}
