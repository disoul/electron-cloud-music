# NeteaseCloudMusic Electron

网易云音乐Electron版
`` 开发中 ``

## 进度
目前只有基本功能
* 搜索歌曲+播放（版权歌曲无法播放
* 播放列表
* 手机登陆
* 个人歌单（创建，收藏
* [TODO] 歌曲界面
* [TODO] 主页推荐
* [TODO] 私人FM
![预览截图](http://7xn38i.com1.z0.glb.clouddn.com/snapshot5.png)   

## Build
目前还没有打包，如果想预览开发效果可以按以下步骤自行构建

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
