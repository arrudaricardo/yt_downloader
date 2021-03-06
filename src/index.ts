import { app, BrowserWindow, session, ipcMain, Notification, dialog } from 'electron';
import { getInfo, downloadFromInfo } from 'ytdl-core'
declare const MAIN_WINDOW_WEBPACK_ENTRY: any;
const fs = require('fs')
const path = require('path')

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    height: 491,
    width: 488,
    frame: false,
    autoHideMenuBar: true,
    backgroundColor: '#A9A9A9',
    resizable: false,
    webPreferences: {
      nodeIntegration: true
    }
  });

  mainWindow.focus()

  // and load the index.html of the app.
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
};

ipcMain.handle('getInfo', async (event, arg) => {
  try {
    let resp = await getInfo(arg)
    return resp
  } catch (e) {
    return null
  }
})

const downloadCompleteNotification = (title: string, body: string, filePath?: string) => {
  let notification = new Notification({
    title,
    body,
  })
  notification.show()
  return
}

ipcMain.handle('downloadFromInfo', async (event, arg) => {
  let download = downloadFromInfo(arg.info, arg.options)
  download.pipe((fs.createWriteStream(arg.path)))
  downloadCompleteNotification("Download Completed", arg.info.title)
  return JSON.stringify(download)
})


// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
  createWindow(),
    session.defaultSession.protocol.registerFileProtocol('static', (request, callback) => {
      const fileUrl = request.url.replace('static://', '');
      const filePath = path.join(app.getAppPath(), '.webpack/renderer', fileUrl);
      callback(filePath);
    });

});

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
