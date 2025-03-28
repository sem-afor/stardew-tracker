//const { log } = require('@angular-devkit/build-angular/src/builders/ssr-dev-server');
import { app, BrowserWindow, ipcMain, dialog } from 'electron';
import fs from 'node:fs';
import path from 'node:path';
import url from 'url';
import { fileURLToPath } from 'node:url';
import Store from 'electron-store';
import { log } from 'node:console';

const __filename = fileURLToPath(import.meta.url); 
const __dirname = path.dirname(__filename);       

let mainWindow;
const store = new Store();

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,  
      preload: path.join(__dirname, 'preload.js') 
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
  
  mainWindow.webContents.openDevTools(); // comment out for prod

  mainWindow.on('closed', function () {
    mainWindow = null;
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', function () {
  if (mainWindow === null) createWindow();
});

ipcMain.handle('save-data', async (event, saveData, fileName) => {
    try {
      console.log(`Saving data: ${fileName}`);
  
      if (!fileName) {
        throw new Error('Filename is required.');
      }

      if (!fileName.endsWith('.json')) {
        fileName += '.json';
      }

      const appDataDir = app.getPath('appData');
      const saveDir = path.join(appDataDir, 'StardewTrackerSaves');
  
      if (!fs.existsSync(saveDir)) {
        fs.mkdirSync(saveDir, { recursive: true });
      }
 
      const filePath = path.join(saveDir, fileName);
  
      console.log(`Resolved file path: ${filePath}`);

      fs.writeFileSync(filePath, JSON.stringify(saveData, null, 2));
  
      console.log(`Save successfully created: ${fileName}`);
      return { success: true, filePath };
    } catch (error) {
      console.error('Error saving data:', error);
      return { success: false, error: error.message };
    }
});

ipcMain.handle('load-save-data', async () => {
    try {
      const appDataDir = app.getPath('appData');
      const saveDir = path.join(appDataDir, 'StardewTrackerSaves');
  
      if (!fs.existsSync(saveDir)) {
        console.warn('No save directory found.');
        return [];
      }
  
      const files = fs.readdirSync(saveDir)
        .filter(file => file.endsWith('.json')) 
        .map(file => {
          const filePath = path.join(saveDir, file);
          const fileContent = fs.readFileSync(filePath, 'utf-8');
          return JSON.parse(fileContent);
        });
  
      return files;
    } catch (error) {
      console.error('Error loading save files:', error);
      return [];
    }
  });

  ipcMain.handle('load-single-save', async (event, filename) => {
    try {
      if (!filename.endsWith('.json')) {
        filename += '.json';
      }
        const appDataDir = app.getPath('appData');
        const saveDir = path.join(appDataDir, 'StardewTrackerSaves');
        const filePath = path.join(saveDir, filename);

        if (!fs.existsSync(filePath)) {
            console.warn(`Save file not found: ${filename}`);
            return null;
        }

        const fileContent = fs.readFileSync(filePath, 'utf-8');
        return JSON.parse(fileContent);
    } catch (error) {
        console.error('Error loading save file:', error);
        return null;
    }
  });


  ipcMain.handle('delete-save', async (event, farmName) => {
    try {
      const appDataDir = app.getPath('appData');
      const saveDir = path.join(appDataDir, 'StardewTrackerSaves');
  
      if (!fs.existsSync(saveDir)) {
        throw new Error('Save directory does not exist');
      }

      console.log("looking for file starts with " + farmName);
      const files = fs.readdirSync(saveDir);
      const fileToDelete = files.find(file => file.startsWith(farmName));
  
      if (!fileToDelete) {
        throw new Error('Save file not found');
      }
  
      const filePath = path.join(saveDir, fileToDelete);

      fs.unlinkSync(filePath);
  
      console.log(`Successfully deleted save file: ${filePath}`);
      return { success: true };
    } catch (error) {
      console.error('Error deleting save file:', error);
      return { success: false, error: error.message };
    }
  });
  
  