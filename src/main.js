import { app, BrowserWindow, ipcMain, Notification } from 'electron';
import path from 'node:path';
import started from 'electron-squirrel-startup';
//import fs, { promises as fsp } from "fs";
import fs from 'fs-extra'
import WebTorrent from 'webtorrent';

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

const getTargetPath = function() {
  let targetPath = __dirname;
  if(path.basename(targetPath) == 'main') { //This block of code should only matter during development.
    targetPath = path.dirname(targetPath);
    if(path.basename(targetPath) == ".webpack") {
      targetPath = path.dirname(targetPath);
    }
  }
  return targetPath;
}

const webTorrentClient = new WebTorrent();

ipcMain.on("notify", (_, text) => {
  new Notification({ title: "Notification", body: text }).show();
});

ipcMain.on("savetext", (_, text, fileName) => {
  let targetPath = getTargetPath();
  fs.writeFile(path.join(targetPath, fileName).toString(), 
    text, 
    function (err) {
      if(err) {
        new Notification({ title: "Error", body : "Failed to write file: " + err}).show();
      }
    });
});

ipcMain.handle("readText", async (_, fileName) => {
  let targetPath = getTargetPath();
  const data = await fs.readFile(path.join(targetPath, fileName).toString(), "utf-8");
  return data;
});

ipcMain.handle("mkdirp", async (_, dirName) => {
  const path = getTargetPath() + dirName;
  const res = await fs.mkdirp(path);
  return res;
});

ipcMain.handle("rm", async (_, name) => {
  const path = getTargetPath() + name;
  const res = await fs.remove(path);
  return res;
});

ipcMain.handle("emptyDir", async(_, dirName) => {
  const path = getTargetPath() + dirName;
  const res = await fs.emptydir(path);
  return res;
});

ipcMain.handle("moveDirContentsTo", async(_, srcName, destName) => {
  const srcPath = getTargetPath() + srcName;
  const destPath = getTargetPath() + destName;
  const res = await fs.move(srcPath, destPath, { overwrite: true });
  return res;
});

const downloadStatus = {
  state: "Ready",
  downloadingTorrents: {},
  completeTorrents: {}
};

ipcMain.on("startDownload", (_, torrent, opts) => { 
  if(!opts.path) {
    opts.path = getTargetPath() + "/Download"
  }
  webTorrentClient.add(torrent, opts, (torrent) => {
    torrent.on('download', (bytes) => {
      if(!downloadStatus.completeTorrents[torrent.name]) {
        var speedBytes = torrent.downloadSpeed;
        var downloadSpeed = (speedBytes > (1024 * 1024))
          ? (speedBytes / (1024 * 1024)).toFixed(1) + " MB/s"
          : (speedBytes / 1024).toFixed(1) + " KB/s"
        downloadStatus.downloadingTorrents[torrent.name] = {
          timeRemaining: torrent.timeRemaining,
          downloadSpeed: downloadSpeed,
          progress: ((torrent.progress).toFixed(2)),
          done: torrent.done ? "Complete" : "In Progress",
          length: torrent.length
        }
      }
      
      downloadStatus.state == Object.keys(downloadStatus.downloadingTorrents).length == 0 ? "Complete" : "Downloading";
    })

    torrent.on('done', () => {
      console.log("torrent " + torrent.name + " complete!");
      var completeTorrent = {
          timeRemaining: 0,
          downloadSpeed: "-",
          progress: 1,
          done: "Complete",
          length: torrent.length
      }
      delete downloadStatus.downloadingTorrents[torrent.name];
      downloadStatus.completeTorrents[torrent.name] = completeTorrent;
      downloadStatus.state == Object.keys(downloadStatus.downloadingTorrents).length == 0 ? "Complete" : "Downloading";
    })
   console.log("Started torrent " + torrent.name);
  });
});

ipcMain.handle("downloadStatus", (_) => {
  return downloadStatus;
});

ipcMain.on("stopDownload", (_) => {
  const torrents = webTorrentClient.torrents;
  for(var i = 0; i < torrents.length; i++) {
    webTorrentClient.remove(torrents[i]);
  }
});

ipcMain.on("cancelDownload", (_) => {
  const torrents = webTorrentClient.torrents;
  for(var i = 0; i < torrents.length; i++) {
    torrents[i].destroy();
  }
});

ipcMain.handle("downloadExists", (_) => {
  const path = getTargetPath() + "/Download"
  const updateVerFile = path.join(opts.path, "rsf_update.dat");
  if(!fs.existsSync(updateVerFile)) {
    return "-1";
  } else {
    return fs.readFile(updateVerFile, "utf-8");
  }
})

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
