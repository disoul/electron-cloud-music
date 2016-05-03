import React, { Component } from 'react';
import SearchBar from './SearchBar.jsx';
import UserState from './UserState.jsx';

export default class Header extends Component {
  _closeApp(e) {
    Electron.ipcRenderer.send('closeapp');
  }

  _max(e) {
    Electron.ipcRenderer.send('maximize');
  }

  _min(e) {
    Electron.ipcRenderer.send('minimize');
  }

  render() {
    let Logo=require('../assets/logo.svg?name=Logo');
    let CloseIcon = require('../assets/icon/close.svg?name=CloseIcon');
    let MaxIcon = require('../assets/icon/max.svg?name=MaxIcon');
    let MinIcon = require('../assets/icon/min.svg?name=MinIcon');
    return (
      <div 
        className="header"
        style={{
          WebkitAppRegion: 'drag',
        }}
        >
        <div className="header__logo">
          <Logo />
        </div>
        <div className="header__space">
        </div>
        <SearchBar
          push={this.props.actions.push}
          pop={this.props.actions.pop}
          search={this.props.actions.search}
          />
        <UserState
          user={this.props.user}
          loginform={this.props.actions.loginform}
          toguest={this.props.actions.toguest}
          login={this.props.actions.login}
          logged_in={this.props.actions.logged_in}
          fetchusersong={this.props.actions.fetchusersong}
        />
        <div
          className="header__windowcontrol"
          style={{
            WebkitAppRegion: 'no-drag',
          }}
          >
          <MinIcon
            onClick={ e => this._min(e) }
            />
          <MaxIcon
            onClick={ e => this._max(e) }
            />
          <CloseIcon 
            onClick={ e => this._closeApp(e) }
            />
        </div>
      </div>
    );
  }
}
