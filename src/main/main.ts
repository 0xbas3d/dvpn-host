/* eslint global-require: off, no-console: off, promise/always-return: off */
import path from 'path';
import { app, BrowserWindow, shell, ipcMain } from 'electron';
import { autoUpdater } from 'electron-updater';
import log from 'electron-log';
import MenuBuilder from './menu';
import { resolveHtmlPath } from './util';
const util = require('util');
const exec = util.promisify(require('child_process').exec);
var sudo = require('sudo-prompt');
var options = {
  name: 'Electron',
  icons: '/Applications/Electron.app/Contents/Resources/Electron.icons', // (optional),
};
const sudoExec = util.promisify(sudo.exec);

ipcMain.handle('custom', async (event, data) => {
  const container = data[0];
  const command = data[1];
  if (command === 'containers') {
    const { stdout, stderr } = await exec('ls -a $HOME | grep .sentinel_');
    return stdout;
  } else {
    const { stdout, stderr } = await exec(
      `docker ps --all --filter name="${container}" --quiet`
    );
    if (stdout === '') return 'Stopped';
    const output = await exec(
      `docker container inspect --format "{{ .State.Running }}" "${container}"`
    );
    if (output.stdout === 'true\n') return 'Running';
    return 'Stopped';
  }
});

ipcMain.handle('default', async (event, data) => {
  const { stdout, stderr } = await exec(
    `CONTAINER_NAME=temp bash ${path.join(
      __dirname,
      '../scripts/runner.sh'
    )} init default_config ; CONTAINER_NAME=temp bash ${path.join(
      __dirname,
      '../scripts/runner.sh'
    )} init default_v2ray`
  );
  return stdout;
});

ipcMain.handle('run', async (event, data) => {
  try {
    const container = data[0];
    const command = data[1];
    if (command === 'setup') {
      const output = await sudoExec(
        `HOME=${
          process.env.HOME
        } ; CONTAINER_NAME=${container} bash ${path.join(
          __dirname,
          '../scripts/runner.sh'
        )} setup`,
        options
      );
      return output;
    } else if (command === 'init') {
      const config = JSON.parse(data[2]);
      const keys = Object.keys(config);
      let config_string = '';
      for (let i in keys) {
        if (keys[i] != 'mnemonic' && keys[i] != 'passphrase')
          config_string += `export ${keys[i]}=${config[keys[i]]};`;
      }
      const { stdout, stderr } = await exec(
        config_string +
          `CONTAINER_NAME=${container} bash ${path.join(
            __dirname,
            '../scripts/runner.sh'
          )} init config ; CONTAINER_NAME=${container} bash ${path.join(
            __dirname,
            '../scripts/runner.sh'
          )} init ${config.node_type}`
      );
      return stdout;
    } else if (command === 'init_keys') {
      const config = JSON.parse(data[2]);
      const mnemonic = 'mnemonic' in config ? config['mnemonic'] : undefined;
      const passphrase = config['passphrase'];
      if (mnemonic) {
        const { stdout, stderr } = await exec(
          `printf "${mnemonic}\n${passphrase}\n${passphrase}\n" | CONTAINER_NAME=${container} bash ${path.join(
            __dirname,
            '../scripts/runner.sh'
          )} init keys`
        );
        return stdout;
      } else {
        const { stdout, stderr } = await exec(
          `printf "${passphrase}\n${passphrase}\n" | CONTAINER_NAME=${container} bash ${path.join(
            __dirname,
            '../scripts/runner.sh'
          )} init new_key`
        );
        const mnemonic = stderr.split('\n')[1];
        const address = stdout.split('\n')[1].split(' ')[1];
        const operator = stdout.split('\n')[1].split(' ')[2];
        return JSON.stringify({ mnemonic, address, operator });
      }
    } else if (command === 'start') {
      const passphrase = data[2];
      const { stdout, stderr } = await exec(
        `CONTAINER_NAME=${container} bash ${path.join(
          __dirname,
          '../scripts/runner.sh'
        )} ${command} ; echo ${passphrase} | socat -u EXEC:"docker attach ${container}",pty STDIN`
      );
      if (stdout) return stdout;
      if (stderr) return stderr;
    } else if (command === 'stop') {
      const { stdout, stderr } = await exec(
        ` CONTAINER_NAME=${container} bash ${path.join(
          __dirname,
          '../scripts/runner.sh'
        )} ${command}`
      );
      return stdout;
    } else {
      const { stdout, stderr } = await exec(
        `CONTAINER_NAME=${container} bash ${path.join(
          __dirname,
          '../scripts/runner.sh'
        )} ${command}`
      );
      return stdout;
    }
  } catch (err: any) {
    console.log(err);
    if (err.stdout) return err.stdout;
    if (err.stderr) return err.stderr;
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
  event.reply('ipc-example', msgTemplate('pong'));
});

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

// const isDebug =
//   process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true';
const isDebug = false;

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
      mainWindow.maximize();
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
