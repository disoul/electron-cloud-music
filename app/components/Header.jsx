import React, { Component } from 'react';
import SearchBar from './SearchBar.jsx';
import UserState from './UserState.jsx';

export default class Header extends Component {
  render() {
    return (
      <div className="header">
        <div className="header__logo">
          <img src={require('../assets/logo.svg')} />
        </div>
        <div className="header__space">
        </div>
        <SearchBar
          search={this.props.actions.search}
          closeSearch={this.props.actions.closeSearch}
          />
        <UserState
          user={this.props.user}
          loginform={this.props.actions.loginform}
          toguest={this.props.actions.toguest}
          login={this.props.actions.login}
          logged_in={this.props.actions.logged_in}
        />
      </div>
    );
  }
}
