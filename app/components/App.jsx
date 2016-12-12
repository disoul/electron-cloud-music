'use strict'
import React, { Component } from 'react';
import Header from './Header.jsx';
import Content from './Content.jsx';
import Player from './Player.jsx';
import LoginForm from './LoginForm.jsx';
import PlayContentCard from './PlayContentCard.jsx';
import Toast from './Toast.jsx';

import { connect } from 'react-redux';
import { bindActionCreators } from  'redux';
import * as Actions from '../actions/actions';

const mapStateToProps = state => ({
  player: state.player,
  search: state.search,
  song: state.song,
  user: state.user,
  usersong: state.usersong,
  router: state.router,
  songlist: state.songlist,
  playcontent: state.playcontent,
  toast: state.toast
});

const mapDispatchToProps = (dispatch) => {
  let actions = {};
  for (let key in Actions) {
    actions[key] = bindActionCreators(Actions[key], dispatch);
  }
  return {
    actions: actions,
  };
};

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

  toast() {
    if (this.props.toast.toastQuery[0]) {
      return <Toast content={this.props.toast.toastQuery[0]} />
    }
  }

  render() {
    const { song } = this.props;
    return (
      <div className="app">
        <Header {...this.props} />
        {this.loginForm()}
        {this.toast()}
        <Content {...this.props} />
        <PlayContentCard 
          {...this.props}
          data={song.songlist[song.currentSongIndex]}
          />
      </div>
    );
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(App);
