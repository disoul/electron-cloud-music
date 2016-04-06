import React, { Component } from 'react';
import SearchBar from './SearchBar.jsx';

export default class Header extends Component {
  render() {
    return (
      <div className="header">
        <div className="header__logo">
          <img src={require('../assets/logo.svg')} />
        </div>
        <SearchBar />
      </div>
    );
  }
}
