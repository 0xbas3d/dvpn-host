/* eslint global-require: off, no-console: off, promise/always-return: off */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `npm run build` or `npm run build:main`, this file is compiled to
 * `./src/main.js` using webpack. This gives us some performance wins.
 */
import path from 'path';
import { app, BrowserWindow, shell, ipcMain } from 'electron';
import { autoUpdater } from 'electron-updater';
import log from 'electron-log';
import MenuBuilder from './menu';
import { resolveHtmlPath } from './util';
const exec = require('child_process').exec;
var sudo = require('sudo-prompt');
var options = {
  name: 'Electron',
  icns: '/Applications/Electron.app/Contents/Resources/Electron.icns', // (optional),
};

ipcMain.on('run', async (event, data) => {
  const command = data[0];
  if (command === 'setup') {
    // options['env']['USERHOME'] = 'lmao';
    sudo.exec(
      `HOME=${process.env.HOME} ; bash ${path.join(
        __dirname,
        '../scripts/runner.sh'
      )} setup`,
      options,
      function (error: string, stdout: string, stderr: string) {
        if (stdout) console.log(stdout);
        if (stderr) console.log(stderr);
      }
    );
  } else if (command === 'init') {
    const mnemonic = data[1];
    const passphrase = data[2];
    exec(
      `bash ${path.join(
        __dirname,
        '../scripts/runner.sh'
      )} init config ; bash ${path.join(
        __dirname,
        '../scripts/runner.sh'
      )} init wireguard ; printf "${mnemonic}\n${passphrase}\n${passphrase}\n" | bash ${path.join(
        __dirname,
        '../scripts/runner.sh'
      )} init keys`,
      options,
      function (error: string, stdout: string, stderr: string) {
        if (stdout) console.log(stdout);
        if (stderr) console.log(stderr);
      }
    );
  } else if (command === 'start') {
    const passphrase = data[1];
    exec(
      `echo ${passphrase} | bash ${path.join(
        __dirname,
        '../scripts/runner.sh'
      )} ${command} < ${path.join(__dirname, '../scripts/keyphrase.txt')}`,
      options,
      function (error: string, stdout: string, stderr: string) {
        if (stdout) console.log(stdout);
        if (stderr) console.log(stderr);
      }
    );
  } else {
    exec(
      `bash ${path.join(
        __dirname,
        '../scripts/runner.sh'
      )} ${command} < ${path.join(__dirname, '../scripts/keyphrase.txt')}`,
      options,
      function (error: string, stdout: string, stderr: string) {
        if (stdout) console.log(stdout);
        if (stderr) console.log(stderr);
      }
    );
  }
});

class AppUpdater {
  constructor() {
    log.transports.file.level = 'info';
    autoUpdater.logger = log;
    autoUpdater.checkForUpdatesAndNotify();
  }
}

let mainWindow: BrowserWindow | null = null;

ipcMain.on('ipc-example', async (event, arg) => {
  const msgTemplate = (pingPong: string) => `IPC test: ${pingPong}`;
  console.log(msgTemplate(arg));
  event.reply('ipc-example', msgTemplate('pong'));
});

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

const isDebug =
  process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true';

if (isDebug) {
  require('electron-debug')();
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS'];

  return installer
    .default(
      extensions.map((name) => installer[name]),
      forceDownload
    )
    .catch(console.log);
};

const createWindow = async () => {
  if (isDebug) {
    await installExtensions();
  }

  const RESOURCES_PATH = app.isPackaged
    ? path.join(process.resourcesPath, 'assets')
    : path.join(__dirname, '../../assets');

  const getAssetPath = (...paths: string[]): string => {
    return path.join(RESOURCES_PATH, ...paths);
  };

  mainWindow = new BrowserWindow({
    show: false,
    width: 1024,
    height: 728,
    icon: getAssetPath('icon.png'),
    webPreferences: {
      preload: app.isPackaged
        ? path.join(__dirname, 'preload.js')
        : path.join(__dirname, '../../.erb/dll/preload.js'),
      nodeIntegration: true,
    },
  });

  mainWindow.loadURL(resolveHtmlPath('index.html'));

  mainWindow.on('ready-to-show', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    if (process.env.START_MINIMIZED) {
      mainWindow.minimize();
    } else {
      mainWindow.show();
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  const menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();

  // Open urls in the user's browser
  mainWindow.webContents.setWindowOpenHandler((edata) => {
    shell.openExternal(edata.url);
    return { action: 'deny' };
  });

  // Remove this if your app does not use auto updates
  // eslint-disable-next-line
  new AppUpdater();
};

/**
 * Add event listeners...
 */

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app
  .whenReady()
  .then(() => {
    createWindow();
    app.on('activate', () => {
      // On macOS it's common to re-create a window in the app when the
      // dock icon is clicked and there are no other windows open.
      if (mainWindow === null) createWindow();
    });
  })
  .catch(console.log);
