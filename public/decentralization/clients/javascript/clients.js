$(function () {
	const signUp = {
		form: '.sign-up-form',
		simulator: {},
		selectors: [
			checkBlank('#account'),
			checkLength('#account', 5),
			checkWhiteSpace('#account'),
			checkBlank('#username'),
			checkLength('#username', 8),
			checkBlank('#email'),
			checkEmail('#email'),
			checkBlank('#education'),
			checkBlank('#file'),
			checkBlank('#password'),
			checkLength('#password', 5),
			checkWhiteSpace('#password'),
			checkBlank('#confirm_password'),
			checkLength('#confirm_password', 5),
			checkWhiteSpace('#confirm_password'),
			checkMatch('#confirm_password', () => $('.sign-up-form #password').val()),
		],
		handleCondition(obj) {
			const validators = this.simulator[obj.selector];
			const inputElement = $(this.form + " " + obj.selector);
			let isError;
			for (let i = 0; i < validators.length; i++) {
				switch (inputElement.attr('type')) {
					case 'file':

						break;
					default:
						isError = validators[i](inputElement.val().trim());
				}
				if (isError) break;
			}
			let messageElement = inputElement.parent('.input-box').find('.message');
			if (isError) {
				inputElement.parent('.input-box').addClass('error');
				messageElement.text(isError);
			} else {
				inputElement.parent('.input-box').removeClass('error');
				messageElement.text('');
			}
		},
		main() {
			const _this = this;
			$.each(this.selectors, function (index, element) {
				if (Array.isArray(_this.simulator[element.selector])) {
					_this.simulator[element.selector].push(element.validator);
				} else {
					_this.simulator[element.selector] = [element.validator];
				}
				$(_this.form + " " + element.selector).on('blur', function () {
					_this.handleCondition(element);
				});
				let inputElement = $(_this.form + " " + element.selector);
				$(_this.form + " " + element.selector).on('input', function () {
					inputElement.parent('.input-box').find('.message').text("");
					inputElement.parent('.input-box').removeClass('error');
				});
			});
		}
	}
	signUp.main();
	function checkBlank(selector) {
		return {
			selector: selector,
			validator(value) {
				return value.length === 0 ? 'Không được để trống!' : undefined;
			}
		}
	}
	function checkLength(selector, min) {
		return {
			selector: selector,
			validator(value) {
				return value.length < min ? `Bắt buộc phải trên ${min}!` : undefined;
			}
		}
	}
	function checkWhiteSpace(selector) {
		return {
			selector: selector,
			validator(value) {
				value = value.split('');
				let found = false;
				let checkWhiteSpace = " ";
				for (let i = 0; i < value.length; i++) {
					if (value[i] === checkWhiteSpace) {
						found = true;
						break;
					}
				}
				return found ? `Không được chứa khoảng trắng!` : undefined;
			}
		}
	}
	function checkMatch(selector, callback) {
		return {
			selector: selector,
			validator(value) {
				return value !== callback() ? 'Mật khẩu không khớp!' : undefined;
			}
		}
	}
	function checkEmail(selector) {
		return {
			selector: selector,
			validator(value) {
				const regex_email = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;;
				return !regex_email.test(value) ? 'Email không chính xác!' : undefined;
			}
		}
	}
})