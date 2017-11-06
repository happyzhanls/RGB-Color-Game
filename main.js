var iSquares = 6;
var aColors = [];
var colorPicked;

$(document).ready(function() {
	// reset!
	fnReset();
	// setup mode buttons
	$(".modeBtn").on("click", function() {
		// remove .selected before adding
		$(".modeBtn").removeClass("selected");
		// add .selected
		$(this).addClass("selected");
		$(this).text() === "easy" ? iSquares = 3 : iSquares = 6;
		fnReset();
	});
	// setup squares
	$(".squares").on("click", function() {
		var colorClicked = $(this).css("background-color");
		if(colorClicked === colorPicked) {
			// message displayed
			$("#messageDisplay").text("You win!");
			$("#resetBtn").text("Play again?");
			// animate the color of squares to the same
			$(".squares").removeClass("myAnimated wobble");
			$(".squares").addClass("myAnimated tada");
			$(".squares, h1").css("background-color", colorPicked);
		} else {
			$("#messageDisplay").text("Try again?");
			// animate the color of the colorClicked back to the color of body
			$(this).addClass("myAnimated wobble");
			$(this).css("background-color", "#232323");
		}
	});
	// setup resetBtn button
	$("#resetBtn").on("click", fnReset);
});

// Randomly generate a rgb color array with its length being "num", where num is an positive integer.
function generateRandomColors(num) {
   	// make a return array called "arr"
   	var arr = [];
   	// repeat num times
   	for(var i = 0; i < num; i++) {
      	// generate random color and push them into arr
      	arr.push(randomColor());
   	}
   	// return arr
   	return arr;
}

// Randomly generate a color string in a rgb format like "rgb(2, 22, 222)".
function randomColor() {
	// pick a "red" integer from 0 to 255.
	var r = Math.floor(Math.random() * 256);
	// pick a "green" integer from 0 to 255.
	var g = Math.floor(Math.random() * 256);
	// pick a "blue" integer from 0 to 255.
	var b = Math.floor(Math.random() * 256);
	return "rgb(" + r + ", " + g + ", " + b + ")";
}

// Randomly pick a rgb color.
function pickColor() {
	var random = Math.floor(Math.random() * aColors.length);
	return aColors[random];
}

// Yet a function that implements the resetBtn functionality.
function fnReset() {
	// 1. generate random colors again
	aColors = generateRandomColors(iSquares);
	// 2. pick a random color
	colorPicked = pickColor();
	// 3. resetBtn the colorDisplay to be colorPicked
	$("#colorDisplay").text(colorPicked);
	// 4. resetBtn the $("#messageDisplay") to be ""
	$("#messageDisplay").text("");
	// 5. resetBtn different background colors according to iSquares
  	$(".squares").each(function(index) {
  		if(aColors[index]) {
  			$(this).css("background-color", aColors[index]);
  			$(this).show("fast", "linear", function() {
  				$(this).removeClass("myAnimated wobble tada");
  			});
  		} else {
  			$(this).hide("fast", "linear", function() {
  				$(this).removeClass("myAnimated wobble tada");
  			});
  		}
  	});
	// 6. resetBtn the $("h1") background color
  	$("h1").css("background-color", "steelblue");
	// 7. change the resetButton back to "New Colors"
	$("#resetBtn").text("New Colors");
}
