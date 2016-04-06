import React, { Component } from 'react';
import { render } from 'react-dom';
import Header from './Header.jsx';

export default class App extends Component {
  render() {
    return (
      <Header />
    );
  }
}
React.render(
  <App />,
  document.body
);
