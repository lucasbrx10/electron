const {app, BrowserWindow} = require('electron');
let win;
let child;
const appUrl = `file:/${__dirname}/index.html`;

// cria uma janela
function createElectronShell(){
    win = new BrowserWindow({
        width: 800,
        height: 600
    });
    win.loadURL(appUrl);
    win.webContents.openDevTools();
    win.on('closed', () => {
        win = null;
    })

    child = new BrowserWindow({
        width: 200,
        height: 200,
        parent: win,
        modal: true
    });
}

// verifica se deu inicio a aplicação e exibe a janela
app.on('ready', createElectronShell);

app.on('window-all-closed', () => {
    if(process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('active', () => {
    if(app === null){
        createElectronShell();
    }
})