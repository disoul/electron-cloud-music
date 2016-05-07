# NeteaseCloudMusic Electron

[![devDependency Status](https://david-dm.org/disoul/electron-cloud-music/dev-status.svg)](https://david-dm.org/disoul/electron-cloud-music#info=devDependencies)
网易云音乐Electron版`` 开发中 ``

## 进度

* 搜索歌曲+播放（版权歌曲无法播放
* 播放列表
* 手机登陆
* 个人歌单（创建，收藏
* 歌曲界面（滚动歌词
* [TODO] 主页推荐
* [TODO] 私人FM
![预览截图](http://7xn38i.com1.z0.glb.clouddn.com/2016-05-07 14-32-14屏幕截图.png)
![预览截图](http://7xn38i.com1.z0.glb.clouddn.com/2016-05-07 14-32-41屏幕截图.png)

## 试用
目前打包了一个测试版本，[release](https://github.com/disoul/electron-cloud-music/releases/tag/0.0.1)

## Build

```bash
git clone https://github.com/disoul/electron-cloud-music && cd electron-cloud-music
npm install
npm install webpack@2.1.0-beta.5 -g 
npm install webpack-dev-server@2.0.0-beta -g 
npm install electron-prebuilt -g 
webpack-dev-server --inline --compress --content-base=./

// run cloudmusic in proj root path
// electron will load from 127.0.0.1:8080(webpack-dev-server
electron ./
```
