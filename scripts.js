var player = {results:[0,0,0],games:[0,0],name};//skeleton for player object

var initString = JSON.stringify(player);//{"results":[0,0,0],"games":[0,0],"name":""}
localStorage.setItem("user",initString);
localStorage.setItem("computer",initString);//defines initial computer locally

//document.getElementById("show_rules_button").addEventListener("click", function () {//switch to rules page});
//makeToggable(document.getElementById("show_rules_button"), document.getElementById("rules"));//connects button to show rules to rules div
document.getElementById("show_stats_button").addEventListener("click", function () {
	statsPageUpdate();
	//switch to stats page
});
//makeToggable(document.getElementById("show_stats_button"), document.getElementById("stats"));//connects button to show stats to stats div

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

function updateStats (user,computer) {
	user.games[1]++;//user adds a game to register
	computer.games[1]++;//computer adds a game to register
	
	localStorage.setItem("user",JSON.stringify(user));//updates user object in local storage
	localStorage.setItem("computer",JSON.stringify(computer));//updates computer object in local storage

	console.log("User in local storage update: ",localStorage.getItem("user"));
	console.log("Computer in local storage update:",localStorage.getItem("computer"));

	showOrNot(document.getElementById("weapon_not_entered_feedback_text"),false);
	showOrNot(document.getElementById("play_move"),false);
	showOrNot(document.getElementById("player_choice"),false);
	showOrNot(document.getElementById("play_again"),true);
	showOrNot(document.getElementById("game_results"),true);
	showOrNot(document.getElementById("show_stats_button"),true);
	showOrNot(document.getElementById("play_weapon_message"),false);
}

function statsPageUpdate () {
	var user = JSON.parse(localStorage.getItem("user"));
	var computer = JSON.parse(localStorage.getItem("computer"));

	var sum = user.games[1];
	if (sum != computer.games[1]) console.log("The user and computer objects don't have the same number of games played, this is an error messgae that should not ever come up");
	document.getElementById("total_games_played").innerHTML = sum;
	document.getElementById("total_player_wins").innerHTML = user.games[0];
	var ratio = parseInt(100*user.games[0]/sum);
	var outputRatio = ratio+"%";
	document.getElementById("winning_percentage").innerHTML = outputRatio;//if this funciton is called, a game has been played, cannot be zero
	var p0 = parseInt(100*user.results[0]/sum);
	var p1 = parseInt(100*user.results[1]/sum);
	var p2 = parseInt(100*user.results[2]/sum);
	var o0 = parseInt(100*computer.results[0]/sum);
	var o1 = parseInt(100*computer.results[1]/sum);
	var o2 = parseInt(100*computer.results[2]/sum);

	

	p0 = p0 + "%";
	p1 = p1 + "%";
	p2 = p2 + "%";
	o0 = o0 + "%";
	o1 = o1 + "%";
	o2 = o2 + "%";

	document.getElementById("your_paper_stats").innerHTML = p0;
	document.getElementById("your_rock_stats").innerHTML = p1;
	document.getElementById("your_scissors_stats").innerHTML = p2;
	document.getElementById("opponent_paper_stats").innerHTML = o0;
	document.getElementById("opponent_rock_stats").innerHTML = o1;
	document.getElementById("opponent_scissors_stats").innerHTML = o2;
}

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