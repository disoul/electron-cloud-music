'use strict'
import React, { Component } from 'react';
import Header from './Header.jsx';
import Content from './Content.jsx';
import Player from './Player.jsx';
import LoginForm from './LoginForm.jsx';

import { connect } from 'react-redux';
import { bindActionCreators } from  'redux';
import * as Actions from '../actions/actions';

const mapStateToProps = state => ({
  player: state.player,
  search: state.search,
  song: state.song,
  user: state.user,
});

const mapDispatchToProps = (dispatch) => ({
  actions: {
    play: bindActionCreators(Actions.play, dispatch),
    pause: bindActionCreators(Actions.pause, dispatch),
    search: bindActionCreators(Actions.search, dispatch),
    closeSearch: bindActionCreators(Actions.closeSearch, dispatch),
    changeSong: bindActionCreators(Actions.changeSong, dispatch),
    login: bindActionCreators(Actions.login, dispatch),
    toguest: bindActionCreators(Actions.toguest, dispatch),
    loginform: bindActionCreators(Actions.loginform, dispatch),
  }
});

class App extends Component {
  loginForm() {
    if (this.props.user.showForm) {
      return (
        <LoginForm 
          login={this.props.actions.login}
          loginform={this.props.actions.loginform}
          />
      );
    } else {
      return;
    }
  } 
  render() {
    return (
      <div className="app">
        <Header {...this.props} />
        {this.loginForm()}
        <Content {...this.props} />
        <Player {...this.props} />
      </div>
    );
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(App);
