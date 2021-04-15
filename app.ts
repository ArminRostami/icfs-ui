import { BrowserWindow, app } from 'electron';
import { ipcMain, dialog } from 'electron';
import * as fs from "fs";
import * as path from "path"
import { lookup } from "mime-types"
import { environment } from './src/environments/environment'
import { fileData } from './src/app/types/fileData';

class Electron {
    static win: BrowserWindow | null
    static app: typeof app

    static Run() {
        Electron.app = app
        Electron.app.whenReady().then(Electron.onReady)
        Electron.app.on("window-all-closed", () => {
            if (process.platform !== 'darwin') {
                Electron.app.quit();
            }
        })
    }

    private static onReady() {
        Electron.win = new BrowserWindow({
            width: 1200, height: 800, webPreferences: {
                nodeIntegration: true,
                contextIsolation: false,
                enableRemoteModule: false
            },
        });

        if (environment.production) {
            Electron.win.loadFile("dist/index.html")
        } else {
            Electron.win.loadURL("http://127.0.0.1:4200")
        }

        Electron.win.webContents.openDevTools()

        Electron.setupIPC()

        Electron.win.on('closed', () => {
            Electron.win = null;
        });
    }

    private static setupIPC() {
        ipcMain.on("open-dialog", (event, _) => {
            dialog.showOpenDialog({ properties: ['openFile'] }).then((resp) => {
                if (resp.canceled) {
                    event.reply("file-info", { canceled: true })
                    return
                }
                const dir = resp.filePaths[0]
                const type = lookup(dir)
                if (typeof type === "boolean") {
                    return
                }
                const full_name = path.basename(dir)
                const idx = full_name.indexOf(".")

                const fileInfo: fileData = {
                    canceled: false,
                    path: dir,
                    name: full_name.substring(0, idx),
                    extension: full_name.substring(idx + 1),
                    size: fs.statSync(dir).size,
                    type: type
                }
                event.reply("file-info", fileInfo)
            })
        })
    }
}

Electron.Run()