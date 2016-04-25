import React, { Component } from 'react';

export default class Volume extends Component {
  constructor(props: any) {
    super(props);
    this.mouseState = {
      press: false,
    };
    this.state = {
      volume: 1,
      mute: false,
    }
  }

  _handleMouseUp(e) {
    if (!this.mouseState.press) {
      return;
    }
    this.mouseState.press = false;
    let volumeWidth = this.refs.volume.clientWidth;
    let volume = (e.pageX - this.refs.volume.getBoundingClientRect().left) / volumeWidth;
    volume = volume > 1 ? 1 : volume;
    volume = volume < 0 ? 0 : volume;

    this.setState({
      "volume": volume 
    });
    this.props.updateVolume(this.state.volume, this.state.mute);
  }

  _handleMouseMove(e) {
    if (!this.mouseState.press) {
      return;
    }
    let volumeWidth = this.refs.volume.clientWidth;
    let volume = (e.pageX - this.refs.volume.getBoundingClientRect().left) / volumeWidth;
    volume = volume > 1 ? 1 : volume;
    volume = volume < 0 ? 0 : volume;

    this.setState({
      "volume": volume 
    });
    this.props.updateVolume(this.state.volume, this.state.mute);
  }

  _mouseDown(e) {
    this.mouseState.press = true;
    window.addEventListener("mouseup", this._handleMouseUp.bind(this));
    window.addEventListener("mousemove", this._handleMouseMove.bind(this));
  }

  _mute(e) {
    this.setState({
      mute: !this.state.mute
    }, () => {
      this.props.updateVolume(this.state.volume, this.state.mute);
    });
  }

  getVolumeIcon() {
    if (this.state.mute) {
      return require('../assets/icon/volume_mute.svg');
    }

    if (this.state.volume > 0.7 ) {
      return require('../assets/icon/volume_max.svg');
    } else if (this.state.volume > 0.3) {
      return require('../assets/icon/volume_min.svg');
    } else {
      return require('../assets/icon/volume.svg');
    }
  }

  render() {
    var VolumeIcon = this.getVolumeIcon();
    return (
      <div className="player__volume">
        <VolumeIcon 
          onClick={ e => this._mute(e) }
          className="i" />
          <div 
            ref="volume"
            className="player__volume__bar-wrapper"
            onMouseDown = { e => this._mouseDown(e) }
            >
            <div 
              className="player__volume__bar"
              style={{ width: this.state.volume * 100 + '%' }}
              ></div>
          </div>
      </div>
    );
  }
}
