const electron = require('electron')
// Module to control application life.
const app = electron.app
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow
// Module to handle processes
const exec = require('child_process').exec;
// Module to read files
const fs = require('fs');
// Module to execute commands
const execSync = require('child_process').execSync;

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({width: 800, height: 600})
  mainWindow.setFullScreen(true);

  // and load the index.html of the app.
  mainWindow.loadURL(`file://${__dirname}/index.html`)

  // Open the DevTools.
  mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

function connect_wifi(wifi_name, password) {
		var template = fs.readFileSync("wifi-template.xml",encoding="utf-8");
        var hex = "";
        for (var i = 0; i < wifi_name.length; i++)
            hex += wifi_name.charCodeAt(i).toString(16);
        template = template.replace("{hex}", hex);
		template = template.replace("{network}", wifi_name);
		template = template.replace("{password}", password);
		fs.writeFileSync("EC-Profile.xml", template);
        execSync("netsh wlan add profile EC-Profile.xml");
        execSync("netsh wlan connect " + wifi_name);
        return true;
}

function get_wifi() {
	var wifi_list = execSync("netsh wlan show networks mode=bssid").toString('utf-8').split('\r\n\r\n');
	wifi_list.shift(); 
    wifi_list.pop();
    var wifi_objects = [];
    for (j = 0; j < wifi_list.length; j++) {
        try {
            wifi_objects.push(wifi_parse(wifi_list[j]));
        } 
        catch (e) {
            continue;
        }
    }
    return wifi_objects;
}

function wifi_parse(wifi_string) {
	var wifi_attr = wifi_string.split('\r\n');
	var wifi_object = {ssid:wifi_attr[0].split(':')[1].trim()};
	for (i = 1; i < wifi_attr.length; i++) {
		var pair = wifi_attr[i].split(':');
        var key = pair[0].trim().toLowerCase().replace(' ','_');
        var value = pair[1].trim();
        if (key === 'signal')
            value = parseInt(value.substr(0,3));
        if (key === 'channel')
            value = parseInt(value.substr(0,3));
		wifi_object[key] = value;
	}
	return wifi_object;
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }

})


// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
