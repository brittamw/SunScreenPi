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
//Brauchen wir nicht mehr, aber lassen wir mal stehen ;)
function countUp (seconds, target) {
  var element = document.getElementById(target);
	
  var calculateAndShowUp = function () {
  
	
    if (seconds >= 0) {
      var h = Math.floor(seconds / 3600);
      var m = Math.floor((seconds % 3600) / 60);
      var s = seconds % 60;
      element.innerHTML=
        //leadingzero(h) + ':' +
        //leadingzero(m) + ':' +
        //leadingzero(s);
      seconds++;
	  //console.log(seconds);
	  
    } else {
      return false;
    }
  };
 

  var completed = function () {
    element.innerHTML = "<strong>Raus aus der Sonne!<\/strong>";
  };
 //Methode Timer starten (Methode erhalten durch prototypische Erweiterung
  calculateAndShowUp.Timer(1000, Infinity, completed);
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

        display.textContent =  hours + ":"+minutes + ":" + seconds;
		
        if (--timer < 0) {
            display.textContent = "Raus aus der Sonne!";
        }
    }, 1000);
}




function displayZeit() {

	//function sleep(time){
		//return new Promise((resolve)=>setTimeout(resolve, time));
	//}
	interval = setInterval(Countup2, 1000);
	count = 0;
	function Countup2(){		
		count++;
		//console.log(count);
	}
	
	var date = new Date();
	jetzt = date.getTime()/1000;
	console.log(jetzt);
	
	//var uvI = 7; //zum testen ohne Raspi
	uvI = durchschnitt;	
	var hauttyp = document.getElementById("hauttypen");
	var lichtschutz = document.getElementById("lichtschutz");
	var htergebnis = hauttyp.options[hauttyp.selectedIndex].value;
	var lsergebnis = lichtschutz.options[lichtschutz.selectedIndex].value;
	var summe = ((htergebnis * 8)/(uvI) * lsergebnis) *60//formel für berechnung mit UV Index, zeit in sekunden
		
	new countdown(summe.toFixed(0), 'counter1'); //Zeit, die man in der Sonne bleiben darf, solange UVI "recht" konstant bleibt
	
}

//Wenn durchschnitt sich ändert, aktualisieren aufrufen, neuer countdowm - bereits abgelaufene Zeit --> noch verbleibende Zeit
//Wo aktualisiere() aufrufen??
function aktualisiere(){
	
	//var uvI = 7;
	var uvI = durchschnitt;	
	var hauttyp = document.getElementById("hauttypen");
	var lichtschutz = document.getElementById("lichtschutz");
	var htergebnis = hauttyp.options[hauttyp.selectedIndex].value;
	var lsergebnis = lichtschutz.options[lichtschutz.selectedIndex].value;
		
	var summe = ((htergebnis * 8)/(uvI) * lsergebnis) *60		//Zeit in Sekunden
	
	document.getElementById("counter1").innerHTML = "";
	display = document.querySelector('#counter2');
	startTimer((summe-count).toFixed(0), display);
	
	
}

	
//Quelle:https://wiki.selfhtml.org/wiki/JavaScript/Anwendung_und_Praxis/komfortable_Timer-Funktion
