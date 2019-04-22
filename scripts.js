localStorage.setItem("a",1);
localStorage.setItem("b",1);//defines initial computer locally

document.getElementById("close_feedback_button").addEventListener("click", function() {
	showOrNot(document.getElementById("feedback"),false);
	showOrNot(document.getElementById("name_entered_feedback_text"),false);
	showOrNot(document.getElementById("nothing_entered_feedback_text"),false);
	showOrNot(document.getElementById("weapon_not_entered_feedback_text"),false);
});//toggles closing feedback div

document.getElementById("enter_name_button").addEventListener("click", function(){
	var user = JSON.parse(localStorage.getItem("user"));
	var computer = JSON.parse(localStorage.getItem("computer"));
	computer.name = "computer";
	var p_name=document.getElementById("enter_name_input").value;//fetches typed in name
	showOrNot(document.getElementById("feedback"),true);//makes feedback div visible regardless of specific feedback
	if ((p_name.length==0)||!(p_name)) {//no name or null length given
		console.log("No player name accepted");//console feedback
		showOrNot(document.getElementById("enter_name"),true);
		showOrNot(document.getElementById("nothing_entered_feedback_text"),true);
	} else {
		user.name = p_name;
		console.log("Player name accepted");//console feedback
		showOrNot(document.getElementById("enter_name"),false);//name now entered, entering name not relevant
		showOrNot(document.getElementById("throw_choice"),true);//gives player options for which weapon to select
		showOrNot(document.getElementById("name_entered_feedback_text"),true);//gives feedback that username successfully received
		showOrNot(document.getElementById("nothing_entered_feedback_text"),false);//deletes feedback of an invalid username
		document.getElementById("name").innerHTML = p_name;//first instance of using username in HTML
		document.getElementById("name2").innerHTML = p_name;//second instance of using username in HTML
		showOrNot(document.getElementById("show_rules_button"),true);//rules now available since they are relevant
	}
	localStorage.setItem("user",JSON.stringify(user));
	localStorage.setItem("computer",JSON.stringify(computer));
});//adds an anonymous function as an event lister to add the name

function randomChoice (choices) {
	return choices*Math.random();
}//returns a random integer given a number of choices

document.getElementById("play_move").addEventListener("click", function () {
	var user = JSON.parse(localStorage.getItem("user"));
	var computer = JSON.parse(localStorage.getItem("computer"));

	var choice = document.getElementById("player_choice").value;//takes user choice div status as input
	var opponentChoice = randomChoice(2);//determines opponent move
	if (choice=="paper") {
		document.getElementById("your_image").src="images/Paper.jpg";
		console.log("Paper played");
		//accesses user paper image and sets corresponding value for corresponding div
		user.results[0]++;
		if(opponentChoice < 1) {
			console.log("Opponent played rock");
			document.getElementById("opponent_image").src="images/Rock2.jpg";
			computer.results[1]++;
			user.games[0]++;//you get win
			var output = "You played paper and your opponent played rock. Since paper beats rock, you win!";
			document.getElementById("game_summary").innerHTML = output;
		} else {
			console.log("Opponent played scissors");
			document.getElementById("opponent_image").src="images/Scissors2.jpg";
			computer.results[2]++;
			computer.games[0]++;//opponent gets win
			var output = "You played paper and your opponent played scissors. Since scissors beats paper, you lost!";
			document.getElementById("game_summary").innerHTML = output;
		}
		updateStats(user,computer);
	} else if (choice=="rock") {
		document.getElementById("your_image").src="images/Rock.jpg";
		console.log("Rock played");
		//accesses user rock image and sets corresponding value for corresponding div
		user.results[1]++;
		if(opponentChoice < 1) {
			console.log("Opponent played paper");
			document.getElementById("opponent_image").src="images/Paper2.jpg";
			computer.results[0]++;
			computer.games[0]++;//opponent gets win
			var output = "You played rock and your opponent played paper. Since paper beats rock, you lost!";
			document.getElementById("game_summary").innerHTML = output;
		} else {
			console.log("Opponent played scissors");
			document.getElementById("opponent_image").src="images/Scissors2.jpg";
			computer.results[2]++;
			user.games[0]++;//you get win
			var output = "You played rock and your opponent played scissors. Since rock beats scissors, you win!";
			document.getElementById("game_summary").innerHTML = output;
		}
		updateStats(user,computer);
	} else if (choice=="scissors") {
		document.getElementById("your_image").src="images/Scissors.png";
		console.log("Scissors played");
		//accesses user scissors image and sets corresponding value for corresponding div
		user.results[2]++;
		if(opponentChoice < 1) {
			console.log("Opponent played paper");
			document.getElementById("opponent_image").src="images/Paper2.jpg";
			computer.results[0]++;
			user.games[0]++;//you get win
			var output = "You played scissors and your opponent played paper. Since scissors beats paper, you win!";
			document.getElementById("game_summary").innerHTML = output;
		} else {
			console.log("Opponent played rock");
			document.getElementById("opponent_image").src="images/Rock2.jpg";
			computer.results[1]++;
			computer.games[0]++;//opponent gets win
			var output = "You played scissors and your opponent played rock. Since rock beats scissors, you lost!";
			document.getElementById("game_summary").innerHTML = output;
		}
		updateStats(user,computer);
	} else {
		showOrNot(document.getElementById("weapon_not_entered_feedback_text"),true);
		showOrNot(document.getElementById("feedback"),true);
	}
});

function showOrNot (div_element/*name of div*/, show/*boolean as whether or not you want it to be seen*/) {
	if (show && div_element.classList.contains("hidden")) {
	    div_element.classList.remove("hidden");
	    div_element.classList.add("visible");
	} else if (!show && div_element.classList.contains("visible")){
	    div_element.classList.remove("visible");
	    div_element.classList.add("hidden");
	}
}//takes a div and makes it either hidden or visible, depending on preferences

function makeToggable (button_element, div_element){
	button_element.addEventListener("click", function(){
		if (div_element.classList.contains("hidden")){//if one of the properties of the div is "hidden"
			div_element.classList.remove("hidden");//remove "hidden" status
			div_element.classList.add("visible");//insert "visible" status
		}else{//if one of the properties of the div is "visible"
			div_element.classList.remove("visible");//remove the "visible" status
			div_element.classList.add("hidden");//insert the "hidden" status
		}
		console.log(div_element.id+" button toggled in makeToggable() function");//console feedback that button was toggled
	});//adds function
}//makes a button able to toggle visibility for a div

document.getElementById("play_again").addEventListener("click", function(){
	showOrNot(document.getElementById("play_move"),true);
	showOrNot(document.getElementById("player_choice"),true);
	showOrNot(document.getElementById("play_again"),false);
	showOrNot(document.getElementById("play_weapon_message"),true);
	document.getElementById("player_choice").value = "";
});