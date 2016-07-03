
document.getElementById("auswerten").addEventListener("click", displayType);

	
function displayType(){

	var farbe = document.querySelector('input[name = "farbe"]:checked').value;
	var  sommersprossen = document.querySelector('input[name = "sommersprossen"]:checked').value;
	var  gesicht = document.querySelector('input[name = "gesicht"]:checked').value;
	var  zeit = document.querySelector('input[name = "zeit"]:checked').value;
	var  reaktion = document.querySelector('input[name = "reaktion"]:checked').value;
	var  sonnenbrand = document.querySelector('input[name = "sonnenbrand"]:checked').value;
	var  braun = document.querySelector('input[name = "braun"]:checked').value;
	var  entwicklung = document.querySelector('input[name = "entwicklung"]:checked').value;
	var  haarfarbe = document.querySelector('input[name = "haarfarbe"]:checked').value;
	var  augen = document.querySelector('input[name = "augen"]:checked').value;
	
	var summe = parseFloat(farbe) + parseFloat(sommersprossen) + parseFloat(gesicht) + parseFloat(zeit) + parseFloat(reaktion) + parseFloat(sonnenbrand) + parseFloat(braun) + parseFloat(entwicklung)
	+  parseFloat(haarfarbe) + parseFloat(augen);
	
	var typ = summe/10;
	document.getElementById("typ").innerHTML = "Deine Punktzahl: " + typ;
	document.getElementById("expl").innerHTML = "Die Zahl vor dem Komma gibt deinen ungefähren Hauttypen an. Hast du z.B. 2,4 erreicht, ist dein Hauttyp näher an 2 als an 3. Bei einem Ergebnis von 2,8 hingegen tendiert deine Haut mehr zum Hauttyp 3. Falls du zwischen zwei Hauttypen eingeordnet bist, wähle am besten den niedrigeren, um ganz sicher zu gehen.";
	alert("Deine Punktzahl: " + typ +
		" . Die Zahl vor dem Komma gibt deinen ungefähren Hauttypen an. Hast du z.B. 2,4 erreicht, ist dein Hauttyp näher an 2 als an 3. Bei einem Ergebnis von 2,8 hingegen tendiert deine Haut mehr zum Hauttyp 3. Falls du zwischen zwei Hauttypen eingeordnet bist, wähle am besten den niedrigeren, um ganz sicher zu gehen.");
}