import React, { Component } from 'react';

export default class PlayContentCard extends Component {
  constructor(props: any) {
    super(props);
    this.state = {
      cardMode: 'mini',
      height: '0px',
      width: '0px',
    };
  }

  componentWillReceiveProps(props) {
    if (props.data && this.props.data == undefined) {
      this.setState({
        height: '100px',
        width: '300px',
      });
    }
  }

  renderMini() {
    return (
      <div 
        className="miniplaycontent card"
        style={{ 
            height: this.state.height,
            width: this.state.width,
        }}
        >
        <div className="miniplaycontent-wrapper">
        <div className="miniplaycontent__cover">
          <img src={this.props.data.album.picUrl} />
        </div>
        <div className="miniplaycontent__info">
          <p className="miniplaycontent__info__name">
            {this.props.data.name}
          </p>
          <p className="miniplaycontent__info__artist">
            {this.props.data.artists[0].name}
          </p>
        </div>
        </div>
      </div>
    );
  }

  renderDefault() {
    return (
      <div
        className="miniplaycontent card" 
        style={{ 
            height: this.state.height,
            width: this.state.width,
        }}
        >
      </div>
    );
  }

  render() {
    if (this.props.data == undefined)
      return this.renderDefault();
    if (this.state.cardMode === 'mini')
      return this.renderMini();
  }
}
