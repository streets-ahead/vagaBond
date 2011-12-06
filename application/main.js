var lazybum = require('lazyBum');

var server = new lazybum.RestServer();
server.startServer();


console.log("LOAD BINDLE")
var bindle = {}
var myFiles = fs.readdirSync(process.cwd() + "/bindle");
for (var i in myFiles){
	var file = myFiles[i];
	var fileName = file.substr(0, file.lastIndexOf('.'));
	bindle[fileName] = require('./bindle/' + fileName)
}



setInterval(function(){
	for(var i in bindle){
		bindle[i].run()
	}
}, 3600000)