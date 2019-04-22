localStorage.setItem("a",1);
localStorage.setItem("b",1);
//two integers which guide the animation
localStorage.setItem("step",0);
//keeps track of step of Euclid's algorithm the program is printing
localStorage.setItem("gcd",1);
//once calculated within program stores GCD to tile entire board
localStorage.setItem("tile_color","#000000");
//saves color of square that tiles rectangle

var c = document.getElementById("canvas");
var canvas = c.getContext("2d");
var canvasHeight = 400;
//canvas animation parameters

var tiled = false;
//keeps track of whether a canvas it tiled already or not

document.getElementById("enter_numbers_button").addEventListener("click", function(){
	var a = Number(document.getElementById("enter_a_input").value);
	var b = Number(document.getElementById("enter_b_input").value);
	//fetches values from local storage
	console.log("Input given: a="+a);
	console.log("Input given: b="+b);
	//logs inputs from page
	if (Number.isInteger(a)&&Number.isInteger(b)&&a>0&&b>0) {//ensures both inputs are positive integers
		if (a >= b) {//ensures b is not larger than a
			showOrNot(document.getElementById("invalid_argument_message"),false);
			console.log("Valid inputs of "+a+" and "+b);//console feedback
			showOrNot(document.getElementById("enter_numbers"),false);
			showOrNot(document.getElementById("animation_div"),true);
			document.getElementById("a").innerHTML = a;
			document.getElementById("b").innerHTML = b;
			localStorage.setItem("a",a);
			localStorage.setItem("b",b);
			localStorage.setItem("step",0);
			canvasSetUp(a,b);
		} else {//b > a error message
			showOrNot(document.getElementById("invalid_argument_message"),true);
			document.getElementById("invalid_argument_message").innerHTML = "Error, invalid arguments, \"a\" must be greater than or equal to \"b\".";
			console.log("Invalid inputs");
		}
	} else {//invalid input error message
		showOrNot(document.getElementById("invalid_argument_message"),true);
		document.getElementById("invalid_argument_message").innerHTML = "Error, invalid arguments, ensure both entries are positive integers.";
		console.log("Invalid inputs");
	}
});
//executed once numbers are submitted by the users

document.getElementById("next_button").addEventListener("click", function(){
	showOrNot(document.getElementById("back_button"),true);
	//allows user to go back a step
	var n = Number(localStorage.getItem("step"))+1;
	console.log("Next step:"+n);
	printSquares(n);
	//updates animation by one step
	localStorage.setItem("step",n);
	//updates local storage to reflect the current step of the program
});

document.getElementById("back_button").addEventListener("click", function(){
	showOrNot(document.getElementById("next_button"),true);
	//allows user to go forward a step
	showOrNot(document.getElementById("tile_button"),false);
	//if going back from any step tiling is not possible
	var a = Number(localStorage.getItem("a"));
	var b = Number(localStorage.getItem("b"));
	//fetches user-inputted integers for clearing the canvas
	canvas.clearRect(0,0,canvasHeight*b/a,canvasHeight);
	//canvas cleared
	var n = Number(localStorage.getItem("step"))-1;
	console.log("Back step:"+n);
	printSquares(n);
	//updates animation down a step
	localStorage.setItem("step",n);
	//updates local storage to reflect the current step of the program
});

