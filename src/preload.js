// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
const { ipcRenderer, contextBridge } = require("electron");

contextBridge.exposeInMainWorld("electron", {
  notificationApi: {
    sendNotification(message) {
      ipcRenderer.send("notify", message);
    },
    sendNotification2(message) {
        ipcRenderer.send("notifyb", message + "2");
    }
  },
  fileApi: {
    writeTextToFile(text, fileName) {
      ipcRenderer.send("savetext", text, fileName);
    },
    readTextFromFile(fileName) {
      return ipcRenderer.invoke("readText", fileName);
    },
    rm(fileName) {
      return ipcRenderer.invoke("rm", fileName);
    },
    mkdirp(dirName) {
      return ipcRenderer.invoke("mkdirp", dirName);
    },
    emptyDir(dirName) {
      return ipcRenderer.invoke("emptyDir", dirName);
    },
    moveDirContentsTo(src, destName) {
      return ipcRenderer.invoke("moveDirContentsTo", src, destName);
    }
  },
  torrentApi: {
    startDownload(torrent, opts) {
      ipcRenderer.send("startDownload", torrent, opts);
    },
    stopDownload() {
      ipcRenderer.send("stopDownload");
    },
    cancelDownload() {
      ipcRenderer.send("cancelDownload");
    },
    downloadStatus() {
      return ipcRenderer.invoke("downloadStatus");
    }
  }
});