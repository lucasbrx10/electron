const {app, BrowserWindow, session} = require('electron');
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

    const filter = {
        urls: ["https://*.github.com/*"]
    }
    
    session.defaultSession.webRequest.onBeforeSendHeaders(filter, (details, callback) => {
        details.requestHeaders['User-Agent'] = "TreinaWeb";
        
        callback({cancel: false, requestHeaders: details.requestHeaders});
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

