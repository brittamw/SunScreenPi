
function initialize(){
	
	var socket = io.connect("/sunscreenpi");
	socket.on("SunScreenPi", function(data){
		var summe = 0;
		var count = 0;
		//falls durchschnitt noch undefined ist, durchschnitt 0
		if(typeof durchschnitt == "undefined"){
			durchschnitt = 0;
		}
		var mydate = new Date();
		myjetzt = mydate.getTime()/1000;
		myjetzt = myjetzt -60 ; // Startwerte von einer Minute 
		
		if(typeof jetzt != "undefined"){
			
			for (var property in data) {
				if (data.hasOwnProperty(property)) {
							
					if(property >= jetzt){
						
						count++;
						summe += parseFloat(data[property]);	//Summe, alle Uv indexe addiert
						
					}
				
				}
			}
			//sobald durchschnit sich ändert, Zeit aktualisieren
			if((durchschnitt >= summe/count+0.2) || (durchschnitt <= summe/count-0.2)){		
				aktualisiere();
			}
			durchschnitt = summe/count;
			document.getElementById("aktIndex").innerHTML = "UV-Index: "+ durchschnitt.toFixed(0);
			
		}else{
			for (var property in data) {
				if(property >= myjetzt){
					if (data.hasOwnProperty(property)) {
						
							count++;
							summe += parseFloat(data[property]);	//Summe, alle Uv indexe addiert
							
					}
				}
				
			}
		}
		durchschnitt = summe/count;
		document.getElementById("aktIndex").innerHTML = "UV-Index: "+ durchschnitt.toFixed(0);
	});
}