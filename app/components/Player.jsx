import React, { Component } from 'react';
import Volume from './Volume.jsx';
import PlayListControl from './PlayListControl.jsx';
import PlayerList from './PlayList.jsx';
import { getSongUrl, logWeb } from '../server';

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
      state: 'get',
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

      const { playcontent } = this.props;
        
      let i = playcontent.currentLyric + 1;
      if (i < playcontent.lyric.lyric.length && playcontent.lyric.lyric[i].time < e.target.currentTime) {
        this.props.actions.setlyric(i);
      }
    }, true)

    this.refs.audio.addEventListener("canplay", e => {
      if (this.autoplay) {
        self.props.actions.play();
        this.autoplay = false;
        this.setState({
          state: 'get',
        });
      }
    }, true)

    this.refs.audio.addEventListener("ended", e => {
      self.props.actions.nextSong();
    }, true)

    this.refs.audio.addEventListener("seeked", e => {
      const { playcontent } = this.props;
      console.log('seekset', e.target.currentTime, this.getCurrentLyric(
            0, 
            playcontent.lyric.lyric.length - 1,
            e.target.currentTime,
            playcontent.lyric.lyric
            ));
      self.props.actions.setlyric(this.getCurrentLyric(
            0, 
            playcontent.lyric.lyric.length - 1,
            e.target.currentTime,
            playcontent.lyric.lyric
            ));
    }, true)
  }

  componentWillReceiveProps(props) {
    let self = this;
    const { song } = this.props;
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

    if ( props.song.songlist.length > 0 &&
      !_.isEqual(props.song.songlist[props.song.currentSongIndex],
      song.songlist[song.currentSongIndex])
    ) {
      self.setState({
        state: 'loading',
      });

      // 向网易发送听歌数据
      if ( song.songlist.length > 0 ) {
        logWeb(
            'play',
            song.songlist[song.currentSongIndex].id,
            Math.floor(self.refs.audio.currentTime),
            'ui'
            ).then(res => {
        });
      }

      getSongUrl(props.song.songlist[props.song.currentSongIndex], data => {
        if (!data.url) {
          self.props.actions.nextSong();
        }
        if (data.id == props.song.songlist[props.song.currentSongIndex].id) {
          self.setState({
            source: data.url,
            currentTime: 0,
          }, () => {
            self.props.actions.pause();
          });
        }
      });
    }
  }

  componentDidUpdate(props, state) {
    // update audio
    if (state.source !== this.state.source) {
      this.autoplay = true;
    }
  }

  getCurrentLyric(start, end, currentTime, lyric) {
    if (lyric[start].time >= currentTime) {
      return start;
    }
    if (lyric[end].time <= currentTime) {
      return end;
    }
    let mid = Math.floor((end + start)/2);
    if (mid == start) {
      return start;
    }
    if (lyric[mid].time < currentTime) {
      return this.getCurrentLyric(mid, end, currentTime, lyric);
    } else {
      return this.getCurrentLyric(start, mid, currentTime, lyric);
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
    if (!this.props.song.currentSongIndex && this.props.song.songlist.length > 0) {
      this.props.actions.playFromList(0);
    }
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
    if (this.state.source) {
      this.mouseState.press = true;
      window.addEventListener("mouseup", this._handleMouseUp.bind(this));
      window.addEventListener("mousemove", this._handleMouseMove.bind(this));
    }
  }

  render() {
    let Previous = require('../assets/icon/previous.svg');
    let Next = require('../assets/icon/next.svg');
    let Play = require('../assets/icon/' + this.state.playbuttonIcon + '.svg');
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
            <Previous className="i" />
          </button>
          <button 
            onClick={ e => this._playorpause(e) }
            className="player__btns__play player__btns-btn"
            >
            <Play
              className="i"
            />
          </button>
          <button 
            onClick={ e => this._next(e) }
            className="player__btns__forward player__btns-btn">
            <Next className="i" />
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
                className={this.state.state=='loading' ? "player__pg__bar-cur loading" : "player__pg__bar-cur"}
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
        <PlayerList 
          song={this.props.song} 
          closePlayList={this.props.actions.closePlayList}
          playFromList={this.props.actions.playFromList}
          showplaylist={this.props.song.showplaylist}
          removesongfromlist={this.props.actions.removesongfromlist}
          removesonglist={this.props.actions.removesonglist}
          />
      </div>
    );
  }
}
