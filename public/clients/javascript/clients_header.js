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
	$('header>ul li.sign_in').on('click', function () {
		gsap.set('.popup_authorization', {
			scale: 1,
			onComplete: function () {
				gsap.to('.popup_authorization .popup', {
					scale: 1,
					duration: .5,
					ease: "back.inOut"
				});
			}
		})
	});
	$('.popup_authorization').on('click', function () {
		gsap.to('.popup_authorization .popup', {
			scale: 0,
			duration: .5,
			ease: "back.in",
			onComplete: function () {
				gsap.set('.popup_authorization', {
					scale: 0
				})
			}
		});

		setTimeout(() => {
			$('.popup_authorization .popup ul li').removeClass('selected');
			$('.popup_authorization .popup .wrapper_icon i').removeClass('unlock');
			$('.popup_authorization .popup .wrapper_icon').removeClass('unlock');
			$('.popup_authorization .popup .confirm span').removeClass('active');
			$('.popup_authorization .popup .confirm span').text('');
			gsap.set('.popup_authorization .popup .confirm span',{
				width:0,
				opacity:0,
				backgroundColor:"rgb(174, 191, 255)",
			})
		}, 700);
	})
	$('.popup_authorization .popup').on('click', function (event) {
		event.stopPropagation();
	})
	$('header .session').on('click',function(){
		$('header .session .icon .wrapper-info-user-popup').fadeToggle(300);
	});
	
	const authorization = {
		checkSeleted: false,
		checkOnce: true,
		controller: "decentralization/",
		main() {
			const _this = this;
			$('.popup_authorization .popup ul li').on('click', function () {
				let index = $(this).index();
				$('.popup_authorization .popup ul li').removeClass('selected');
				$('.popup_authorization .popup ul li').eq(index).addClass('selected');
				$('.popup_authorization .popup .wrapper_icon i').addClass('unlock');
				$('.popup_authorization .popup .wrapper_icon').addClass('unlock');
				gsap.to('.popup_authorization .popup .confirm span', {
					opacity: 1,
					backgroundColor: "#4079CA",
					width: "102%",
				})
				$('.popup_authorization .popup .confirm span').text('Xác nhận!');
				let action = $('.popup_authorization .popup ul li').eq(index).attr('data-action');
				let path = ROOT + _this.controller + action;
				$('.decentralization').attr('href', path);
			});
			$('.popup_authorization .popup .confirm span').on('click', function () {
				document.querySelector('.decentralization').click();
			});
		}
	}
	authorization.main();
});