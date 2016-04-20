import React, { Component } from 'react';

export default class Alert extends Component {
  constructor(props: any) {
    super(props);
  }

  render() {
    return (
      <div className="alert-wrapper">
        <div className="alert">
          <div className="alert__header">
            <h2>{this.props.title}</h2>
            <img 
              className="alert__header__close" src={require('../assets/icon/close.svg')} 
              onClick={e => this._close(e) } 
              />
          </div>
          <div className="alert__content">
            <p>{this.props.content}</p>
          </div>
        </div>
      </div>
    );
  }
}
