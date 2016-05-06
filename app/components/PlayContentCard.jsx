import React, { Component } from 'react';

export default class PlayContentCard extends Component {
  constructor(props: any) {
    super(props);
    this.state = {
      cardMode: 'mini',
      height: '0px',
      width: '0px',
      left: '10px',
    };
  }

  componentWillReceiveProps(props) {
    if (props.data && this.props.data == undefined) {
      this.setState({
        height: '100px',
        width: '300px',
      });
    }
    if (this.props.playcontent.mode && props.playcontent.mode == 'max') {
      this.setState({
        height: '100%',
        width: '100%',
        left: '0',
      });
    }
    if (this.props.playcontent.mode && props.playcontent.mode == 'mini' && this.props.data != undefined) {
      this.setState({
        height: '100px',
        width: '300px',
        left: '10px',
      });
    }
    if (props.data != this.props.data) {
      if (this.props.playcontent.state == 'hidden') {
        this.props.actions.showplaycontentmini();
      }
    }
  }

  _showmaxormini(e) {
    if (this.props.playcontent.mode == 'mini') {
      this.props.actions.showplaycontentmax();
    } else {
      this.props.actions.hiddenplaycontentmax();
    }
  }

  renderMain() {
    return (
      <div 
        className={ 
          this.props.playcontent.mode == 'mini' ? 
          "playcontent card mini" : "playcontent max" }
        style={{ 
            height: this.state.height,
            width: this.state.width,
            top: this.state.top,
            bottom: this.props.playcontent.mode=='mini' ? this.props.playcontent.state=='show' ? '70px' : '-100px' : 0,
            left: this.state.left,
        }}
        onClick={e => this._showmaxormini(e)}
        >
          <div
            style={{
              opacity: this.props.playcontent.mode=='mini' ? '1' : '0',
            }}
            className="miniplaycontent-wrapper">
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
          <div 
            style={{
              opacity: this.props.playcontent.mode=='max' ? '1' : '0',
            }}
            className="maxplaycontent-wrapper">
            <div
              style={{
                backgroundImage: 'url("' + this.props.data.album.picUrl + '")',
              }}
              className="maxplaycontent-bg">
            </div>
            <div className="maxplaycontent-main">
            </div>
          </div>
      </div>
    );
  }

  renderDefault() {
    return (
      <div
        className="playcontent card" 
        style={{ 
            height: this.state.height,
            width: this.state.width,
        }}
        >
      </div>
    );
  }

  render() {
    if (this.props.data == undefined) {
      return this.renderDefault();
    } else {
      return this.renderMain();
    }
  }
}
