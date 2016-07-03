
function displayZeit(){
	
	var date = new Date();
	jetzt = date.getTime()/1000;
	console.log(jetzt);
	durchschnittCalc = 7;
	var uvI = durchschnittCalc;			//Wert aus Durchschnitt in uvi schreiben
	
	//uvI = 8; // 8 als Wert für einen Sommertag ohne Wolken mittags in Mitteleuropa, für Demonstration ohne Sensor
	var hauttyp = document.getElementById("hauttypen");
	var lichtschutz = document.getElementById("lichtschutz");
	var htergebnis = hauttyp.options[hauttyp.selectedIndex].value;
	var lsergebnis = lichtschutz.options[lichtschutz.selectedIndex].value;
	
	//var summe = ((htergebnis * 8)/ uvI) * lsergebnis; formel für berechnung mit UV Index
	//var secunden = htergebnis  * lsergebnis * 60;
	
	document.getElementById("berechne").addEventListener("click", displayZeit);
	var remainingTime = ((htergebnis * 8)/(uvI) * lsergebnis) *60;

	startTimer(remainingTime, display);display = document.querySelector('#time');
	console.log(remainingTime);
	
	
	
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
		
        if (--timer < 0) {
            display.textContent = "Raus aus der Sonne!";
        }
    }, 1000);
}

	