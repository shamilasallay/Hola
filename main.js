// Modules to control application life and create native browser window
const {app, BrowserWindow, ipcMain, ipcRenderer, systemPreferences} = require('electron')
const path = require('path')

let mainWindow;
let chatWindow;
let notiWindow;
let status = 0;

function createWindow () {
  mainWindow = new BrowserWindow({
    "frame": false,
    "toolbar": false,
    "width": 300,
    "height": 400,
    "transparent": true,
    // "always-on-top": true,
    "resizable":true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true
    }
  })

  mainWindow.loadFile('index.html')

  // mainWindow.webContents.openDevTools()
}

function createChatWindow () {
  chatWindow = new BrowserWindow({
    width: 300,
    height: 450,
    show: false,
    frame: true,
    fullscreenable: true,
    resizable: true,
    transparent: true,
    webPreferences: {
      // Prevents renderer process code from not running when window is
      // hidden
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration : true,
      backgroundThrottling: false
    }
  })

  chatWindow.loadFile('chatbot.html')

  // chatWindow.webContents.openDevTools()
}

function createBubbleNotificationWindow () {
  notiWindow = new BrowserWindow({
    width: 300,
    height: 450,
    show: true,
    frame: false,
    fullscreenable: false,
    resizable: false,
    transparent: false,
    webPreferences: {
      // Prevents renderer process code from not running when window is
      // hidden
      backgroundThrottling: false
    }
  })

  notiWindow.loadFile('bubbleNotification.html')

  // chatWindow.webContents.openDevTools()
}
// app.whenReady().then(createWindow)
app.on('ready', function () {
    createWindow();
    createChatWindow();
    
    chatWindow.on('close', function(e){

      global.bubbleClickGlb = {
        varValue: false
     }
     
  });
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
ipcMain.on('open-new-window', (event,filename) => {
  showChatWindow()
});



const showChatWindow = () => {
  const position = getChatWindowPosition()
  chatWindow.setPosition(position.x, position.y, false)
  chatWindow.show()
  chatWindow.focus()
}

const getChatWindowPosition = () => {
  const windowBounds = chatWindow.getBounds()
  const trayBounds = mainWindow.getBounds()

  // Center window horizontally below the tray icon
  const x = Math.round(trayBounds.x + (trayBounds.width / 2) - (windowBounds.width / 2))

  // Position window 4 pixels vertically below the tray icon
  const y = Math.round(trayBounds.y + trayBounds.height + 4)

  return {x: x, y: y}
}

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.


systemPreferences.askForMediaAccess('microphone').then((allowed)=>console.log('Microphone is allowed'))