'use strict'
import React, { Component } from 'react';
import Header from './Header.jsx';
import Content from './Content.jsx';
import Player from './Player.jsx';

import { connect } from 'react-redux';
import { bindActionCreators } from  'redux';
import * as Actions from '../actions/actions';

const mapStateToProps = state => ({
  player: state.player,
  search: state.search,
});

const mapDispatchToProps = (dispatch) => ({
  actions: {
    play: bindActionCreators(Actions.play, dispatch),
    pause: bindActionCreators(Actions.pause, dispatch),
    search: bindActionCreators(Actions.search, dispatch),
    closeSearch: bindActionCreators(Actions.closeSearch, dispatch),
  }
});

class App extends Component {
  render() {
    return (
      <div className="app">
        <Header {...this.props} />
        <Content {...this.props} />
        <Player {...this.props} />
      </div>
    );
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(App);
