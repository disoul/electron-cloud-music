'use strict'
import React, { Component } from 'react';
import Header from './Header.jsx';
import MusicContent from './MusicContent.jsx';
import Player from './Player.jsx';

import { connect } from 'react-redux';
import { bindActionCreators } from  'redux';
import * as Actions from '../actions/actions';

const mapStateToProps = state => ({
  player: state.player,
});

const mapDispatchToProps = (dispatch) => ({
  actions: {
    play: bindActionCreators(Actions.play, dispatch),
    pause: bindActionCreators(Actions.pause, dispatch),
  }
});


class App extends Component {
  render() {
    return (
      <div className="app">
        <Header />
        <MusicContent />
        <Player {...this.props} />
      </div>
    );
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(App);
