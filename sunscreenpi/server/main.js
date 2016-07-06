module.exports ={
	
	initialize(socket, express, app) {
	
		console.log("my module is starting");
		
		app.use("/sunscreenpi/admin", express.static(__dirname+ '/../public/admin'))
		app.use("/sunscreenpi", express.static(__dirname+'/../public/public'))
		
		
		var sunnsp = socket.of("/sunscreenpi");
		sunnsp.on("connection", function(socket){
			console.log("con");
			
			socket.on("SunScreenPi", function(data){
				console.log(data);
				socket.broadcast.emit("SunScreenPi", data);
			})
		})
		
	},
	getAuthors(){
		return ["Anna Höhnke","Anja Braun","Hannes Herda", "Britta Walter"]
	}, getTitle() {
		return "SunScreenPi"
	},
	getInformation() {
		return "Nie wieder Sonnenbrand mit SunScreenPi! SunScreenPi ermittelt den aktuellen Uv-Index" + 
		"und berechnet dir deine individuelle Zeit, die du sonnenbaden kannst, ohne einen Sonnebrand zu bekommen"
	}
}