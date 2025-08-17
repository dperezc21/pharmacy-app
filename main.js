const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 1024,
    height: 768,
    webPreferences: {
      /*contextIsolation: true*/
      contextIsolation: false,   // ❗ Cambiar esto
      nodeIntegration: false,    // ❗ Desactiva esto para seguridad
      webSecurity: false         // Solo si necesitas cargar recursos locales
    }
  });

  // Carga el index.html compilado por Angular
  win.loadFile(path.join(__dirname, 'dist/pharmacy-app/browser/index.html'));
  //win.webContents.openDevTools(); // Para ver errores en consola
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
