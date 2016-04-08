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
        buffered: e.target.buffered.end(e.target.buffered.length - 1)
      }); 
    }, true);
    
    this.refs.audio.addEventListener("durationchange", e => {
      this.setState({
        duration: e.target.duration
      });
    }, true)

    this.refs.audio.addEventListener("timeupdate", e => {
      this.setState({
        currentTime: e.target.played.end(e.target.played.length - 1)
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
        <audio ref="audio" src="http://112.25.35.187/m10.music.126.net/20160408152717/e4b25dcb5c281f2f15f054262e7c45dc/ymusic/5859/b343/c688/c4e9fc88976d79a9b3a24e7cc1d23f73.mp3?wshc_tag=0&wsts_tag=5707577c&wsid_tag=75882e4e&wsiphost=ipdbm"></audio>
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
            <div className="player__pg__bar-cur-wrapper">
              <div 
                className="player__pg__bar-cur"
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
          <p className="player__pg__all-time">2:30</p>
        </div>
        <div className="player__audio-control"></div>
      </div>
    );
  }
}
