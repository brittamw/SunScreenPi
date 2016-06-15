

function displayZeit(){
	/*var socket = io.connect();
	
	socket.on("SunScreenPi", function(data){
		
	var uvI = data;
		
	});*/
	var uvI = 9;
	
	var hauttyp = document.getElementById("hauttypen");
	var lichtschutz = document.getElementById("lichtschutz");
	var htergebnis = hauttyp.options[hauttyp.selectedIndex].value;
	var lsergebnis = lichtschutz.options[lichtschutz.selectedIndex].value;


	
	
	//var summe = ((htergebnis * 8)/ uvI) * lsergebnis; formel für berechnung mit UV Index
	//var secunden = htergebnis  * lsergebnis * 60;
	
	var secunden = ((htergebnis * 8)/(uvI) * lsergebnis) * 60;
	var minute = Math.floor(secunden/60);
	secunden %= 60;
	var hour = Math.floor(minute/60);
	minute %= 60;

	document.getElementById("berechne").addEventListener("click", displayZeit);
	document.getElementById("zeit").innerHTML = "Du darfst "+ hour + " Stunden " + minute + "Minuten" + secunden +"Sekunden in der Sonne sein";

	
	
	
}
/*function startTimer(duration, display) {
    var timer = duration, minutes, seconds;
    setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if (--timer < 0) {
            timer = duration;
        }
    }, 1000);
}

	window.onload = function () {
		var fiveMinutes = 6*60, display = document.querySelector('#time');
		startTimer(fiveMinutes, display);
		
};*/