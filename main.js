// Modules to control application life and create native browser window
const {app, BrowserWindow} = require('electron')
const path = require('path')

let mainWindow;
function createWindow () {
  mainWindow = new BrowserWindow({
    "frame": false,
    "toolbar": false,
    "width": 200,
    "height": 300,
    "transparent": true,
    "always-on-top": true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true
    }
  })
  mainWindow.loadFile('index.html')

  // mainWindow.webContents.openDevTools()
}
// app.whenReady().then(createWindow)
app.on('ready', function () {
    createWindow();
    // setTimeout(() => {
    //     mainWindow.webContents.send('call-ShowCam')
    // }, 10000);
})

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') app.quit()
})

app.on('load', function() {
    
})

app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.