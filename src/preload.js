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
  batteryApi: {},
  fileApi: {
    writeTextToFile(text, fileName) {
      ipcRenderer.send("savetext", text, fileName);
    }
  },
});