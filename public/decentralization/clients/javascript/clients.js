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
			checkBlank('#major'),
			// checkBlank('#file'),
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
						const label = $(inputElement).parent('.input-box').find('label');
						isError = validators[i](inputElement.val().trim(), label);
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
			return !isError;
		},
		handleSubmitForm() {
			const _this = this;
			$(_this.form).on('submit', function (e) {
				e.preventDefault();
				let isSubmit = true;
				$.each(_this.selectors, function (indexInArray, valueOfElement) {
					const isValid = _this.handleCondition(valueOfElement);
					if (!isValid) {
						isSubmit = false;
					}
				});
				if (isSubmit) {
					let formData = $(_this.form).serializeArray();
					$('.pending').addClass('active');
					$.post(ROOT + "ajax/studentSignUp", formData,
						function (data, textStatus, jqXHR) {
							$('.pending').removeClass('active');
							if (data.account) {
								$(_this.form + " " + "#account").parent('.input-box').addClass('error');
								$(_this.form + " " + "#account").parent('.input-box').find('.message').text('Tài khoản đã tồn tại!');
							}
							if (data.email) {
								$(_this.form + " " + "#email").parent('.input-box').addClass('error');
								$(_this.form + " " + "#email").parent('.input-box').find('.message').text('Email đã tồn tại!');
							}
							if (data.active) {
								swal({
									title: 'Đăng ký thành công!',
									text: 'Chuyển trang...',
									icon: 'success',
									timer: 1800,
									button: false
								});
								setTimeout(() => {
									$('#sign-in-btn').trigger('click');
								}, 2000);
								setTimeout(() => {
									swal({
										title: 'EduQuiz thông báo!!!',
										text: 'Chúng tôi đã gửi tới email của bạn để kích hoạt tài khoản, Vui lòng kiểm tra!!!',
										button: {
											text: 'Đã hiểu'
										},
										icon: 'info',
									})
								}, 3800);
							}
						},
						"json"
					);
				} else {
					e.preventDefault();
				}
			})
		},
		handleCatchEvent() {
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
		},
		debounce(data) {
			const _this = this;
			$(_this.form + " " + ".input-box .sub-menu").fadeOut();
			$(_this.form + " " + ".input-box .sub-menu").parent('.input-box').find('input').on('click', function () {
				$(_this.form + " " + ".input-box .sub-menu").fadeIn(300);
			})
			$(_this.form + " " + ".input-box .sub-menu").parent('.input-box').find('input').on('blur', function () {
				$(_this.form + " " + ".input-box .sub-menu").fadeOut(300);
			})
			$(_this.form + " " + ".input-box .sub-menu ul li").on('click', function () {
				const value = $(this).text();
				$(_this.form + " " + ".input-box .sub-menu").parent('.input-box').find('input').val(value);
			});
			/////////////////////////////////////////////////////////////////////////////
			$(_this.form + " " + ".input-box .sub-menu").parent('.input-box').find('input').on('input', function () {
				handleShowResult($(this).val());
			})
			function handleShowResult(searchValue) {
				let html = "";
				const searchResults = data.filter(item => item.major.toLowerCase().trim().includes(searchValue.toLowerCase().trim()));
				if (searchResults.length > 0) {
					for (let i = 0; i < searchResults.length; i++) {
						html += `<li data-ID="${searchResults[i].ID}">${searchResults[i].major}</li>`
					}
					$(_this.form + " " + ".input-box .sub-menu ul").html(html);

				} else {
					$(_this.form + " " + ".input-box .sub-menu ul").html("<li>Không tìm thấy!</li>");

				}
				$(_this.form + " " + ".input-box .sub-menu ul li").on('click', function () {
					const value = $(this).text();
					$(_this.form + " " + ".input-box .sub-menu").parent('.input-box').find('input').val(value);
				});
			}
		},
		getListMajors() {
			const _this = this;
			$.post(ROOT + "ajax/getStudyField", "",
				function (data, textStatus, jqXHR) {
					_this.renderListMajors(data);
				},
				"json"
			);
		},
		renderListMajors(data) {
			const _this = this;
			let html = "";
			for (let i = 0; i < data.length; i++) {
				html += `<li data-ID="${data[i].ID}">${data[i].major}</li>`
			}
			$(_this.form + " " + ".input-box .sub-menu ul").html(html);
			_this.debounce(data);
		},
		main() {
			this.getListMajors();
			this.handleCatchEvent();
			this.handleSubmitForm();
		}
	}
	signUp.main();
	function checkBlank(selector) {
		return {
			selector: selector,
			validator(value, label) {
				if (label) {
					value.length === 0 ? label.text('Upload file') : label.text(value);
				}
				return value.length === 0 ? 'Không được để trống!' : undefined;
			}
		}
	}
	function checkLength(selector, min) {
		return {
			selector: selector,
			validator(value) {
				return value.length < min ? `Bắt buộc phải trên ${min} ký tự!` : undefined;
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
});