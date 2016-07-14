// definiert den Port
var PORT = 3000;

var http = require('http');

var express = require("express");
var path = require('path');

var app = express();

var httpServer = http.createServer(app);
httpServer.listen(PORT);
var io = require("socket.io")(httpServer);


var filesystem = require('fs');
var results= [];
filesystem.readdirSync(__dirname).forEach(function(file){
	//Ignore public folder bc this aint beeing a project
	if(file!="public" && file!="node_modules" && file!=".git" && file!="logs") {
		var fullfile = __dirname+"/"+file;
		var stat = filesystem.statSync(fullfile);
		if(stat && stat.isDirectory())
		{
			results.push(file);
			try  {
				require("./"+file+"/server/main.js").initialize(io,express,app);
			} catch(e) {
				console.log("failed to load module: "+file+" with message: "+e.message);
			}
			
		}
	}
	
})

//Autogenerate a public page with links to each subproject (if they didnt mess up)
var stream = filesystem.createWriteStream("public/index.html");
stream.once("open", function(fd) {
	results.forEach(function(el){
		stream.write('<a href="'+el+'">'+el+'</a><br>');
	})
	
	
})

app.use(express.static(__dirname+"/public"))



console.log("server starting..")
