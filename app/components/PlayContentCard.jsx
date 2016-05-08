import React, { Component } from 'react';
import { playlistTracks } from '../server';

export default class PlayContentCard extends Component {
  constructor(props: any) {
    super(props);
    this.state = {
      cardMode: 'mini',
      height: '0px',
      width: '0px',
      left: '10px',
      lyricTranslate: 90,
    };
  }

  componentWillReceiveProps(props) {
    if (props.data && this.props.data == undefined) {
      this.setState({
        height: '100px',
        width: '300px',
      });
    }
    if ((this.props.playcontent.mode != props.playcontent.mode) && props.playcontent.mode == 'max') {
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
      this.setState({
        lyricTranslate: 90,
      });
      if (props.data == undefined) {
        this.setState({
          height: '0px',
          width: '0px',
        });
      } else {
        this.props.actions.lyric(props.data.id);
      }
    }
  }

  componentDidUpdate(props, state) {
    if (this.props.playcontent.currentLyric != props.playcontent.currentLyric) {
      console.logg('change');
      let target = this.refs.current;
      let container = this.refs.lyric;
      this.setState({
        lyricTranslate: this.state.lyricTranslate + container.getBoundingClientRect().top - target.getBoundingClientRect().top + 90,
      });
    }
  }

  _showmaxormini(e) {
    if (this.props.playcontent.mode == 'mini') {
      this.props.actions.showplaycontentmax();
    } else {
      this.props.actions.hiddenplaycontentmax();
    }
  }
  
  _starSong(e, id) {
    let pid = this.props.usersong.create[0].id;
    playlistTracks('add', pid, id).then(res => {
      if (res.code == 502) {
        this.props.actions.toast('收藏失败!歌曲已经存在');
      } else if (res.code == 200) {
        this.props.actions.toast('收藏成功!');
      } else {
        this.props.actions.toast('收藏失败 Code:'+res.code);
      }
    }).catch(err => {
      this.props.actions.toast('收藏失败!' + err);
    }); 
    e.stopPropagation();
  }

  renderLyric() {
    const { playcontent } = this.props;
    return playcontent.lyric.lyric.map((lrcobj, index) => {
      return (
        <div
          ref={index == playcontent.currentLyric ? "current" : null}
          className={index == playcontent.currentLyric ? "current lyric" : "lyric"}
          key={index}
          >
          <p>{lrcobj.content}</p>
        </div>    
      );   
    });
  }

  renderMain() {
    let Star = require('../assets/icon/star.svg?name=Star');
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
              <div className="maxplaycontent-song">
                <div className="maxplaycontent__cover">
                  <img src={this.props.data.album.picUrl} />
                </div>
                <div className="maxplaycontent__info">
                  <p className="maxplaycontent__info__name">
                    {this.props.data.name}
                  </p>
                  <p className="maxplaycontent__info__artist">
                    {this.props.data.artists[0].name}
                  </p>
                  <p className="maxplaycontent__info__album">
                    {this.props.data.album.name}
                  </p>
                  <div 
                    onClick={ e => this._starSong(e, this.props.data.id)} 
                    className="maxplaycontent__info__control">
                    <Star
                      className="i"
                      />
                    <span>喜欢</span>
                  </div>
                </div>
              </div>
              <div className="maxplaycontent-lyric" ref="lyric">
                <div 
                  className="maxplaycontent-lyric__wrapper" 
                  ref="lyric_wrapper"
                  style={{
                    transform: 'translateY(' + this.state.lyricTranslate  + 'px)',
                  }}
                  >
                  {this.renderLyric()} 
                </div>
              </div>
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
