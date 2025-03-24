const { app, BrowserWindow } = require('electron');
const path = require('path');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      //preload: path.join(__dirname, 'preload.js'),
    },
    autoHideMenuBar: true,
  });

  mainWindow.loadFile(path.join(__dirname, '../dist/stardew-tracker/browser/index.html'));

  // DevTools öffnen (optional)
  mainWindow.webContents.openDevTools();

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

// Setze diese Option vor dem Starten der App
app.allowRendererProcessReuse = true;

app.whenReady().then(createWindow);
