module.exports ={
	
	initialize(socket, express, app) {
	
		console.log("my module is starting");
		
		app.use("/sunscreenpi/admin", express.static(__dirname+ '/../public/admin'))
		app.use("/sunscreenpi", express.static(__dirname+'/../public/public'))
		
		
		var sunnsp = socket.of("/sunscreenpi/client");
		sunnsp.on("connection", function(socket){
			console.log("con");
			
			socket.on("SunScreenPi", function(data){
				console.log(data);
				socket.broadcast.emit("SunScreenPi", data);
			})
		})
		
	}
}