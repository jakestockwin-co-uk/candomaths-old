// Treat these as configurable inputs.
// All 'times' aside from animationDuration should be done as a percentage.

var startSpeed = 1;
var endSpeed = 10;
var startSpeedChangeTime = 0.5;
var endSpeedChangeTime = 0.8;
var startRadius = 150;
var endRaduis = 0;
var startRaduisChangeTime = 0.7;
var endRaduisChangeTime = 0.8;
var triggerCanDoMathsTime = 0.75;

var animationDuration = 2500;

// End inputs


startSpeedChangeTime = startSpeedChangeTime * animationDuration;
endSpeedChangeTime = endSpeedChangeTime * animationDuration;
startRaduisChangeTime = startRaduisChangeTime * animationDuration;
endRaduisChangeTime = endRaduisChangeTime * animationDuration;
triggerCanDoMathsTime = triggerCanDoMathsTime * animationDuration;

var r = startRadius;
var speed = startSpeed;
var newSpeed = speed;
var canDoMathsTriggered = false;


var elem1 = $('.coreIdea:nth-of-type(1)');
var elem2 = $('.coreIdea:nth-of-type(2)');
var elem3 = $('.coreIdea:nth-of-type(3)');

function triggerCanDoMathsAnimation () {
	$('.fade-out-1').addClass('animation-triggered');
	$('#coreIdeasText').addClass('animation-triggered');
	canDoMathsTriggered = true;
}

function resetAnimation(){
	setNewSpeed(startSpeed);
	setRadius(startRadius);
	$('.fade-out-1').removeClass('animation-triggered');
	$('#coreIdeasText').removeClass('animation-triggered');
	canDoMathsTriggered = false;
}

function setNewSpeed (input) {
	newSpeed = input;
}

function setRadius (radius) {
	r = radius;
}

var i = 0;
var j=0;

var pause = false;

function pauseAnimation () {
	pause = !pause;
}

setInterval(function() {
	++i;
	++j;
	if (!pause) {
		if (speed !== newSpeed) {
			// The following block of code should prevent the animation jumping when the speed is changed. 
			// Without this, speed increasing completely changes where we are in the cycle. 
			// This ensures that i*speed/1000 is the same as i*newSpeed/1000 (modulo 2)
			// and hence Math.PI * (i*speed/1000) is unchanged (modulo 2*PI)
			var position = (i * speed / 1000) % 2;
			i = Math.floor(position * 1000 / newSpeed);
			speed = newSpeed;
		}
		elem1.css({
			'left': Math.sin(Math.PI * (i * speed / 1000)) * r,
			'top': Math.cos(Math.PI * (i * speed / 1000)) * r
		});
		elem2.css({
			'left': Math.sin(Math.PI * (i * speed / 1000 + 2 / 3)) * r,
			'top': Math.cos(Math.PI * (i * speed / 1000 + 2 / 3)) * r
		});
		elem3.css({
			'left': Math.sin(Math.PI * (i * speed / 1000 + 4 / 3)) * r,
			'top': Math.cos(Math.PI * (i * speed / 1000 + 4 / 3)) * r
		});

		if (j % 10 === 0) {
			if (j > startSpeedChangeTime && j < endSpeedChangeTime) {
				setNewSpeed(startSpeed + (endSpeed - startSpeed) * (j - startSpeedChangeTime) / (endSpeedChangeTime - startSpeedChangeTime));
			}
			if (j > startRaduisChangeTime && j < endRaduisChangeTime) {
				setRadius(startRadius + (endRaduis - startRadius) * (startRaduisChangeTime - j) / (startRaduisChangeTime - endRaduisChangeTime));
			}
			if (j > triggerCanDoMathsTime && !canDoMathsTriggered) {
				triggerCanDoMathsAnimation()
			}
		}

		if (j === animationDuration) {
			j = 0;
			resetAnimation();
		}
	}
}, 1);
