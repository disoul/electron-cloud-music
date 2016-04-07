import React, { Component } from 'react';

export default class Player extends Component {
  constructor(props: any) {
    super(props);
    this.state = {
      playbuttonIcon: 'fa fa-play',
    }
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
    console.log(this.props);
    return (
      <div className="player">
        <audio ref="audio" src="http://m10.music.126.net/20160407192413/02819b5151e80fd001dd932c43d9c34f/ymusic/d493/595f/ab40/b9656ca7bd70ba6eb4ff1fcb4f755f6d.mp3"></audio>
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
            <div className="player__pg__bar-ready"></div>
          </div>
          <p className="player__pg__all-time">2:30</p>
        </div>
        <div className="player__audio-control"></div>
      </div>
    );
  }
}
