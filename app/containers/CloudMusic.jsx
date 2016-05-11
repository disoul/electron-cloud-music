import React, { Component } from 'react';
import { render } from 'react-dom';
import App from '../components/App.jsx';

import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import cloudMusic from '../reducers';

const loggerMiddleware = createLogger();
const createStoreWithMiddleware = applyMiddleware(
    thunkMiddleware,
    loggerMiddleware
)(createStore);

var store = createStoreWithMiddleware(cloudMusic);
class CloudMusic extends Component {
  render() {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    );
  }
}

render(
  <CloudMusic />,
  document.body
);
