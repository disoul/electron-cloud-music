# NeteaseCloudMusic Electron

网易云音乐Electron版
`` 开发中 ``

## Build
目前还没有打包，如果想预览开发效果可以按以下步骤自行构建

```bash
git clone https://github.com/disoul/electron-cloud-music && cd electron-cloud-music
npm install
npm install webpack@2.1.0-beta.5 -g 
npm install webpack-dev-server@2.0.0 -g 
npm install electron-prebuilt -g 
webpack-dev-server --inline --compress --content-base=./

// run cloudmusic in proj root path
// electron will load from 127.0.0.1:8080(webpack-dev-server
electron ./
```
