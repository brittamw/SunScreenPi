//Helferfunktion um mehrere countdowns gleichzeitig laufen lassen zu können

//Methode als Unterobjekt der Funktion
Function.prototype.Timer = function (interval, calls, onend) { //Zeit zwischen Aufrufen, Anzahl der Aufrufe, funktion die am ende der wdh gesratet wird
	//Zähler
	var count = 0;
	//Referenz auf funktion, damit später Zugriff möglich
	var payloadFunction = this;
	
	//startzeit
	var startTime = new Date();
	
	//wird aufgerufen während timer läuft
	//startet payloadfunction, übergabe startzeit und count
	var callbackFunction = function () {
		return payloadFunction(startTime, count);
	};
	
	//wird am ende aufgerufen
	//kapselt die als Parameter entgegen genommene onend-Funktion 
	//und übergibt ihr den Startzeitpunkt, tatsächliche Anzahl der Wiederholungen 
	//sowie die ursprünglich übergebene Anzahl der Wiederholungen.
	var endFunction = function () {
		if (onend) {
			onend(startTime, count, calls);
		}
	};
	
	//zählt, führt callback und sich selbst aus, falls noch nicht bis 0 gezählt wurde
	//callback noch nicht false
	//falls Bei null angekommen-->endfunction
	var timerFunction = function () {
		count++;
		if (count < calls && callbackFunction() != false) {
			window.setTimeout(timerFunction, interval);
		} else {
			endFunction();
		}
	};
	timerFunction();
};

//voranstehende Nullen?
function leadingzero (number) {
    return (number < 10) ? '0' + number : number;
}

//Parameter Sekundenzahl von der gezählt werden soll
//parameter target: string mit ID, wo CD angezeigt wird
function countdown (seconds, target) {
  var element = document.getElementById(target);
 
  var calculateAndShow = function () {
  
	//solange seconds noch nicht null, schreibt sekundenwert ins element
    if (seconds >= 0) {
      var h = Math.floor(seconds / 3600);
      var m = Math.floor((seconds % 3600) / 60);
      var s = seconds % 60;
      element.innerHTML=
        leadingzero(h) + ':' +
        leadingzero(m) + ':' +
        leadingzero(s);
      seconds--;
    } else {
      return false;
    }
  };
 
  var completed = function () {
    element.innerHTML = "<strong>Raus aus der Sonne!<\/strong>";
  };
 //Methode Timer starten (Methode erhalten durch prototypische Erweiterung
  calculateAndShow.Timer(1000, Infinity, completed);
}
function displayZeit() {
	
	var hauttyp = document.getElementById("hauttypen");
	var lichtschutz = document.getElementById("lichtschutz");
	var htergebnis = hauttyp.options[hauttyp.selectedIndex].value;
	var lsergebnis = lichtschutz.options[lichtschutz.selectedIndex].value;
	var uvI = 5;
	var summe = ((htergebnis * 8)/ uvI) * lsergebnis *60; //formel für berechnung mit UV Index, zeit in sekunden
	
	new countdown(summe, 'counter1');
	document.getElementById("berechne").addEventListener("click", displayZeit);
};

//Quelle:https://wiki.selfhtml.org/wiki/JavaScript/Anwendung_und_Praxis/komfortable_Timer-Funktion
