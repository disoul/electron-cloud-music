import React, { Component } from 'react';
import { recommendResource } from '../server';

export default class HomeContent extends Component {
  constructor(props: any) {
    super(props);
  }

  componentDidMount() {
    recommendResource().then(res => {
      console.log('REEE', res);
    })    
  }

  render() {
    return (
      <div className="home-content">
        <div className="home-content__main">
          <p>开发中</p>
        </div>
      </div>
    );
  }
}
