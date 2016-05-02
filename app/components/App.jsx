'use strict'
import React, { Component } from 'react';
import Header from './Header.jsx';
import Content from './Content.jsx';
import Player from './Player.jsx';
import LoginForm from './LoginForm.jsx';
import PlayContentCard from './PlayContentCard.jsx';

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
});

const mapDispatchToProps = (dispatch) => ({
  actions: {
    play: bindActionCreators(Actions.play, dispatch),
    pause: bindActionCreators(Actions.pause, dispatch),
    search: bindActionCreators(Actions.search, dispatch),
    closeSearch: bindActionCreators(Actions.closeSearch, dispatch),
    changeSong: bindActionCreators(Actions.changeSong, dispatch),
    changeRule: bindActionCreators(Actions.changeRule, dispatch),
    addSong: bindActionCreators(Actions.addSong, dispatch),
    addSongList: bindActionCreators(Actions.addSongList, dispatch),
    nextSong: bindActionCreators(Actions.nextSong, dispatch),
    previousSong: bindActionCreators(Actions.previousSong, dispatch),
    showPlayList: bindActionCreators(Actions.showPlayList, dispatch),
    closePlayList: bindActionCreators(Actions.closePlayList, dispatch),
    playFromList: bindActionCreators(Actions.playFromList, dispatch),
    login: bindActionCreators(Actions.login, dispatch),
    logged_in: bindActionCreators(Actions.logged_in, dispatch),
    toguest: bindActionCreators(Actions.toguest, dispatch),
    loginform: bindActionCreators(Actions.loginform, dispatch),
    fetchusersong: bindActionCreators(Actions.fetchusersong, dispatch),
    push: bindActionCreators(Actions.push, dispatch),
    pop: bindActionCreators(Actions.pop, dispatch),
    fetchsonglistdetail: bindActionCreators(Actions.fetchsonglistdetail, dispatch),
    showplaycontentmini: bindActionCreators(Actions.showplaycontentmini, dispatch),
    hiddenplaycontentmini: bindActionCreators(Actions.hiddenplaycontentmini, dispatch),
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
    const { song } = this.props;
    return (
      <div className="app">
        <Header {...this.props} />
        {this.loginForm()}
        <Content {...this.props} />
        <PlayContentCard 
          data={song.songlist[song.currentSongIndex]}
          playcontent={this.props.playcontent}
          showplaycontentmini={this.props.actions.showplaycontentmini}
          />
        <Player {...this.props} />
      </div>
    );
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(App);
