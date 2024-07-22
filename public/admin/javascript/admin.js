$(function () {
	function getSession(){
		$.post(ROOT+'session', {},
			function (data, textStatus, jqXHR) {
				sessionStorage.setItem('info',JSON.stringify(data));
			},
			"json"
		);
		
	}
	getSession();
	function validate({ form, selectors, callback }) {
		const validator = {
			form: form,
			simulator: {},
			selectors: selectors,
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
						callback(formData);

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
		validator.main();
	}
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
			$('.admin .tabs').fadeOut(1);
			$('.admin .tabs').eq(3).fadeIn();
			$('aside .menu .menu-tab ul li').eq(3).addClass('mark');
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
	const tabCourses = {
		main() {
			const roleElementWidth = $('.admin .tabs .courses .wrapper-courses-filter .filter-courses .role').eq(0).width();
			$('.admin .tabs .courses .wrapper-courses-filter .filter-courses .line').css('left', `0px`);
			$('.admin .tabs .courses .wrapper-courses-filter .filter-courses .line').css('width', `${roleElementWidth}px`);
			$('.admin .tabs .courses .container .item-courses').fadeOut(1);
			$('.admin .tabs .courses .container .item-courses').eq(0).fadeIn();
			$('.admin .tabs .courses .wrapper-courses-filter .filter-courses .role').on('click', function () {
				const index = $(this).closest('.filter-courses').find('.role').index(this);
				const width = $('.admin .tabs .courses .wrapper-courses-filter .filter-courses .role').eq(index).width();
				const position = $(this).position().left;
				$('.admin .tabs .courses .wrapper-courses-filter .filter-courses .line').css('left', `${position}px`);
				$('.admin .tabs .courses .wrapper-courses-filter .filter-courses .line').css('width', `${width}px`);
				$('.admin .tabs .courses .container .item-courses').fadeOut(0);
				$('.admin .tabs .courses .container .item-courses').eq(index).fadeIn();
			});
		}
	}
	tabCourses.main();
	const switchRole = {
		handleSwitchRole() {
			const roleElementWidth = $('section .tabs .wrapper-user .switch .role').eq(0).width();
			$('section .tabs .wrapper-user .switch .line').css('left', `0px`);
			$('section .tabs .wrapper-user .switch .line').css('width', `${roleElementWidth}px`);
			$('section .tabs main .switch-active').fadeOut();
			$('section .tabs main .switch-active').eq(0).fadeIn();
			$('section .tabs .wrapper-user .switch .role').on('click', function () {
				const index = $(this).closest('.wrapper-user').find('.role').index(this);
				const position = $(this).position().left;
				const roleElementWidth = $('section .tabs .wrapper-user .switch .role').eq(index).width();
				$('section .tabs .wrapper-user .switch .line').css('left', `${position}px`);
				$('section .tabs .wrapper-user .switch .line').css('width', `${roleElementWidth}px`);
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
		showCountUsers() {
			$.post(ROOT + `admin/countAllUsers`, "",
				function (data, textStatus, jqXHR) {
					$('section .tabs header.user .list span').text(data.countAll);
					$('section .tabs header.user .show span').text(data.countAll);
				},
				"json"
			);
		},
		getInforLecturer() {
			const _this = this;
			$.post(ROOT + `admin/getInforLecturer`, "",
				function (data, textStatus, jqXHR) {
					_this.lecturer(data.lecturer, data.educations);
					_this.renderListTotalPages({
						html: 'main .switch-active .panigation.lecturer ul',
						list: 'main .switch-active .panigation.lecturer ul li',
						totalPages: data.totalLecturerPages,
						path: `admin/getInforLecturer`,
						type: 'lecturer'
					});
				},
				"json"
			);
		},
		lecturer(data, educations) {
			let htmlLecturer = "";
			let htmlTotalPages = "";
			for (let i = 0; i < data.length; i++) {
				htmlLecturer += `<div data-ID='${data[i].id}' class="item">
					<div class="select-all">
						<input type="checkbox">
					</div>
					<div class="wrapper-image-account">
						<div class="image">
							<img src=${data[i].image !== null ? data[i].image : ROOT + "public/clients/images/anonymous.jpg"} alt="">
						</div>
						<div class="account">${data[i].account}</div>
					</div>
					<p>${data[i].user_name}</p>
					<p class="email">${data[i].email}</p>
					<p>${data[i].phone !== null ? data[i].phone : `Chưa cung cấp`}</p>
					<p>${data[i].education_name}</p>
					<p>${data[i].password}</p>
					<p class="icon">${parseInt(data[i].status) === 0 ? "<i class='bx bx-send send'></i>" : "<i class='bx bxs-show'></i>"}</p>
					<p class="icon">${parseInt(data[i].status) === 0 ? "<i class='bx bxs-lock-alt status-lock'></i>" : "<i class='bx bxs-lock-open-alt status-unlock' ></i>"}</p>
					<p class="icon"><i class='bx bx-edit edit'></i></p>
					<p class="icon"><i class='bx bx-trash trash'></i></p>
				</div>`;
			}
			$('main .switch-active .wrapper-content.lecturer .content').html(htmlLecturer);
			this.editLecturer(data, educations);
			this.deleteLecturer(data);
			this.sendMesageActiveAccount();
		},
		editLecturer(data, educations) {
			const _this = this;
			educations = $.map(educations, function (elementOrValue, indexOrKey) {
				return `<option value="${elementOrValue.id}">${elementOrValue.education_name}</option>`
			});
			$('.main.popup-edit.lecturer .content form .update-form .input-box.education select').html(educations);
			$('main .switch-active .wrapper-content.lecturer .content .icon i.edit').on('click', function () {
				gsap.to('.main.popup-edit.lecturer', {
					scale: 1,
					duration: .5,
					ease: "back.in",
					onComplete: function () {
						gsap.to('.main.popup-edit.lecturer .wrapper', {
							duration: .2,
							scale: 1
						})
					}
				});
				const lecturer_ID = parseInt($(this).parents('.item').attr('data-ID'));
				const unique = data.filter(item => parseInt(item.id) === lecturer_ID)[0];
				const inputs = $('.main.popup-edit.lecturer .content form .update-form').find('input');
				const majorsOption = $('.main.popup-edit.lecturer .content form .update-form .input-box.education select option');
				const status = $('.main.popup-edit.lecturer .content form .update-form .input-box.status select option');

				$.each(inputs, function (indexInArray, valueOfElement) {
					valueOfElement.value = unique[valueOfElement.name] || "";
				});
				$.each(majorsOption, function (indexInArray, valueOfElement) {
					if (unique.education === $(valueOfElement).text()) {
						$(valueOfElement).attr('selected', true);
					}else{
						$(valueOfElement).attr('selected', false);

					}
				});
				$.each(status, function (indexInArray, valueOfElement) {
					if (unique.status === $(valueOfElement).val()) {
						$(valueOfElement).attr('selected', true);
					}else{
						$(valueOfElement).attr('selected', false);
					}
				});

				_this.sendRequestEditlecturer();
			});
			$('.main.popup-edit.lecturer').on('click', function () {
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
			$('.main.popup-edit.lecturer .wrapper').on('click', function (e) {
				e.stopPropagation();
			})
		},
		deleteLecturer(data) {
			const _this = this;
			$('main .switch-active .wrapper-content.lecturer .content .icon i.trash').on('click', function () {
				const lecturer_ID = parseInt($(this).parents('.item').attr('data-ID'));
				const unique = data.filter(item => parseInt(item.id) === lecturer_ID)[0];
				swal({
					icon: 'error',
					title: `Bạn có chắc chắn muốn xoá ${unique.account} !`,
					text: 'Một khi bạn đã xoá thì dữ liệu không thể khôi phục!',
					buttons: {
						cancel: true,
						confirm: true
					}
				}).then(value => {
					if (value) {
						swal('Dữ liệu đã xoá thành công', {
							icon: 'success',
							button: false,
							timer: 1000
						});
						$.post(ROOT + "admin/deleteLecturer", { id: unique.id },
							function (data, textStatus, jqXHR) {
								console.log(data);
								if (data) {
									_this.getInforLecturer();
								}
							},
							"json"
						);
					}
				});
			});
		},
		sendRequestEditlecturer() {
			const parentThis = this;
			const student = {
				form: '.main.popup-edit.lecturer .content .check-validate',
				simulator: {},
				selectors: [
					checkBlank('#account'),
					checkLength('#account', 5),
					checkWhiteSpace('#account'),
					checkBlank('#user_name'),
					checkLength('#user_name', 8),
					checkBlank('#email'),
					checkEmail('#email'),
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
							console.log(formData)
							$.post(ROOT + `admin/updateLecturer`, formData,
								function (data, textStatus, jqXHR) {
									if (data) {
										$('.main.popup-edit.lecturer').trigger('click');
										parentThis.getInforLecturer();
										swal('Chỉnh sửa thành công', {
											timer: 1000,
											button: false,
											icon: 'success',
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
		sendMesageActiveAccount() {
			const _this = this;
			$('main .switch-active .wrapper-content.lecturer .content .item .icon i.send').on('click', function () {
				const parent = $(this).parents('.item');
				const email = parent.find('.email').text();
				const id = parent.attr('data-ID');
				$('.pending').addClass('active');
				$.post(ROOT + "admin/activeAccountLecturer", { email: email, id: id },
					function (data, textStatus, jqXHR) {
						if (data) {
							$('.pending').removeClass('active');
							_this.getInforLecturer();
							swal('Kích hoạt tài khoản giảng viên thành công', {
								icon: 'success',
								timer: 2000,
								button: false
							})
						}
					},
					"json"
				);
			});
		},
		getInforStudent() {
			const _this = this;
			$.post(ROOT + `admin/getInforStudent`, "",
				function (data, textStatus, jqXHR) {
					_this.student(data.student, data.majors);
					_this.renderListTotalPages({
						html: 'main .switch-active .panigation.student ul',
						list: 'main .switch-active .panigation.student ul li',
						totalPages: data.totalStudentPages,
						path: `admin/getInforStudent`,
						type: 'student'
					}
					);
				},
				"json"
			);
		},
		student(data, majors) {
			let htmlStudents = "";
			for (let i = 0; i < data.length; i++) {
				htmlStudents += `<div data-ID='${data[i].id}' class="item">
					<div class="select-all">
						<input type="checkbox">
					</div>
					<div class="wrapper-image-account">
						<div class="image">
							<img src=${data[i].image !== null ? data[i].image : ROOT + "public/clients/images/anonymous.jpg"} alt="">
						</div>
						<div class="account">${data[i].account}</div>
					</div>
					<p>${data[i].user_name}</p>
					<p>${data[i].email}</p>
					<p>${data[i].phone !== null ? data[i].phone : `Chưa cung cấp`}</p>
					<p>${data[i].major_name}</p>
					<p>${data[i].password}</p>
					<p class="icon">${parseInt(data[i].status) === 0 ? "<i class='bx bxs-lock-alt status-lock'></i>" : "<i class='bx bxs-lock-open-alt status-unlock' ></i>"}</p>
					<p class="icon"><i class='bx bx-edit edit'></i></p>
					<p class="icon"><i class='bx bx-trash trash'></i></p>
				</div>`;
			}
			$('main .switch-active .wrapper-content.student .content').html(htmlStudents);
			this.editStudent(data, majors);
			this.deleteStudent(data);
		},
		editStudent(data, majors) {
			const _this = this;
			majors = $.map(majors, function (elementOrValue, indexOrKey) {
				return `<option value="${elementOrValue.id}">${elementOrValue.major_name}</option>`
			});
			$('.main.popup-edit.student .content form .update-form .input-box.major select').html(majors);
			$('main .switch-active .wrapper-content.student .content .icon i.edit').on('click', function () {
				gsap.to('.main.popup-edit.student', {
					scale: 1,
					duration: .5,
					ease: "back.in",
					onComplete: function () {
						gsap.to('.main.popup-edit.student .wrapper', {
							duration: .2,
							scale: 1
						})
					}
				});
				const student_ID = parseInt($(this).parents('.item').attr('data-ID'));
				const unique = data.filter(item => parseInt(item.id) === student_ID)[0];
				const inputs = $('.main.popup-edit.student .content form .update-form').find('input');
				const majorsOption = $('.main.popup-edit.student .content form .update-form .input-box.major select option');
				const status = $('.main.popup-edit.student .content form .update-form .input-box.status select option');
				$.each(inputs, function (indexInArray, valueOfElement) {
					valueOfElement.value = unique[valueOfElement.name] || "";
				});
				$.each(majorsOption, function (indexInArray, valueOfElement) {
					if (unique.major_name === $(valueOfElement).text()) {
						$(valueOfElement).attr('selected', true);
					}else{
						$(valueOfElement).attr('selected', false);
					}
				});
				$.each(status, function (indexInArray, valueOfElement) {
					if (unique.status === $(valueOfElement).val()) {
						$(valueOfElement).attr('selected', true);
					}else{
						$(valueOfElement).attr('selected', false);
					}
				});
				

				_this.sendRequestEditStudent();
			});
			$('.main.popup-edit.student').on('click', function () {
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
			$('.main.popup-edit.student .wrapper').on('click', function (e) {
				e.stopPropagation();
			})
		},
		deleteStudent(data) {
			const _this = this;
			$('main .switch-active .wrapper-content.student .content .icon i.trash').on('click', function () {
				const student_ID = parseInt($(this).parents('.item').attr('data-ID'));
				const unique = data.filter(item => parseInt(item.id) === student_ID)[0];
				swal({
					icon: 'error',
					title: `Bạn có chắc chắn muốn xoá ${unique.account} !`,
					text: 'Một khi bạn đã xoá thì dữ liệu không thể khôi phục!',
					buttons: {
						cancel: true,
						confirm: true
					}
				}).then(value => {
					if (value) {
						swal('Dữ liệu đã xoá thành công', {
							icon: 'success',
							button: false,
							timer: 1000
						});
						$.post(ROOT + "admin/deleteStudent", { id: unique.id },
							function (data, textStatus, jqXHR) {
								if (data) {
									_this.getInforStudent();
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
				form: '.main.popup-edit.student .content .check-validate',
				simulator: {},
				selectors: [
					checkBlank('#account'),
					checkLength('#account', 5),
					checkWhiteSpace('#account'),
					checkBlank('#user_name'),
					checkLength('#user_name', 8),
					checkBlank('#email'),
					checkEmail('#email'),
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
									if (data) {
										$('.main.popup-edit.student').trigger('click');
										parentThis.getInforStudent();
										swal('Chỉnh sửa thành công', {
											timer: 1000,
											button: false,
											icon: 'success',
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
		renderListTotalPages({ ...rest }) {
			const { html, list, path, totalPages, type } = rest;
			let htmlTotalPages = "";
			for (let i = 0; i < totalPages; i++) {
				htmlTotalPages += `<li data-ID='${i}' >${i + 1}</li>`
			}
			$(html).html(htmlTotalPages);
			this.handlePagination({ list, path, type });

		},
		handlePagination({ ...rest }) {
			const { list, path, type } = rest;
			const _this = this;
			$(list).eq(0).addClass('active');
			$(list).on('click', function () {
				const index = $(this).index();
				const currentPage = parseInt($(this).attr('data-ID'));
				$(list).removeClass('active');
				$(list).eq(index).addClass('active');
				$.post(ROOT + path, { currentPage: currentPage },
					function (data, textStatus, jqXHR) {
						_this[type](data[type]);
					},
					"json"
				);
			});
		},
		main() {
			this.showCountUsers();
			this.getInforStudent();
			this.getInforLecturer();
		}
	}
	callAPIUser.main();
	const callAPICourses = {
		catchEvent() {
			const _this = this;
			$('.admin .tabs .courses .container .item-courses.course .add-course .right').on('click', function () {
				gsap.to('.popup-add-courses', {
					scale: 1,
					duration: .2,
					opacity: 1,
					ease: "power2.inOut",
					onComplete() {
						gsap.to('.popup-add-courses .wrapper', {
							scale: 1,
							duration: .5,
							opacity: 1,
							ease: "power2.inOut",
						})
					}
				});
			});
			validate({
				form: '.formAddCourses',
				selectors: [checkBlank('#course')],
				callback(forms) {
					console.log(forms);
					const admin = JSON.parse(sessionStorage.getItem('info'))
					// $.post(ROOT + "admin/addCourse", forms,
					// 	function (data, textStatus, jqXHR) {
					// 		if (data) {
					// 			swal('Thêm khoá học thành công', { icon: 'success', button: false, timer: 1000 });
					// 			$('.popup-add-courses').trigger('click');
					// 			_this.getCourses();
					// 		} else {
					// 			swal({
					// 				icon: 'error',
					// 				title: 'Thêm khoá học thất bại!',
					// 				text: 'Không được phép trùng tên khoá học!',
					// 				button: false,
					// 				timer: 2000
					// 			});
					// 		}
					// 	},
					// 	"json"
					// );

				}
			});
			$('.popup-add-courses').on('click', function () {
				gsap.to('.popup-add-courses .wrapper', {
					scale: 0,
					duration: .5,
					opacity: 0,
					ease: "back.in",
					onComplete() {
						gsap.to('.popup-add-courses', {
							scale: 0,
							duration: .2,
							opacity: 0,
							ease: "back.in",
						})
					}
				})
			});
			$('.popup-add-courses .wrapper').on('click', function (e) {
				e.stopPropagation();
			})
		},
		getCourses() {
			const _this = this;
			$.post(ROOT + "admin/getCourses", {},
				function (data, textStatus, jqXHR) {
					_this.renderCourse(data.courses);
				},
				"json"
			);
		},
		renderCourse(data = []) {
			let html = "";
			for (let i = 0; i < data.length; i++) {
				html += `<div data-ID="${data[i].ID}" class="item">
							<input type="checkbox" name="" id="">
							<p>${data[i].ID}</p>
							<p class="name">${data[i].name}</p>
							<p class="icon"><i class='bx bx-edit edit'></i></p>
							<p class="icon"><i class='bx bx-trash trash'></i></p>
						</div>`
			};
			$('.admin .tabs .courses .container .item-courses.course .content').html(html);
			this.editCourse();
			this.deleteCourse();
		},
		editCourse() {
			const _this = this;
			$('.admin .tabs .courses .container .item-courses.course .content .item p.icon i.edit').on('click', function () {
				const ID = parseInt($(this).parents('.item').attr('data-ID'));
				const name = $(this).parents('.item').find('.name').text();
				gsap.to('.popup-edit-courses', {
					scale: 1,
					duration: .2,
					opacity: 1,
					ease: "power2.inOut",
					onComplete() {
						gsap.to('.popup-edit-courses .wrapper', {
							scale: 1,
							duration: .5,
							opacity: 1,
							ease: "power2.inOut",
						})
					}
				});
				$('.popup-edit-courses').find('input[name="edit"]').val(name);
				$('.popup-edit-courses').find('input[name="ID"]').val(ID);
			});
			validate({
				form: '.formEditCourses',
				selectors: [checkBlank('#edit')],
				callback(forms) {
					$.post(ROOT + "admin/editCourse", forms,
						function (data, textStatus, jqXHR) {
							if (data) {
								swal('Sửa thành công', {
									button: false,
									timer: 1000,
									icon: 'success'
								});
								$('.popup-edit-courses').trigger('click');
								_this.getCourses();
							}
						},
						"json"
					);
				}
			})
			$('.popup-edit-courses').on('click', function () {
				gsap.to('.popup-edit-courses .wrapper', {
					scale: 0,
					duration: .5,
					opacity: 0,
					ease: "back.in",
					onComplete() {
						gsap.to('.popup-edit-courses', {
							scale: 0,
							duration: .2,
							opacity: 0,
							ease: "back.in",
						})
					}
				})
			})
			$('.popup-edit-courses .wrapper').on('click', function (e) {
				e.stopPropagation();
			})
		},
		deleteCourse() {
			const _this = this;
			$('.admin .tabs .courses .container .item-courses.course .content .item p.icon i.trash').on('click', function () {
				const ID = parseInt($(this).parents('.item').attr('data-ID'));
				const name = $(this).parents('.item').find('.name').text();
				swal({
					title: `Bạn có chắc chắn muốn xoá khoá học ${name}!`,
					text: 'Nếu bạn xoá thì tất cả môn học của bạn sẽ huỷ sạch toàn bộ!',
					buttons: {
						cancel: true,
						confirm: true
					},
					icon: 'error'
				}).then((data) => {
					if (data) {
						$.post("admin/deleteCourse", { ID: ID },
							function (data, textStatus, jqXHR) {
								if (data) {
									swal(`Xoá khoá học ${name} thành công`, {
										button: false,
										timer: 1000,
										icon: 'success'
									});
									_this.getCourses();
								}
							},
							"json"
						);
					}
				})
			});
		},
		main() {
			this.catchEvent();
			this.getCourses();
		}
	}
	callAPICourses.main();
	const subject_quizz = {
		dataSimulator: [],
		events() {
			const _this = this;
			$('.admin .tabs.subject .container .quiz').fadeOut();
			$('.admin .tabs.subject > header h1#create-subject').on('click', function () {
				if ($('.admin .tabs.subject > header h1#create-subject').hasClass('add-question')) {
					$('.popup-add-quizz').addClass('active');
				}
				$('.admin .tabs.subject > header h1#create-subject').addClass('add-question');
				$('.admin .tabs.subject > header h1#create-subject').find('span').text("Thêm câu hỏi");
				$('.admin .tabs.subject .container .quiz').slideDown(600);
				$('.admin .tabs.subject .wrapper-add').fadeIn(500);
			});
			$('.popup-add-quizz').on('click', function () {
				$('.popup-add-quizz').removeClass('active');
			})
			$('.popup-add-quizz .wrapper').on('click', function (e) {
				e.stopPropagation();
			})
		},
		addQuizz() {
			const _this = this;
			validate({
				form: '.form-add-quizz', selectors: [
					checkBlank('#question'),
					checkLength('#question', 5),
					checkBlank('#answers'),
					checkLength('#answers', 3),
					checkBlank('#result'),
					checkLength('#result', 3),
				], callback(forms) {
					const test = {};
					$.each(forms, function (indexInArray, valueOfElement) {
						test[valueOfElement.name] = valueOfElement.value;
					});
					const arrayAnswers = test.answers.split(',');
					if (arrayAnswers.includes(test.result)) {
						const isDuplicate = _this.dataSimulator.some(item => item.question.includes(test.question));
						if (isDuplicate) {
							swal('Tuyệt đối không được trùng câu hỏi!', { icon: 'error', button: false, timer: 2000 });
						} else {
							_this.dataSimulator.push(test);
							_this.renderQuizz();
						}
					} else {
						swal('Bắt buộc phải khớp 1 trong 4 câu hỏi trên!', { icon: 'error', button: false, timer: 2000 });
					}
				}
			});
		},
		renderQuizz() {
			const titles = ['A', 'B', 'C', 'D'];
			let html = "";
			let answersHTML = "";
			let questionLists = "";
			for (let i = 0; i < this.dataSimulator.length; i++) {
				let answers = this.dataSimulator[i].answers.split(',');
				for (let j = 0; j < answers.length; j++) {
					answersHTML += `<div class="input-box">
									<label for="">${titles[j]}. </label>
									<span class="question-text">${answers[j]}</span>
									<p class="message"></p>
								</div>`
				}
				html += `<form class="item" id="item-${i}">
							<div class="current">
								<p>Câu hỏi số: ${i + 1}</p>
								<div class="wrapper-icon">
									<div class="edit"><i class='bx bx-edit edit'></i></i></div>
									<div class="trash"><i class='bx bx-trash trash'></i></div>
								</div>
							</div>
							<div class="question">
								<div class="input-box">
									<label for="">Nội dung câu hỏi: </label>
									<span class="question-text">${this.dataSimulator[i].question}</span>
									<p class="message"></p>
								</div>
							</div>
							<div class="answers">
								${answersHTML}
								<div class="correct-answer">
									<label for="">Câu trả lời đúng là: </label>
									<span class="question-text">${this.dataSimulator[i].result}</span>
									<p class="message"></p>
								</div>
							</div>
						</form>`;
				answersHTML = "";
				questionLists += `<a class="item" href="#item-${i}">${i + 1}</a>`;
			}
			$('.admin .tabs.subject .container .quiz .list-question .list').html(questionLists).hide().fadeIn(500);
			$('.admin .tabs.subject .container .quiz .quizzes .wrapper-data-fill').html(html).hide().slideDown(800);
			$('.admin .tabs.subject .container .quiz .list-question .list .item').on('click',function(){
				$('.admin .tabs.subject .container .quiz .list-question .list .item').removeClass('active');
				$(this).addClass('active');
			})
		},
		main() {
			this.events();
			this.addQuizz();
		}
	}
	subject_quizz.main();
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