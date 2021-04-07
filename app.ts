import { BrowserWindow, app } from 'electron';
import { ipcMain, dialog } from 'electron';
import { environment } from './src/environments/environment'

class Main {
    static win: BrowserWindow | null
    static elApp: typeof app

    static Main() {
        Main.elApp = app
        Main.elApp.whenReady().then(Main.onReady)
        Main.elApp.on("window-all-closed", () => {
            if (process.platform !== 'darwin') {
                Main.elApp.quit();
            }
        })
    }

    private static onReady() {
        Main.win = new BrowserWindow({
            width: 1200, height: 800, webPreferences: {
                nodeIntegration: true,
                contextIsolation: false,
                enableRemoteModule: false
            },
        });

        if (environment.production) {
            Main.win.loadFile("dist/index.html")
        } else {
            Main.win.loadURL("http://127.0.0.1:4200")
        }

        Main.win.webContents.openDevTools()

        Main.setupIPC()

        Main.win.on('closed', () => {
            Main.win = null;
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

Main.Main()