var PORT = 3000;

// Initialisierung des Express Servers
var express = require("express");
var app = express();

var http = require("http");
var server = http.createServer(app);
app.use(express.static(__dirname + "/public"));
server.listen(PORT);

// Initialisierung Websockets
var socketio = require("socket.io");
var io = socketio.listen(server);

//io.sockets.on("connection", function(socket){console.log("angemeldet")});
