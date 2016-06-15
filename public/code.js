

function initialize(){
	var socket = io.connect();
	
	socket.on("SunScreenPi", function(data){
		
		document.getElementById("aktIndex").innerHTML = "UV-Index: "+data;
		
	});
	
	
}