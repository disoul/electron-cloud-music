'use strict';

const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const ipcMain = electron.ipcMain;

const Childprocess = require('child_process');
const path = require('path');
const http = require('http');

let server_process;

let mainWindow;

function createWindow () {
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 800,
    webPreferences: {
      nodeIntegration: 'iframe',
      webSecurity: false,
    },
  });

  mainWindow.loadURL('http://127.0.0.1:8080');
  //mainWindow.loadURL('file://' + __dirname + '/index.html');
  //
  mainWindow.webContents.on('did-finish-load', function() {
    var session = electron.session.fromPartition();
    session.cookies.get({}, function(error, cookies) {
        mainWindow.webContents.send('cookie', cookies);
    });
  });

  mainWindow.webContents.openDevTools();

  mainWindow.on('closed', function() {
    mainWindow = null;
  });

  server_process = Childprocess.spawn('node', ['server.js'], {
    cwd: path.resolve(__dirname, './app/server/'),
    stdio: ['ignore', process.stdout, process.stderr],
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

process.on('exit', function() {
  server_process.kill('SIGHUP');
});

ipcMain.on('removecookie', function(e, url, name) {
  var session = electron.session.fromPartition();
  session.cookies.remove(url, name, function() {
    console.log('remove', url, name);
    e.returnValue = 'OK';
  });
});
