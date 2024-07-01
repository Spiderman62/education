$(function () {
	$('header .nav-mobile').on('click', function () {
		gsap.to('.nav_mobile-fixed', {
			top: 0,
			opacity: 1,
			duration: 0.5,
			ease: 'ease'
		});
	});

	$('.nav_mobile-fixed').on('click', function () {
		gsap.to('.nav_mobile-fixed', {
			top: '-100%',
			opacity: 0,
			duration: 0.5,
			ease: 'ease'
		});
	});
});