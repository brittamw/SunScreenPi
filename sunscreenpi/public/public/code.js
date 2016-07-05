
function initialize(){
	//durchschnittCalc=0;	//global
	var socket = io.connect("/sunscreenpi");
	socket.on("SunScreenPi", function(data){
	var summe = 0;
	var count = 0;
	durchschnitt = 0;
	var mydate = new Date();
	myjetzt = mydate.getTime()/1000;
	myjetzt = myjetzt -60 ; // Startwerte von einer Minute 
	
		if(typeof jetzt != "undefined"){
			//console.log("test");
			
			for (var property in data) {
				if (data.hasOwnProperty(property)) {
					//console.log(typeof(data[property])); 			//UV index
					//console.log(property);					//timestamp
			
					if(property >= jetzt){
						
						count++;
						summe += parseFloat(data[property]);	//Summe, alle Uv indexe addiert
						
						
						//console.log("Die Summe ist "+ summe);
						//console.log(count);
						
						durchschnitt = summe/count;
						
						
						
						console.log("Der Durchschnitt ist: "+ durchschnitt.toFixed(2));
						//summeaussen = summe;
						document.getElementById("aktIndex").innerHTML = "UV-Index: "+ durchschnitt.toFixed(0);
						
					}
				
				}
			}
		}else{
			for (var property in data) {
				if(property >= myjetzt){
					if (data.hasOwnProperty(property)) {
						//console.log(typeof(data[property])); 			//UV index
						//console.log(property);					//timestamp

							count++;
							summe += parseFloat(data[property]);	//Summe, alle Uv indexe addiert
							
							
							//console.log("Die Summe ist "+ summe);
							//console.log(count);
							
							durchschnitt = summe/count;
							console.log("Der Durchschnitt ist: "+ durchschnitt.toFixed(2));
							//summeaussen = summe;
							document.getElementById("aktIndex").innerHTML = "UV-Index: "+ durchschnitt.toFixed(0);

					}
				}
				
			}
		}
		
			
	});
	
	
}