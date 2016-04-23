import React, { Component } from 'react';
import Volume from './Volume.jsx';
import PlayListControl from './PlayListControl.jsx';
import PlayerList from './PlayList.jsx';
import { getSongUrl } from '../server';

export default class Player extends Component {
  constructor(props: any) {
    super(props);
    this.mouseState = {
      press: false,
    };

    this.autoplay = true;

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
      this.setState({
        currentTime: e.target.currentTime
      });
    }, true)

    this.refs.audio.addEventListener("canplay", e => {
      if (this.autoplay) {
        self.props.actions.play();
        this.autoplay = false;
      }
    }, true)

    this.refs.audio.addEventListener("ended", e => {
      self.props.actions.nextSong();
    }, true)
  }

  componentWillReceiveProps(props) {
    let self = this;
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

    if (
      props.song.songlist[props.song.currentSongIndex] !== 
      this.props.song.songlist[this.props.song.currentSongIndex]
    ) {
      getSongUrl(props.song.songlist[props.song.currentSongIndex], url => {
        self.setState({
          source: url,
          currentTime: 0,
        }, () => {
          self.props.actions.pause();
        });
      });
    }
  }

  componentDidUpdate(props, state) {
    // update audio
    if (state.source !== this.state.source) {
      this.autoplay = true;
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

  renderPlayList() {
    if (this.props.song.showplaylist) {
      return <PlayerList song={this.props.song} />
    }
  }

  _playorpause() {
    if (this.props.player.isplay) {
      this.props.actions.pause();
    } else {
      this.props.actions.play();
    }
  }

  _previous(e) {
    this.props.actions.previousSong();
  }

  _next(e) {
    this.props.actions.nextSong();
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
        <audio 
          ref="audio" 
          src={this.state.source}
          loop={this.props.song.rules[this.props.song.playRule] == 'one' ? true : false}
          ></audio>
        <div className="player__btns">
          <button 
            onClick={ e => this._previous(e) }
            className="player__btns__backward player__btns-btn">
            <img className="i" src={require('../assets/icon/previous.svg')}/>
          </button>
          <button 
            onClick={ e => this._playorpause(e) }
            className="player__btns__play player__btns-btn"
            >
            <img 
              src={require(
                    '../assets/icon/' + this.state.playbuttonIcon + '.svg'
                  )} 
              className="i"
            />
          </button>
          <button 
            onClick={ e => this._next(e) }
            className="player__btns__forward player__btns-btn">
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
        <PlayListControl 
          song={this.props.song} 
          changeRule={this.props.actions.changeRule}
          showPlayList={this.props.actions.showPlayList}
          closePlayList={this.props.actions.closePlayList}
          />
        {this.renderPlayList()}
      </div>
    );
  }
}
