import { app, BrowserWindow, ipcMain, Notification } from 'electron';
import path from 'node:path';
import started from 'electron-squirrel-startup';
import { promises as fs } from "fs";

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (started) {
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
    },
  });

  mainWindow.setMenuBarVisibility(false);

  // and load the index.html of the app.
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();

  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

ipcMain.on("notify", (_, text) => {
  new Notification({ title: "Notification", body: text }).show();
});

ipcMain.on("notifyb", (_, message) => {
  new Notification({ title: "Notification", body: message }).show();
});

ipcMain.on("savetext", (_, text, fileName) => {
  let targetPath = __dirname;
  if(path.basename(targetPath) == 'main') { //This block of code should only matter during development.
    targetPath = path.dirname(targetPath);
    if(path.basename(targetPath) == ".webpack") {
      targetPath = path.dirname(targetPath);
    }
  }
  fs.writeFile(path.join(targetPath, fileName).toString(), 
    text, 
    function (err) {
      if(err) {
        new Notification({ title: "Error", body : "Failed to write file: " + err}).show();
      }
    });
});

ipcMain.handle("readText", async (_, fileName, callback) => {
  let targetPath = __dirname;
  if(path.basename(targetPath) == 'main') { //This block of code should only matter during development.
    targetPath = path.dirname(targetPath);
    if(path.basename(targetPath) == ".webpack") {
      targetPath = path.dirname(targetPath);
    }
  }
  const data = await fs.readFile(path.join(targetPath, fileName).toString(), "utf-8");
  return data;
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
