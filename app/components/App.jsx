import React, { Component } from 'react';
import { render } from 'react-dom';
import Header from './Header.jsx';
import MusicContent from './MusicContent.jsx';
import Player from './Player.jsx';

export default class App extends Component {
  render() {
    return (
      <div className="app">
        <Header />
        <MusicContent />
        <Player />
      </div>
    );
  }
}
React.render(
  <App />,
  document.body
);
