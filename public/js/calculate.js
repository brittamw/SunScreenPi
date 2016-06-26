
function displayZeit(){
	var socket = io.connect();
	
	socket.on("SunScreenPi", function(data){
		
	var uvI = data;
	
	var hauttyp = document.getElementById("hauttypen");
	var lichtschutz = document.getElementById("lichtschutz");
	var htergebnis = hauttyp.options[hauttyp.selectedIndex].value;
	var lsergebnis = lichtschutz.options[lichtschutz.selectedIndex].value;
	
	//var summe = ((htergebnis * 8)/ uvI) * lsergebnis; formel für berechnung mit UV Index
	//var secunden = htergebnis  * lsergebnis * 60;
	
	document.getElementById("berechne").addEventListener("click", displayZeit);
	var remainingTime = ((htergebnis * 8)/(uvI) * lsergebnis) *60, display = document.querySelector('#time');
	startTimer(remainingTime, display);

	});
	//var uvI = 8; // 8 als Wert für einen Sommertag ohne Wolken mittags in Mitteleuropa, für Demonstration ohne Sensor
	
}
function startTimer(duration, display) {
    var timer = duration, hours, minutes, seconds;
    setInterval(function () {
		
		hours = parseInt((timer/60/60)%24, 10);
        minutes = parseInt((timer / 60)%60, 10);
        seconds = parseInt(timer % 60, 10);
		
		//braucht man leading zero?
		hours = hours < 10 ? "0" + hours : hours;
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = "Du darfst " + hours + ":"+minutes + ":" + seconds + " Stunden in der Sonne bleiben";
		console.log("hallo");
        if (--timer < 0) {
            timer = duration;
        }
    }, 1000);
}

	