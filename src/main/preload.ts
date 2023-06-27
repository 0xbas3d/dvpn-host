// Disable no-unused-vars, broken for spread args
/* eslint no-unused-vars: off, import/no-extraneous-dependencies: off */
import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';

export type Channels = 'ipc-example';

const electronHandler = {
  ipcRenderer: {
    sendMessage(channel: Channels, args: unknown[]) {
      ipcRenderer.send(channel, args);
    },
    on(channel: Channels, func: (...args: unknown[]) => void) {
      const subscription = (_event: IpcRendererEvent, ...args: unknown[]) => {
        return func(...args);
      };
      ipcRenderer.on(channel, subscription);

      return () => {
        ipcRenderer.removeListener(channel, subscription);
      };
    },
    once(channel: Channels, func: (...args: unknown[]) => void) {
      ipcRenderer.once(channel, (_event, ...args) => {
        return func(...args);
      });
    },
    run(args: String[]) {
      return ipcRenderer.invoke('run', args);
    },
    custom: (args: String[]) => {
      return ipcRenderer.invoke('custom', args);
    },
    default: () => {
      return ipcRenderer.invoke('default');
    },
  },
};

contextBridge.exposeInMainWorld('electron', electronHandler);

export type ElectronHandler = typeof electronHandler;
