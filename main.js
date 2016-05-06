'use strict';

const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const ipcMain = electron.ipcMain;
const Tray = electron.Tray;
const Menu = electron.Menu;

const Childprocess = require('child_process');
const path = require('path');
const http = require('http');
var server = require('./server/server');

let mainWindow;
var appIcon = null;

function createWindow () {
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 800,
    webPreferences: {
      nodeIntegration: 'iframe',
      webSecurity: false,
    },
    title: 'CloudMusic',
    frame: false,
    icon: 'app/assets/icon.png',
  });

  mainWindow.loadURL('http://127.0.0.1:8080');
  //mainWindow.loadURL('file://' + __dirname + '/index.html');

  mainWindow.webContents.on('did-finish-load', function() {
    var session = electron.session.fromPartition();
    session.cookies.get({}, function(error, cookies) {
        mainWindow.webContents.send('cookie', cookies);
    });
  });

  //mainWindow.webContents.openDevTools();

  mainWindow.on('closed', function() {
    mainWindow = null;
  });

  server.listen(11015, function() {
    console.log('cloud music server listening on port 11015...')
  });

  ipcMain.on('closeapp', function(e) {
    mainWindow.close();
    e.sender.send('closed');
  });

  ipcMain.on('minimize', function(e) {
    mainWindow.minimize();
    e.sender.send('minimize');
  });

  ipcMain.on('maximize', function(e) {
    if (mainWindow.isMaximized()) {
      mainWindow.unmaximize();
    } else {
      mainWindow.maximize();
    }
    e.sender.send('maximize');
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow();
  }
});

ipcMain.on('removecookie', function(e, url, name) {
  var session = electron.session.fromPartition();
  session.cookies.remove(url, name, function() {
    console.log('remove', url, name);
    e.returnValue = 'OK';
  });
});
