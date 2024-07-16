$(function () {
	const aside = {
		main() {
			$('aside .information .mode-switch .wrapper_mode-switch').on('click', function () {
				$('body').toggleClass('dark');
				if ($('body').hasClass('dark')) {
					$('aside .information .mode-switch .type').text('Light mode');
				} else {
					$('aside .information .mode-switch .type').text('Dark mode');
				}
			});
			$('aside header .toggle').on('click', function () {
				$('aside').toggleClass('close');
			});
			$('aside .menu .search-box .icon').on('click', function () {
				$('aside').removeClass('close');
			});
		}
	}
	aside.main();
	const tabs = {
		handleTabs() {
			$('.admin .tabs').hide();
			$('.admin .tabs').eq(1).show();
			$('aside .menu .menu-tab ul li').eq(1).addClass('mark');
			$('aside .menu .menu-tab ul li').on('click', function () {
				const index = $(this).index();
				$('.admin .tabs').fadeOut(0);
				$('aside .menu .menu-tab ul li').removeClass('mark');
				$('.admin .tabs').eq(index).fadeIn(300);
				$('aside .menu .menu-tab ul li').eq(index).addClass('mark');
			});
		},
		main() {
			this.handleTabs();
		}
	}
	tabs.main();
	const switchRole = {
		handleSwitchRole() {
			const roleElementWidth = $('section .tabs .wrapper-user .switch .role').eq(0).width();
			$('section .tabs .wrapper-user .switch .line').css('left', `0px`);
			$('section .tabs .wrapper-user .switch .line').css('width', `${roleElementWidth}px`);
			$('section .tabs main .switch-active').hide();
			$('section .tabs main .switch-active').eq(0).show();
			$('section .tabs .wrapper-user .switch .role').on('click', function () {
				const index = $(this).closest('.wrapper-user').find('.role').index(this);
				const position = $(this).position().left;
				$('section .tabs .wrapper-user .switch .line').css('left', `${position}px`);
				$('section .tabs main .switch-active').fadeOut(0);
				$('section .tabs main .switch-active').eq(index).fadeIn(500);
			});
		},
		main() {
			this.handleSwitchRole();
		}
	};
	switchRole.main();
	const optionMenu = {
		catchEvents() {
			$('.select-btn').on('click', function () {
				$('.options').fadeToggle(300);
			});
			$('.options .option').on('click', function () {
				const value = $(this).find('span').text();
				$('.select-btn').find('.sBtn-text').text(value);
			});
		},
		main() {
			this.catchEvents();
		}
	}
	optionMenu.main();
	const callAPIUser = {
		getUsers() {
			const _this = this;
			$.post(ROOT + `admin/getInforUser`, "",
				function (data, textStatus, jqXHR) {
					console.log(data);
					$('section .tabs header.user .list span').text(data.countAll);
					$('section .tabs header.user .show span').text(data.countAll);
					_this.student(data.student);
					_this.renderListStudentTotalPages(data.totalStudentPages);
					_this.lecturer(data.lecturer, data.totalLecturerPages);
				},
				"json"
			);
		},
		lecturer(data, totalPages) {
			let htmlLecturer = "";
			let htmlTotalPages = "";
			for (let i = 0; i < data.length; i++) {
				htmlLecturer += `<div data-ID='${data[i].user_ID}' class="item">
					<div class="select-all">
						<input type="checkbox">
					</div>
					<div class="wrapper-image-account">
						<div class="image">
							<img src=${data[i].image !== null ? data[i].image : ROOT + "public/clients/images/anonymous.jpg"} alt="">
						</div>
						<div class="account">${data[i].account}</div>
					</div>
					<p>${data[i].username}</p>
					<p>${data[i].email}</p>
					<p>${data[i].phone !== null ? data[i].phone : `Chưa cung cấp`}</p>
					<p>${data[i].education}</p>
					<p>${data[i].password}</p>
					<p class="icon"><i class='bx bx-edit edit'></i></p>
					<p class="icon"><i class='bx bx-trash trash'></i></p>
				</div>`;
			}
			$('main .switch-active .wrapper-content.lecturer .content').html(htmlLecturer);
			for (let i = 0; i < totalPages; i++) {
				htmlTotalPages += `<li data-ID='${i}' >${i + 1}</li>`
			}
			$('main .switch-active .panigation.lecturer ul').html(htmlTotalPages);
		},
		student(data) {
			let htmlStudents = "";
			for (let i = 0; i < data.length; i++) {
				htmlStudents += `<div data-ID='${data[i].user_ID}' class="item">
					<div class="select-all">
						<input type="checkbox">
					</div>
					<div class="wrapper-image-account">
						<div class="image">
							<img src=${data[i].image !== null ? data[i].image : ROOT + "public/clients/images/anonymous.jpg"} alt="">
						</div>
						<div class="account">${data[i].account}</div>
					</div>
					<p>${data[i].username}</p>
					<p>${data[i].email}</p>
					<p>${data[i].phone !== null ? data[i].phone : `Chưa cung cấp`}</p>
					<p>${data[i].major}</p>
					<p>${data[i].password}</p>
					<p class="icon"><i class='bx bx-edit edit'></i></p>
					<p class="icon"><i class='bx bx-trash trash'></i></p>
				</div>`;
			}
			$('main .switch-active .wrapper-content.student .content').html(htmlStudents);
			this.editStudent(data);
			this.deleteStudent(data);
		},
		editStudent(data) {
			const _this = this;
			$('main .switch-active .wrapper-content.student .content .icon i.edit').on('click', function () {
				gsap.to('.main.popup-edit', {
					scale: 1,
					duration: .5,
					ease: "back.in",
					onComplete: function () {
						gsap.to('.main.popup-edit .wrapper', {
							duration: .2,
							scale: 1
						})
					}
				});
				const student_ID = parseInt($(this).parents('.item').attr('data-ID'));
				const unique = data.filter(item => parseInt(item.user_ID) === student_ID)[0];
				let html = `
				<input hidden type="text" name="user_ID" id="user_ID" value="${unique.user_ID}">
				<div class="input-box">
					<label for="account">Tài khoản</label>
					<input type="text" name="account" id="account" value="${unique.account}">
						<span class="message"></span>
				</div>
				<div class="input-box">
					<label for="username">Họ và tên</label>
					<input type="text" name="username" id="username" value="${unique.username}">
						<span class="message"></span>
				</div>
				<div class="input-box">
					<label for="email">Email</label>
					<input type="email" name="email" id="email" value="${unique.email}">
						<span class="message"></span>
				</div>
				<div class="input-box">
					<label for="password">Mật khẩu</label>
					<input type="password" name="password" id="password" value="${unique.password}">
						<span class="message"></span>
				</div>
				<div class="input-box">
					<label for="major">Nghành học</label>
					<input type="text" name="major" id="major" value="${unique.major}">
						<span class="message"></span>
				</div>
				<div class="input-box">
					<label for="major">Số điện thoại</label>
					<input type="text" name="phone" id="phone" value="${unique.phone === null ? "" : unique.phone}">
						<span class="message"></span>
					</div>
				<div class="input-box select">
					<label for="status">Trạng thái</label>
					<select name="status" id="status">
					${parseInt(unique.status) === 0 ? `<option value="0">Chưa kích hoạt</option>` : `<option value="1">Đang kích hoạt</option>`}
					${parseInt(unique.status) !== 0 ? `<option value="0">Chưa kích hoạt</option>` : `<option value="1">Đang kích hoạt</option>`}
					</select>
				</div>`;
				$('.main.popup-edit .content form .update-form').html(html);

				_this.sendRequestEditStudent();
			});
			$('.main.popup-edit').on('click', function () {
				gsap.to('.main.popup-edit .wrapper', {
					scale: 0,
					duration: .5,
					ease: "back.in",
					onComplete: function () {
						gsap.set('.main.popup-edit', {
							scale: 0
						})
					}
				});

			})
			$('.main.popup-edit .wrapper').on('click', function (e) {
				e.stopPropagation();
			})
		},
		deleteStudent(data){
			const _this = this;
			$('main .switch-active .wrapper-content.student .content .icon i.trash').on('click',function(){
				const student_ID = parseInt($(this).parents('.item').attr('data-ID'));
				const unique = data.filter(item => parseInt(item.user_ID) === student_ID)[0];
				console.log(unique)
				swal({
					icon:'error',
					title:`Bạn có chắc chắn muốn xoá ${unique.account} !`,
					text:'Một khi bạn đã xoá thì dữ liệu không thể khôi phục!',
					buttons:{
						cancel:true,
						confirm:true
					}
				}).then(value=>{
					if(value){
						swal('Dữ liệu đã xoá thành công',{
							icon:'success',
							button:false,
							timer:1000
						});
						$.post(ROOT + "admin/deleteStudent",{user_ID:unique.user_ID},
							function (data, textStatus, jqXHR) {
								console.log(data);
								if(data){
									_this.getUsers();
								}
							},
							"json"
						);	
					}
				});
			});
		},
		sendRequestEditStudent() {
			const parentThis = this;
			const student = {
				form: '.main.popup-edit .content .check-validate',
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
					checkBlank('#password'),
					checkLength('#password', 5),
					checkWhiteSpace('#password'),
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
							$.post(ROOT + `admin/updateStudent`, formData,
								function (data, textStatus, jqXHR) {
									if(data){
										$('.main.popup-edit').trigger('click');
										parentThis.getUsers();
										swal({
											icon:'success',
											title:'Chỉnh sửa thành công',
											text:'=====================',
											timer:1000,
											button:false
										})
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
				main() {
					this.handleCatchEvent();
					this.handleSubmitForm();
				}
			}
			student.main();
		},
		renderListStudentTotalPages(totalPages) {
			let htmlTotalPages = "";
			for (let i = 0; i < totalPages; i++) {
				htmlTotalPages += `<li data-ID='${i}' >${i + 1}</li>`
			}
			$('main .switch-active .panigation.student ul').html(htmlTotalPages);
			this.handlePagination();

		},
		handlePagination() {
			const _this = this;
			$('main .switch-active .panigation.student ul li').eq(0).addClass('active');
			$('main .switch-active .panigation.student ul li').on('click', function () {
				const index = $(this).index();
				const currentPage = parseInt($(this).attr('data-ID'));
				$('main .switch-active .panigation.student ul li').removeClass('active');
				$('main .switch-active .panigation.student ul li').eq(index).addClass('active');
				$.post(ROOT + `admin/getInforUser`, { currentPage: currentPage },
					function (data, textStatus, jqXHR) {
						_this.student(data.student);
					},
					"json"
				);
			});

		},
		main() {
			this.getUsers();
		}
	}
	callAPIUser.main();

});

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