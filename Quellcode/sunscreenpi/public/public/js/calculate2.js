
var actualTimer;

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
	
	var shouldTimerRun=true;
	
	//wird am ende aufgerufen
	//kapselt die als Parameter entgegen genommene onend-Funktion 
	//und übergibt ihr den Startzeitpunkt, Anzahl der Wiederholungen 
	//ursprünglich übergebene Anzahl der Wiederholungen.
	var endFunction = function () {
		if (onend) {
			onend(startTime, count, calls);
		}
	};
	
	//shouldTimerRun false setzen, wenn endTimer aufgerufen
	this.endTimer = function() {
		shouldTimerRun=false;
	
	}
	
	//zählt, führt callback und sich selbst aus, falls noch nicht bis 0 gezählt wurde
	//callback noch nicht false
	//falls Bei null angekommen-->endfunction und edit: und solange shouldTimerRun true
	var timerFunction = function () {
		count++;
		if(shouldTimerRun) {
			if (count < calls && callbackFunction() != false) {
			window.setTimeout(timerFunction, interval);
			} else {
				endFunction();
			}
		
		}
		
	};
	timerFunction();
	
	return this;
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
	playSound();
  };
	//alten Timer löschen wenn neuer Timer erstellt wird
  if(actualTimer) {
	actualTimer.endTimer()
  }
  //Methode Timer starten (Methode erhalten durch prototypische Erweiterung
  actualTimer = calculateAndShow.Timer(1000, Infinity, completed);
  
}

function playSound(){
    var snd = new Audio('');

    if(snd.canPlayType('audio/mp3')){
        snd = new Audio('sirene.mp3');
    }

    snd.play();
}



function displayZeit() {

	//sekunden die seit "Zeit berechnen" Button gedrückt wurde vergangen sind
	interval = setInterval(Countup2, 1000);
	count = 0;
	function Countup2(){		
		count++;
	}
	
	//Timestamp
	var date = new Date();
	jetzt = date.getTime()/1000;
	
	//uvI = 7; zum testen ohne Raspi
	
	//gobale variable durschnitt und uvI um sie in beiden dateien zu verwenden
	uvI = durchschnitt;	
	var hauttyp = document.getElementById("hauttypen");
	var lichtschutz = document.getElementById("lichtschutz");
	var htergebnis = hauttyp.options[hauttyp.selectedIndex].value;
	var lsergebnis = lichtschutz.options[lichtschutz.selectedIndex].value;
	var summe = ((htergebnis * 8)/(uvI) * lsergebnis) *60//formel für berechnung mit UV Index, zeit in sekunden
		
	countdown(summe.toFixed(0), 'counter1'); //Zeit, die man in der Sonne bleiben darf
	
}

//Wenn durchschnitt sich ändert, aktualisieren aufrufen, neuer countdowm - bereits abgelaufene Zeit --> noch verbleibende Zeit
function aktualisiere(){
	
	//var uvI = 7;
	var uvI = durchschnitt;	
	var hauttyp = document.getElementById("hauttypen");
	var lichtschutz = document.getElementById("lichtschutz");
	var htergebnis = hauttyp.options[hauttyp.selectedIndex].value;
	var lsergebnis = lichtschutz.options[lichtschutz.selectedIndex].value;
		
	var summe = ((htergebnis * 8)/(uvI) * lsergebnis) *60		//Zeit in Sekunden

	countdown((summe-count).toFixed(0), "counter1");			//count --> bereits abgelaufene Zeit vor der Aktualisierung
	
}

//Quellenangabe für prototypische Erweiterung eines Timers:
//https://wiki.selfhtml.org/wiki/JavaScript/Anwendung_und_Praxis/komfortable_Timer-Funktion
