//const { log } = require('@angular-devkit/build-angular/src/builders/ssr-dev-server');
import { app, BrowserWindow, ipcMain, dialog } from 'electron';
import fs from 'node:fs';
import path from 'node:path';
import url from 'url';
import { fileURLToPath } from 'node:url';
import Store from 'electron-store';
//first-angular-electron-app

const __filename = fileURLToPath(import.meta.url); // Current file
const __dirname = path.dirname(__filename);       // Current directory

let mainWindow;
const store = new Store();

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: false, // Recommended to disable nodeIntegration for security
      contextIsolation: true,  // Required for preload to work
      preload: path.join(__dirname, 'preload.js')  // Use the preload script
    },
    autoHideMenuBar: true,
  });

  mainWindow.setMenuBarVisibility(false);

  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, `/dist/stardew-tracker/browser/index.html`),
      protocol: "file:",
      slashes: true,
    })
  );
  
  //mainWindow.webContents.openDevTools(); //c comment out for prod

  mainWindow.on('closed', function () {
    mainWindow = null;
  });
}

/*
app.on('ready', () => {
  store.set('userSettings', { theme: 'light', language: 'en' });
});*/
app.on('ready', createWindow);

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', function () {
  if (mainWindow === null) createWindow();
});
