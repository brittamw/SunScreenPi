
function initialize(){
	
	var socket = io.connect("/sunscreenpi");
	socket.on("SunScreenPi", function(data){
		var summe = 0;
		var count = 0;
		if(typeof durchschnitt == "undefined"){
			durchschnitt = 0;
		}
		var mydate = new Date();
		myjetzt = mydate.getTime()/1000;
		myjetzt = myjetzt -60 ; // Startwerte von einer Minute 
		
		if(typeof jetzt != "undefined"){
			
			for (var property in data) {
				if (data.hasOwnProperty(property)) {
					//console.log(typeof(data[property])); 			//UV index
					//console.log(property);					//timestamp
			
					if(property >= jetzt){
						
						count++;
						summe += parseFloat(data[property]);	//Summe, alle Uv indexe addiert
						
						//console.log("Die Summe ist "+ summe);
						//console.log(count);
						
					}
				
				}
			}
			//sobald durchschnit sich ändert, Zeit aktualisieren
			if((durchschnitt >= summe/count+0.2) || (durchschnitt <= summe/count-0.21)){		
				console.log(durchschnitt+" aktualisiere uvi" + summe/count);
				aktualisiere();
			}
			durchschnitt = summe/count;
			console.log("Der Durchschnitt ist: "+ durchschnitt.toFixed(2));
			document.getElementById("aktIndex").innerHTML = "UV-Index: "+ durchschnitt.toFixed(0);
			
			
		}else{
			for (var property in data) {
				if(property >= myjetzt){
					if (data.hasOwnProperty(property)) {
						
							count++;
							summe += parseFloat(data[property]);	//Summe, alle Uv indexe addiert
							
							//console.log("Die Summe ist "+ summe);
							//console.log(count);
					}
				}
				
			}
		}
		durchschnitt = summe/count;
		//console.log("else :Der Durchschnitt ist: "+ durchschnitt.toFixed(2));
							
		document.getElementById("aktIndex").innerHTML = "UV-Index: "+ durchschnitt.toFixed(0);
			
			
	});
	
	
}