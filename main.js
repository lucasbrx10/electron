const {app, BrowserWindow} = require('electron');
let win;

// cria uma janela
function createElectronShell(){ 
    win = new BrowserWindow({
        width: 800,
        height: 600
    });
    win.on('closed', () => {
        win = null;
    })
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