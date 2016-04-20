import React, { Component } from 'react';

export default class LoginForm extends Component {
  constructor(props: any) {
    super(props);
    this.state = {
      phoneValid: true,
      passwordValid: true,
    }
  }

  _onSubmit(e) {
    e.preventDefault();
    if (this.refs.phone.value === '') {
      this.setState({
        phoneValid: false
      });
      return;
    };
    if (this.refs.password.value === '') {
      this.setState({
        passwordValid: false
      });
      return;
    };
    this.props.login({
      phone: this.refs.phone.value,
      password: this.refs.password.value,
    });
    this.props.loginform(false);
  }

  _closeForm(e) {
    this.props.loginform(false);
  }

  _onChange(e, target) {
    if (target === 'phone') {
      if (!this.state.phoneValid) {
        this.setState({
          phoneValid: true,
        });
      }
    } else {
      if (!this.state.passwordValid) {
        this.setState({
          passwordValid: true,
        });
      }
    }
  }

  render() {
    return (
      <div className="loginform">
        <div className="loginform__header">
          <h2>手机登陆</h2>
          <img 
            className="loginform__header__close" src={require('../assets/icon/close.svg')} 
            onClick={e => this._closeForm(e) } 
            />
        </div>
        <form 
          className="loginform__form" 
          id="loginform"
          onSubmit={e => this._onSubmit(e)}
          >
          <input 
            type="text" ref="phone" placeholder="输入手机号"
            style={!this.state.phoneValid ? {backgroundColor: '#b70808'} : {}}
            onChange={e => this._onChange(e, 'phone')}
            />
          <input
            style={!this.state.passwordValid ? {backgroundColor: '#b70808'} : {}}
            onChange={e => this._onChange(e, 'pw')}
            type="password" ref="password" placeholder="输入密码" />
          <input type="submit" hidden />
        </form>
        <button 
          className="loginform__submit"
          onClick = {e => this._onSubmit(e)}
          >登录</button>
      </div>
    );
  }
}
