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
        <audio ref="audio" src="http://112.84.104.35/m10.music.126.net/20160408114421/4cc5d057b86bcb9c152c336a7221f733/ymusic/1a74/5038/f2ab/a58113daef7d03ddfd3ccfabed653d26.mp3?wshc_tag=0&wsts_tag=5707233f&wsid_tag=7ac18f2a&wsiphost=ipdbm"></audio>
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
