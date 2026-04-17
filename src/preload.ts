import { contextBridge, ipcRenderer } from "electron";

export type Api = {
    sendSync: (channel: string, args?: unknown) => unknown;
    invoke: (channel: string, args?: unknown) => Promise<unknown>;
};

const api: Api = {
    sendSync: (channel, args) => ipcRenderer.sendSync(channel, args),
    invoke: (channel, args) => ipcRenderer.invoke(channel, args),
};

contextBridge.exposeInMainWorld("api", api);

export { api };
