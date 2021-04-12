import { BrowserWindow, app } from 'electron';
import { ipcMain, dialog } from 'electron';
import { environment } from './src/environments/environment'

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
        ipcMain.on("open-dialog", (_, args) => {
            dialog.showOpenDialog({ properties: ['openFile'] }).then((resp) => {
                console.log(args, resp);
            })
        })
    }
}

Electron.Run()