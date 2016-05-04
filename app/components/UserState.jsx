import React, { Component } from 'react';
import { search } from '../server';
import Spinner from './Spinner.jsx';

export default class UserState extends Component {
  constructor(props: any) {
    super(props);
    this.state = {
      showMenu: false,
    }
  }

  _login(e) {
    this.props.loginform(true);
  }

  _showMenu(e) {
    this.setState({
      showMenu: !this.state.showMenu,
    });
  }

  _logout(e) {
    this.props.toguest();
  }

  componentDidMount() {
    let self = this;
    // 根据cookie判断是否自动登陆
    Electron.ipcRenderer.on('cookie', (e, cookies) => {
      console.log(cookies);
      let flag = 0;
      cookies.map(cookie => {
        if (cookie.name === 'MUSIC_U') {
          flag++;
        }
        if ((cookie.name === '__remember_me') && (cookie.value === 'true')) {
          flag++;
        }
      });
      if (flag > 1) {
        if (localStorage.user) {
          self.props.logged_in(JSON.parse(localStorage.getItem('user')));
          self.props.fetchusersong(self.props.user.profile.userId);
        } 
      }
    });
  }

  render() {
    if (this.props.user.loginState == 'logged_in') {
      return this.renderUser();
    } else if (this.props.user.loginState == 'logging_in') {
      return this.renderLogging();
    } else {
      return this.renderGuest();
    }
  }

  renderGuest() {
    if (this.props.user.loginState == 'logged_failed') {
      alert(this.props.user.loginError, "登录失败");
      this.props.toguest();
    }
    return (
      <div
        style={{
          WebkitAppRegion: 'no-drag',
        }}
        className="header__user"
        >
        <div className="header__user__avatar">
        </div>
        <div className="header__user__login" onClick={e => this._login(e) }>
          登录
        </div>
      </div>
    );
  }

  renderLogging() {
    return (
      <div 
        style={{
          WebkitAppRegion: 'no-drag',
        }}
        className="header__user"
        >
        <div className="header__user__avatar">
          <Spinner />
        </div>
        <div className="header__user__login" onClick={e => this._login(e) }>
          登录中..
        </div>
      </div>
    );
  }

  renderUser() {
    return (
      <div 
        style={{
          WebkitAppRegion: 'no-drag',
        }}
        className="header__user"
        >
        <div 
          className="header__user__avatar"
          onClick={e => this._showMenu(e)}
          >
          <img src={this.props.user.profile.avatarUrl} />
          { this.state.showMenu ? (<div className="header__user__menu">
            <ul className="header__user__menu__list">
              <li
                onClick={e => this._logout(e) }
                >退出登录</li>
            </ul>
          </div>) : ''}
        </div>
        <div className="header__user__name">
          {this.props.user.profile.nickname}
        </div>
      </div>
    );
  }
}
