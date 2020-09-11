// Problems - Game got stuck after playing the game for 6 times.

var numberSquares = 6; //default value is set to 6
var colors = [];
var pickedColor;
var squares = document.querySelectorAll(".square");
var colorDisplay = document.getElementById("colorDisplay");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetBtn = document.querySelector("#reset");

//buttons used to change difficulty
var easyBtn = document.querySelector("#easy");
var medBtn = document.querySelector("#med");
var hardBtn = document.querySelector("#hard");

init();

function init(){
	console.log("test");
	setupSquares();
	reset();

	//add events to difficulty buttons.
	easyBtn.addEventListener("click", function() {
		updateButtonColor('easy','med','hard');
		numberSquares = 3;
		setupSquares();
		reset();
	});
	medBtn.addEventListener("click", function() {
		updateButtonColor('med','easy','hard');
		numberSquares = 6;
		setupSquares();
		reset();
	});
	hardBtn.addEventListener("click", function() {
		updateButtonColor('hard','easy','med');
		numberSquares = 9;
		setupSquares();
		reset();
	});
	resetBtn.addEventListener("click", function() {
		setupSquares();
		reset();
	});
}

//if one mode is selected, the color of the button should be changed
function updateButtonColor(button1,button2,button3){
	document.getElementById(button1).className = 'mode selected';
	document.getElementById(button2).className = 'mode';
	document.getElementById(button3).className = 'mode';
}

function setupSquares() {
	for (var i = 0; i < squares.length; i ++) {
		// add click listeners
		squares[i].addEventListener("click", function() {
			var clickedColor = this.style.background;
			// compare color to pickedColor
			if(clickedColor === pickedColor) {
				messageDisplay.textContent = "Correct!";
				resetBtn.textContent = "Play Again?";
				//add event to reset button
				//resetBtn.addEventListener("click", function() {
				//	setupSquares();
				//	reset();
				//});
				changeColors(clickedColor);
				h1.style.background = clickedColor;
			} else {
				this.style.background = "#232323";
				messageDisplay.textContent = "Try Again"
			}
		});
	}
}

function reset() {
	// new colors
	colors = generateRandomColors(numberSquares);
	// a new random color
	pickedColor = pickColor();
	// change colorDisplay to match picked color
	colorDisplay.textContent = pickedColor;
	resetBtn.textContent = "New Colors";
	//add event to reset button
	//resetBtn.addEventListener("click", function() {
	//	setupSquares();
	//	reset();
	//});
	messageDisplay.textContent = "";
	// change color of squares
	for (var i = 0; i < squares.length; i ++) {
		if (colors[i]) {
			squares[i].style.display = "block";
			squares[i].style.background = colors[i];
		} else {
			squares[i].style.display = "none";
		}
	}
	h1.style.background = "steelblue";
}

function changeColors(color) {
	// loop through all the squares
	for (var i = 0; i < squares.length; i ++) {
		// change each color to match the given color
		squares[i].style.background = color;
	}
}

function pickColor() {
	var random = Math.floor(Math.random() * colors.length);
	return colors[random];
}

function generateRandomColors(num) {
	// make an array
	var arr = [];
	// repeat num times
	for(var i = 0; i < num; i ++) {
		arr.push(randomColor())
	}
	return arr;
}

function randomColor() {
	// pick a "R" from  0 - 255
	var r =  Math.floor(Math.random() * 256);
	// pick a "G" from  0 - 255
	var g =  Math.floor(Math.random() * 256);
	// pick a "B" from  0 - 255
	var b =  Math.floor(Math.random() * 256);
	return "rgb(" + r + ", " + g + ", " + b + ")";
}
