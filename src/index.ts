import 'dotenv/config';
import { app, BrowserWindow, ipcMain } from "electron";
import { join } from "node:path";
import { prepareNext } from "sc-prepare-next";
import { bootstrap } from './main';
const PORT = 4444;

async function createWindow(): Promise<void> {
  const win = new BrowserWindow({
    title: "SC - Electron and Next",
    icon: "./build/icon.png",
    //i want to set fullscreen
    width: 1200,
    height:   800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: join(__dirname, "preload.js"),
    },
  });

  if (app.isPackaged) {
    win.loadFile(join(__dirname, "..", "..", "dist", "frontend", "index.html"));
  } else {
    await bootstrap();
    win.loadURL(`http://localhost:${PORT}/`);

    win.webContents.on("console-message", (_event, level, message, line, sourceId) => {
      console.log(`Renderer console [${level}] ${sourceId}:${line} - ${message}`);
    });

    win.webContents.openDevTools();
  }
}

/**
 * When the application is ready, this function is called.
 *
 * It creates a BrowserWindow instance and loads the main application.
 * It also sets up the logging and database connections.
 *
 * @returns {Promise<void>} A Promise that resolves when all the setup is done.
 */
app.whenReady().then(async () => {
  await prepareNext("./src", PORT);

  ipcMain.handle("add-user", async (_event, payload) => {
    try {
      const response = await fetch("http://localhost:3002/user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        return {
          error: true,
          status: response.status,
          message: await response.text(),
        };
      }

      return await response.json();
    } catch (error) {
      console.error("IPC add-user error:", error);
      return {
        error: true,
        message: error instanceof Error ? error.message : String(error),
      };
    }
  });

  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

/* ++++++++++ events ++++++++++ */
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

/* ++++++++++ code ++++++++++ */
