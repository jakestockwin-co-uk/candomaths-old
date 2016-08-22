$(window).scroll(function () {
	animateWhenInViewport();
});

function animateWhenInViewport () {
	$('.animate-viewport:in-viewport').addClass('animation-triggered');
}

