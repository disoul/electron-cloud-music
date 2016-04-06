import React, { Component } from 'react';
import SearchBar from './SearchBar.jsx';

export default class Header extends Component {
  render() {
    return (
      <div className="header">
        <div className="header__logo">
        </div>
        <SearchBar />
      </div>
    );
  }
}
