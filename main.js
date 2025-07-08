const { app, BrowserWindow, screen, ipcMain } = require('electron');
const path = require('path');

const createWindow = () => {
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;

  const win = new BrowserWindow({
    width,
    height,
    transparent: true, // Enable transparency
    alwaysOnTop: true, // Keep the window always on top
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    },
  });

  win.loadFile('index.html'); // or your actual entry HTML
};

app.whenReady().then(() => {
    ipcMain.handle('ping', () => 'pong')
    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})