
function initialize(){
	//durchschnittCalc = 7;
	//durchschnittCalc =0	;	//global
	var socket = io.connect("/sunscreenpi");
	socket.on("SunScreenPi", function(data){
	var summe = 0;
	var count = 0;
	var durchschnitt = 0;
	
	
		//if(jetzt){
			console.log("test");
			
			for (var property in data) {
				if (data.hasOwnProperty(property)) {
					console.log(data[property]); 			//UV index
					console.log(property);					//timestamp
					
					if(property >= jetzt){
						
						count++;
						summe += parseFloat(data[property]);	//Summe, alle Uv indexe addiert
						
						
						console.log("Die Summe ist "+ summe);
						console.log(count);
						
						durchschnitt = summe/count;
						
						//durchschnittCalc = durchschnitt;
						console.log("Der Durchschnitt ist: "+ durchschnitt.toFixed(2));
						//summeaussen = summe;
						document.getElementById("aktIndex").innerHTML = "UV-Index: "+ durchschnitt.toFixed(0);
						
					}
				
				}
				
				
			}
			
			
			
		//}
			
	});
	
	
}