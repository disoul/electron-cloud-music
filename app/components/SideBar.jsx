import React, { Component } from 'react';
import Spinner from './Spinner.jsx';
import SongListContent from './SongListContent.jsx';

export default class SideBar extends Component {
  constructor(props: any) {
    super(props);
    this.state = {
      showCreate: true,
      showCollect: true,
      createHeight: null,
      collectHeight: null,
    };
  }

  componentDidUpdate(props, state) {
    // 获取歌单块高度进行transition
    if (this.props.usersong.state == 'get' && props.usersong.state == 'fetching'){
      this.setState({
        createHeight: this.refs.create.getBoundingClientRect().height,
        collectHeight: this.refs.collect.getBoundingClientRect().height,
      });     
    }
  }

  _songlistdetail(id) {
    this.props.actions.push(SongListContent);
    this.props.actions.fetchsonglistdetail(id);
  }
  
  getCreate() {
    const { usersong } = this.props;
    switch (usersong.state){
      case 'nouser':
        return <p>无用户</p>
      case 'fetching':
        return  <Spinner /> 
      case 'error':
        return <p>获取歌单出错<span>{usersong.errorinfo}</span></p>
      case 'get':
        let PlayListIcon = require('../assets/icon/playlist.svg?name=PlayListIcon')
        let self = this;
        return (
          <ul 
            className="sidebar__mylist__content"
            style={
              !this.state.showCreate ? { height: '0px' } : { height: this.state.createHeight }
            }
            ref="create"
            >
            {usersong.create.map(songlist => {
              return (
                <li 
                  onClick={ e => self._songlistdetail(songlist.id)}
                  className="sidebar__mylist__content__list">
                  <PlayListIcon className="i" />
                  <p>{songlist.name}</p>    
                </li>
              )
            })}
          </ul>
        );
    }
  }

  getCollect() {
    const { usersong } = this.props;
    switch (usersong.state){
      case 'nouser':
        return <p>无用户</p>
      case 'fetching':
        return  <Spinner /> 
      case 'error':
        return <p>获取歌单出错<span>{usersong.errorinfo}</span></p>
      case 'get':
        let PlayListIcon = require('../assets/icon/playlist.svg?name=PlayListIcon')
        return (
          <ul 
            className="sidebar__mylist__content"
            style={
              !this.state.showCollect ? { height: '0px' } : { height: this.state.collectHeight }
            }
            ref="collect"
            >
            {usersong.collect.map(songlist => {
              return (
                <li className="sidebar__mylist__content__list">
                  <PlayListIcon className="i" />
                  <p>{songlist.name}</p>    
                </li>
              )
            })}
          </ul>
        );
    }
  }

  _showorhide(target) {
    if (target === 'showCreate') {
      this.setState({
        showCreate: !this.state.showCreate,
      });
    }
    if (target === 'showCollect') {
      this.setState({
        showCollect: !this.state.showCollect,
      });
    }
  }

  render() {
    return (
      <div className="sidebar">
        <div className="sidebar__mylist">
          <h3>我创建的歌单</h3>
          <img
            className="sidebar__mylist__control" 
            style={this.state.showCreate ? { transform: 'rotateX(180deg)' }:{}}
            onClick={e => this._showorhide('showCreate')}
            src={require('url!../assets/img/up.svg')}
            />
          {this.getCreate()}
        </div>
        <div className="sidebar__mylist">
          <h3>我收藏的歌单</h3>
          <img
            className="sidebar__mylist__control" 
            style={this.state.showCollect ? { transform: 'rotateX(180deg)' }:{}}
            src={require('url!../assets/img/up.svg')}
            onClick={e => this._showorhide('showCollect')}
            />
          {this.getCollect()}
        </div>
      </div>
    );
  }
}
