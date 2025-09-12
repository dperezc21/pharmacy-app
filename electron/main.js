const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      /*contextIsolation: true*/
      contextIsolation: true,   // ❗ Cambiar esto
      nodeIntegration: false,    // ❗ Desactiva esto para seguridad
      webSecurity: true         // Solo si necesitas cargar recursos locales
    }
  });

  // Carga el index.html compilado por Angular
  win.loadFile(path.join(__dirname, '../dist/pharmacy-app/browser/index.html'));
  //win.webContents.openDevTools(); // Para ver errores en consola
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
