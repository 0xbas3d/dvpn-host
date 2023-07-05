/* eslint global-require: off, no-console: off, import/no-extraneous-dependencies: off */

import path from 'path';
import { app, BrowserWindow, shell, ipcMain } from 'electron';
import { autoUpdater } from 'electron-updater';
import log from 'electron-log';
import MenuBuilder from './menu';
import { resolveHtmlPath } from './util';

const util = require('util');
const exec = util.promisify(require('child_process').exec);
const sudo = require('sudo-prompt');

const options = {
  name: 'Electron',
  icons: '/Applications/Electron.app/Contents/Resources/Electron.icons', // (optional),
};
const sudoExec = util.promisify(sudo.exec);

const SCRIPT_PATH = app.isPackaged
  ? path.join(process.resourcesPath, 'scripts/runner.sh')
  : path.join(__dirname, '../../scripts/runner.sh');

const INSTALL_SCRIPT_PATH = app.isPackaged
  ? path.join(process.resourcesPath, 'scripts/install.sh')
  : path.join(__dirname, '../../scripts/install.sh');

ipcMain.handle('install', async () => {
  try {
    const output = await sudoExec(`bash ${INSTALL_SCRIPT_PATH}`, options);
    return output;
  } catch (err: any) {
    if (err.stdout) return err.stdout;
    if (err.stderr) return err.stderr;
  }
});

ipcMain.handle('custom', async (_, data) => {
  const container = data[0];
  const command = data[1];
  if (command === 'containers') {
    const { stdout } = await exec('ls -a $HOME | grep .sentinel_');
    return stdout;
  }
  const { stdout } = await exec(`docker ps --all --filter name="${container}" --quiet`);
  if (stdout === '') return 'Stopped';
  const output = await exec(
    `docker container inspect --format "{{ .State.Running }}" "${container}"`,
  );
  if (output.stdout === 'true\n') return 'Running';
  return 'Stopped';
});

ipcMain.handle('default', async () => {
  const { stdout } = await exec(
    `CONTAINER_NAME=temp bash ${SCRIPT_PATH} init default_config ; CONTAINER_NAME=temp bash ${SCRIPT_PATH} init default_v2ray`,
  );
  return stdout;
});

ipcMain.handle('run', async (_, data) => {
  try {
    const container = data[0];
    const command = data[1];
    if (command === 'setup') {
      const output = await sudoExec(
        `HOME=${process.env.HOME} ; CONTAINER_NAME=${container} bash ${SCRIPT_PATH} setup`,
        options,
      );
      return output;
    }
    if (command === 'init') {
      const config = JSON.parse(data[2]);
      const keys = Object.keys(config);
      let configString = '';
      keys.forEach((key) => {
        if (key !== 'mnemonic' && key !== 'passphrase') {
          configString += `export ${key}=${config[key]};`;
        }
      });
      const { stdout } = await exec(
        `${configString}CONTAINER_NAME=${container} bash ${SCRIPT_PATH} init config ; CONTAINER_NAME=${container} bash ${SCRIPT_PATH} init ${config.node_type}`,
      );
      return stdout;
    }
    if (command === 'init_keys') {
      const config = JSON.parse(data[2]);
      const { mnemonic, passphrase } = config;
      if (mnemonic.length > 0) {
        const { stdout } = await exec(
          `printf "${mnemonic}\n${passphrase}\n${passphrase}\n" | CONTAINER_NAME=${container} bash ${SCRIPT_PATH} init keys`,
        );
        return stdout;
      }
      const { stdout, stderr } = await exec(
        `printf "${passphrase}\n${passphrase}\n" | CONTAINER_NAME=${container} bash ${SCRIPT_PATH} init new_key`,
      );
      const newMnemonic = stderr.split('\n')[1];
      const address = stdout.split('\n')[1].split(' ')[1];
      const operator = stdout.split('\n')[1].split(' ')[2];
      return JSON.stringify({ mnemonic: newMnemonic, address, operator });
    }
    if (command === 'start') {
      const passphrase = data[2];
      const { stdout, stderr } = await exec(
        `CONTAINER_NAME=${container} bash ${SCRIPT_PATH} ${command} ; echo ${passphrase} | socat -u EXEC:"docker attach ${container}",pty STDIN`,
      );
      if (stdout) return stdout;
      if (stderr) return stderr;
    } else if (command === 'stop') {
      const { stdout } = await exec(` CONTAINER_NAME=${container} bash ${SCRIPT_PATH} ${command}`);
      return stdout;
    } else {
      const { stdout } = await exec(`CONTAINER_NAME=${container} bash ${SCRIPT_PATH} ${command}`);
      return stdout;
    }
  } catch (err: any) {
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

ipcMain.on('ipc-example', async (event) => {
  const msgTemplate = (pingPong: string) => {
    return `IPC test: ${pingPong}`;
  };
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
      extensions.map((name) => {
        return installer[name];
      }),
      forceDownload,
    )
    .catch(console.log);
};

const createWindow = async () => {
  if (isDebug) {
    await installExtensions();
  }

  const RESOURCES_PATH = app.isPackaged
    ? path.join(process.resourcesPath, 'assets')
    : path.join(__dirname, '.././assets');

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
