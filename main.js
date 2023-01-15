const {app, BrowserWindow, dialog} = require('electron');
let win;
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
    console.log(dialog.showOpenDialog({'properties': ['openfile']}))
    //dialog.showMessageBox({'title': 'Minha Mensagem', 'message': 'oiiiiii'});
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