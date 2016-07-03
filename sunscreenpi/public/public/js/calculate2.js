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
	//ursprünglich übergebene Anzahl der Wiederholungen.
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
	var uvI = durchschnittCalc;
	var hauttyp = document.getElementById("hauttypen");
	var lichtschutz = document.getElementById("lichtschutz");
	var htergebnis = hauttyp.options[hauttyp.selectedIndex].value;
	var lsergebnis = lichtschutz.options[lichtschutz.selectedIndex].value;
	
	var summe = ((htergebnis * 8)/(uvI) * lsergebnis) *60//formel für berechnung mit UV Index, zeit in sekunden
	
	new countdown(summe.toFixed(0), 'counter1');
	document.getElementById("berechne").addEventListener("click", displayZeit);
	
		
};
		
		var c = 0;
		var t;
		var timer_is_on = 0;

		function timedCount() {
			document.getElementById("counter2").value = c;
			c = c + 1;
			t = setTimeout(function(){ timedCount() }, 1000);
		}

		function startCount() {
			if (!timer_is_on) {
				timer_is_on = 1;
				timedCount();
			}
		}

		function stopCount() {
			clearTimeout(t);
			timer_is_on = 0;
		}
		
//Quelle:https://wiki.selfhtml.org/wiki/JavaScript/Anwendung_und_Praxis/komfortable_Timer-Funktion