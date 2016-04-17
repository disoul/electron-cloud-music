import React, { Component } from 'react';
import Volume from './Volume.jsx';
import { getSongUrl } from '../server';

export default class Player extends Component {
  constructor(props: any) {
    super(props);
    this.mouseState = {
      press: false,
    };

    this.state = {
      playbuttonIcon: 'play',
      currentTime: 0,
      duration: 1,
      buffered: 0,
      source: '',
    }
  }

  componentDidMount() {
    let self = this;
    /*
    getSongUrl(31587886, url => {
      self.setState({
        source: url,
      });
    });
    */
    this.refs.audio.addEventListener("progress", (e) => {
      this.setState({
        buffered: e.target.buffered.end(e.target.buffered.length - 1)
      });
    }, true);

    this.refs.audio.addEventListener("durationchange", e => {
      this.setState({
        duration: e.target.duration
      });
    }, true)

    this.refs.audio.addEventListener("timeupdate", e => {
      if (self.mouseState.press) {
        return;
      }
      console.log("update");
      this.setState({
        currentTime: e.target.currentTime
      });
    }, true)
  }

  componentWillReceiveProps(props) {
    if (props.player.isplay) {
      this.refs.audio.play();
      this.setState({
          playbuttonIcon: 'pause',
      });
    } else {
      this.refs.audio.pause();
      this.setState({
          playbuttonIcon: 'play',
      });
    }
  }

  secToTime(sec) {
    let min = parseInt(sec / 60);
    if (min < 10) {
      min = '0' + min;
    }
    let second = parseInt(sec % 60);
    if (second < 10) {
      second = '0' + second;
    }

    return min + ':' + second;
  }

  updateVolume(volume, ismute) {
    console.log('mute', ismute);
    if (ismute) {
      this.refs.audio.volume = 0;
    } else {
      this.refs.audio.volume = volume;
    }
  }

  _playorpause() {
    if (this.props.player.isplay) {
      this.props.actions.pause();
    } else {
      this.props.actions.play();
    }
  }

  _handleMouseUp(e) {
    if (!this.mouseState.press) {
      return;
    }
    this.mouseState.press = false;
    let pgbarWidth = this.refs.pgbar.clientWidth;
    this.setState({
      currentTime: this.refs.audio.duration * (e.pageX - this.refs.pgbar.getBoundingClientRect().left) / pgbarWidth
    });
    this.refs.audio.currentTime = this.state.currentTime;
  }

  _handleMouseMove(e) {
    if (!this.mouseState.press) {
      return;
    }
    let pgbarWidth = this.refs.pgbar.clientWidth;
    this.setState({
      currentTime: this.refs.audio.duration * (e.pageX - this.refs.pgbar.getBoundingClientRect().left) / pgbarWidth
    });
  }

  _seek(e) {
    this.mouseState.press = true;
    window.addEventListener("mouseup", this._handleMouseUp.bind(this));
    window.addEventListener("mousemove", this._handleMouseMove.bind(this));
  }

  render() {
    return (
      <div className="player">
        <audio ref="audio" src={this.state.source}></audio>
        <div className="player__btns">
          <button className="player__btns__backward player__btns-btn">
            <img className="i" src={require('../assets/icon/previous.svg')}/>
          </button>
          <button onClick={ e => this._playorpause(e) }className="player__btns__play player__btns-btn">
            <img 
              src={require(
                    '../assets/icon/' + this.state.playbuttonIcon + '.svg'
                  )} 
              className="i"
            />
          </button>
          <button className="player__btns__forward player__btns-btn">
            <img className="i" src={require('../assets/icon/next.svg')} />
          </button>
        </div>
        <div className="player__pg">
          <p className="player__pg__cur-time">
            {this.secToTime(this.state.currentTime)}
          </p>
          <div className="player__pg__bar" ref="pgbar"
            onMouseDown = { e => { this._seek(e) }}
            >
            <div className="player__pg__bar-cur-wrapper">
              <div
                className="player__pg__bar-cur"
                onMouseDown = { e => { this._seek(e) }}
                style={{
                  width: String(this.state.currentTime / this.state.duration * 100) + '%'
                }}
                >
              </div>
            </div>
            <div
              className="player__pg__bar-ready"
              style={{
                width: String(this.state.buffered / this.state.duration * 100) + '%'
              }}
              ></div>
          </div>
          <p className="player__pg__all-time">
            {this.secToTime(this.state.duration)}
          </p>
        </div>
        <Volume updateVolume={this.updateVolume.bind(this)} />
        <div className="player__audio-control"></div>
      </div>
    );
  }
}
