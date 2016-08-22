$(window).scroll(function () {
	animateWhenInViewport();
	setSpeed();
});

function animateWhenInViewport () {
	$('.animate-viewport:in-viewport').addClass('animation-triggered');
}

var r = 150;
var speed = 1;
var newSpeed = speed;
var elem1 = $('.coreIdea:nth-of-type(1)');
var elem2 = $('.coreIdea:nth-of-type(2)');
var elem3 = $('.coreIdea:nth-of-type(3)');

var anchor = $('#coreIdeasAnchor');
var coreIdeas = $("#coreIdeas")

function setSpeed () {
	// height = how far from top of screen #coreIdeas is. 
	var height = coreIdeas.offset().top-$(window).scrollTop();
	if (height > -100) {
		setNewSpeed(1);
		setRadius(150);
		anchor.css({'position':'absolute', 'top':'200px'});
	} else if (height < -1000) {
		setNewSpeed(10);
		anchor.css({'position':'absolute', 'top':'1200px'});
		setRadius(50);
	} else {
		setNewSpeed(-height/100);
		anchor.css({'position':'fixed', 'top':'200px'});
		if (height < -800) {
			setRadius(150 + (800 + height)/2);
		}
	}
}

function setNewSpeed (input) {
	newSpeed = input;
}

function setRadius (radius) {
	r = radius;
}

var i = 0;
setInterval(function() {
	++i;
	if (speed !== newSpeed) {
		// The following block of code should prevent the animation jumping when the speed is changed. 
		// Without this, speed increasing completely changes where we are in the cycle. 
		// This ensures that i*speed/1000 is the same as i*newSpeed/1000 (modulo 2)
		// and hence Math.PI * (i*speed/1000) is unchanged (modulo 2*PI)
		var position = (i*speed/1000)%2;
		i=Math.floor(position*1000/newSpeed);
		speed=newSpeed;
	}
	elem1.css({'left': Math.sin(Math.PI * (i*speed/1000)) * r, 'top': Math.cos(Math.PI * (i*speed/1000)) * r});
	elem2.css({'left': Math.sin(Math.PI * (i*speed/1000 + 2 / 3)) * r, 'top': Math.cos(Math.PI * (i*speed/1000 + 2 / 3)) * r});
	elem3.css({'left': Math.sin(Math.PI * (i*speed/1000 + 4 / 3)) * r, 'top': Math.cos(Math.PI * (i*speed/1000 + 4 / 3)) * r});
}, 1);
