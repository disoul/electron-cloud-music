import React, { Component } from 'react';

export default class Player extends Component {
  constructor(props: any) {
    super(props);
    this.state = {
      playbuttonIcon: 'fa fa-play',
      currentTime: 0,
      duration: 1,
      buffered: 0,
    }
  }

  componentDidMount() {
    this.refs.audio.addEventListener("progress", (e) => {
      this.setState({
        buffered: e.target.buffered.end(e.target.buffered.length-1)
      }); 
    }, true);

    this.refs.audio.addEventListener("durationchange", e => {
      this.setState({
        duration: e.target.duration
      });
    }, true)
  }

  componentWillReceiveProps(props) {
    if (props.player.isplay) {
      this.refs.audio.play();
      this.setState({
          playbuttonIcon: 'fa fa-pause',
      });
    } else {
      this.refs.audio.pause();
      this.setState({
          playbuttonIcon: 'fa fa-play',
      });
    }
  }

  _playorpause() {
    if (this.props.player.isplay) {
      this.props.actions.pause();
    } else {
      this.props.actions.play();
    }
  }

  render() {
    console.log(this.state);
    return (
      <div className="player">
        <audio ref="audio" src="http://m10.music.126.net/20160408131551/0caad8e5f7e7288dcf0e9356c26a23b2/ymusic/5a57/c4be/efb8/9e11fb9872a0360f905bded6f8c3bab0.mp3"></audio>
        <div className="player__btns">
          <button className="player__btns__backward player__btns-btn">
            <i className="fa fa-step-backward"></i>
          </button>  
          <button onClick={ e => this._playorpause(e) }className="player__btns__play player__btns-btn">
            <i className={this.state.playbuttonIcon}></i>
          </button>  
          <button className="player__btns__forward player__btns-btn">
            <i className="fa fa-step-forward"></i>
          </button>  
        </div>
        <div className="player__pg">
          <p className="player__pg__cur-time">1:30</p>
          <div className="player__pg__bar">
            <div className="player__pg__bar-cur">
              <span className="player__pg__bar__btn"></span>
            </div>
            <div className="player__pg__bar-ready" style={{ width: String(this.state.buffered / this.state.duration * 100) + '%' }}></div>
          </div>
          <p className="player__pg__all-time">2:30</p>
        </div>
        <div className="player__audio-control"></div>
      </div>
    );
  }
}
