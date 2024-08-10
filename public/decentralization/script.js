const form = {
	main() {
		$('#sign-up-btn').on('click', function () {
			$('.container').addClass('sign-up-mode');
		});
		$('#sign-in-btn').on('click', function () {
			$('.container').removeClass('sign-up-mode');
		});
	}
}
form.main();
const forgetPassword = {
	controller: null,
	main() {
		const _this = this;
		$('.forgot-password span').off('click').on('click', function () {
			_this.controller = $(this).attr('data-role');
			$('.popup-forget-passwrod').addClass('active');
		});
		$('.popup-forget-passwrod').on('click', function () {
			$('.popup-forget-passwrod').removeClass('active');
		});
		$('.popup-forget-passwrod .wrapper').on('click', function (e) {
			e.stopPropagation();
		});
		validate({
			form: '.form-forget-password',
			selectors: [
				checkBlank('input[name="email"]'),
				checkEmail('input[name="email"]')

			],
			callback(forms) {
				const obj = forms.reduce((accum, curr) => {
					accum[curr.name] = curr.value;
					return accum;
				}, {});
				$('.pending').addClass('active');
				$('.popup-forget-passwrod').removeClass('active');
				$.post(ROOT + `decentralization/${_this.controller}`, obj,
					function (data, textStatus, jqXHR) {
						$('.pending').removeClass('active');
						swal(`We just sent email to you, please check!`, { icon: 'success', button: false ,timer:3000});
					},
					"json"
				);
			}
		})
	},
}
forgetPassword.main();