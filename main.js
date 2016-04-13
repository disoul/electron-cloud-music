'use strict';

const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

const Childprocess = require('child_process');
const path = require('path');
const http = require('http');

let server_process;

let mainWindow;

function createWindow () {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: 'iframe',
      webSecurity: false,
    },
  });

  mainWindow.loadURL('file://' + __dirname + '/index.html');

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
