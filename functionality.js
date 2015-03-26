//Goal: Make a game where the player wants to achieve a larger circle each round

//Get and define global elements
var currentCircle = document.getElementById("currentCircle"),
	permanentCircle = document.getElementById("permanentCircle"),
	timerHTML = document.getElementById("timer"),
	maxCircle = 100,
	timer = 0;

//Define length of game round
var roundTimer = function (z) {
	timer = z;
	//End round after set duration
	setTimeout(function () {
		clearInterval(countdown);
		endRound(currentCircle);
	}, timer + 300);
	//Set countdown
	var countdown = setInterval(function () {
		timerHTML.innerHTML = "Remaining time: " + (timer ) / 1000 + " seconds";
		timer -= 100;
	}, 100);
};

var growCircle = function () {
	//Set circle's size by current size + 2px and center it
	var increaseSize = function (circle) {
		var currentWidth = circle.offsetWidth,
			currentHeight = currentWidth,
			currentTop = parseInt(circle.style.marginTop.replace("-", ""), 10),
			currentLeft = parseInt(circle.style.marginLeft.replace("-", ""), 10),
			newWidth = currentWidth + 2 + "px",
			newHeight = currentHeight + 2 + "px",
			newTop = "-" + (currentTop + 1) + "px",
			newLeft = "-" + (currentLeft + 1) + "px";
		circle.style.width = newWidth; //Set new width
		circle.style.height = newHeight; //Set new height
		circle.style.marginTop = newTop; //Set new top
		circle.style.marginLeft = newLeft; //Set new left
		//Set highscore
		if (currentWidth > maxCircle) {
			maxCircle = currentWidth;
		}
	};
	//Increase currentCircle size
	increaseSize(currentCircle);
};

//End round
var endRound = function (circle) {
	//Set permanentCircle to largest circle size for reference
	var maxWidth = circle.style.width,
		maxHeight = maxWidth,
		marginTop = circle.style.marginTop,
		marginLeft = circle.style.marginLeft;
	// If current radius is larger than before ones set permanentCircle to new size
	if (parseInt(maxWidth, 10) > maxCircle) {
		permanentCircle.style.width = maxWidth;
		permanentCircle.style.height = maxHeight;
		permanentCircle.style.marginTop = marginTop;
		permanentCircle.style.marginLeft = marginLeft;
	}
	//Set currentCircle radius and position to default
	currentCircle.style.width = "20px";
	currentCircle.style.height = "20px";
	currentCircle.style.marginTop = "-10px";
	currentCircle.style.marginLeft = "-10px";
};

//Player interaction
document.addEventListener("keyup", function (e) {
	if(e.keyCode == 32) {
		growCircle();
		if (timer === 0) {
			roundTimer(10000);
		}
	}
});

//Set initial timer html
window.onload = function () {
	timerHTML.innerHTML = "Remaining time: " + (timer + 10000) / 1000 + " seconds";
};