document.getElementById("tile_button").addEventListener("click", function () {
	if (tiled==true) {
		var n = Number(localStorage.getItem("step"));
		printSquares(n);
		//reanimated at current last step
		showOrNot(document.getElementById("back_button"),true);
		document.getElementById("tile_button").innerHTML = "Tile";
		//resets button to match untiled state
	} else {
		var a = Number(localStorage.getItem("a"));
		var b = Number(localStorage.getItem("b"));
		var gcd = Number(localStorage.getItem("gcd"));
		var color = localStorage.getItem("tile_color");
		//fetches values from local storage to calculate canvas and tile dimensions
		canvas.beginPath();
		for (var i = 0; i < a; i += gcd) {
			for (var j = 0; j < b; j += gcd) {
				canvas.rect(canvasHeight*j/a,canvasHeight*i/a,canvasHeight*gcd/a,canvasHeight*gcd/a);
			}
		}
		canvas.globalAlpha = 0.4;
		canvas.fillStyle = color;
		//makes squares semi-transparent with the last used-color, degree of transparency can be altered
		canvas.fill();
		canvas.stroke();
		//tiles canvas and updates it
		canvas.globalAlpha = 1;
		//sets transparency back to one, do not change
		showOrNot(document.getElementById("back_button"),false);
		document.getElementById("tile_button").innerHTML = "Untile";
		//resets buttons to match tiled state
	}
	tiled = !tiled;
	//clicking button changes current state
});

function canvasSetUp () {
	var a = Number(localStorage.getItem("a"));
	var b = Number(localStorage.getItem("b"));
	var maxLength = 400;
	showOrNot(c,true);
	c.width=canvasHeight*b/a;
	c.height=canvasHeight;
}
//sets up the canvas with predetermined height and user-determined width (taller than wide)

function printSquares (n) {
	var a = Number(localStorage.getItem("a"));
	var b = Number(localStorage.getItem("b"));
	//fetches values from local storage
	var tempA = a;
	var tempB = b;
	//creates shallow copies of values to run the algorithm but have actual values for later reference
	if (n==0) {
		showOrNot(document.getElementById("back_button"),false);
	}
	//cannot animate negative numbers so hides button to go back a step
	for (var i = 0; i < n; i ++) {
		showOrNot(document.getElementById("back_button"),true);
		//following the previous few lines, will only run if n > 0
		console.log("Step:"+n+"\nLoop:"+i+"\nTemporaryA:"+tempA+"\nTemporaryB:"+tempB);
		//logs loop information
		canvas.beginPath();
		var j = 0;
		while (tempB*(j+1)<=tempA) {
			if (i%2==0) {
				canvas.rect(canvasHeight*(b-tempB)/a,canvasHeight*(tempB*j+a-tempA)/a,canvasHeight*tempB/a,canvasHeight*tempB/a);
			} else {
				canvas.rect(canvasHeight*(tempB*j+b-tempA)/a,canvasHeight*(a-tempB)/a,canvasHeight*tempB/a,canvasHeight*tempB/a);
			}
			j++;
		}
		console.log("Squares:"+j);
		//logs the number of squares drawn on the canvas
		if (i%6==0) {
			canvas.fillStyle = "#ff0000";
		} else if (i%6==1) {
			canvas.fillStyle = "#00ff00";
		} else if (i%6==2) {
			canvas.fillStyle = "#0000ff";
		} else if (i%6==3) {
			canvas.fillStyle = "#ffff00";
		} else if (i%6==4) {
			canvas.fillStyle = "#00ffff";
		} else {
			canvas.fillStyle = "#ff00ff";
		}
		//colors for tiling squares cycle through these six values
		var placeholder = tempB;
		tempB = tempA - (j)*tempB;
		tempA = placeholder;
		//runs the algorithm with copy values
		console.log("Temporary values just adjusted, a="+tempA+" and b="+tempB);
		//logs result of algorithm step
		canvas.fill();
		canvas.stroke();
	}
	//draws all sets of squares requested by the parameters
	if (tempB==0) {
		showOrNot(document.getElementById("next_button"),false);
		//if algorithm is terminated, no next value is relevant
		localStorage.setItem("gcd",tempA);
		console.log("gcd:"+tempA);
		//stores and logs calculated GCD
		showOrNot(document.getElementById("tile_button"),true);
		//makes tiling available to user
		localStorage.setItem("tile_color",canvas.fillStyle);
		//saves tile color in local storage for tiling function
	}
	//checks if algorithm has reached termination
}

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
		//console.log(div_element.id+" button toggled in makeToggable() function");//console feedback that button was toggled
	});//adds function
}//makes a button able to toggle visibility for a div