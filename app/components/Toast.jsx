import React, { Component } from 'react';

export default class Toast extends Component {
  constructor(props: any) {
    super(props);
  }

  render() {
    return (
      <div className="toast">
        <p>{this.props.content}</p>
      </div>    
    );
  }
}
