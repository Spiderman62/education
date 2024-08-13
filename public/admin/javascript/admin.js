$(function () {
	function getSession() {
		$.post(ROOT + 'session', {},
			function (data, textStatus, jqXHR) {
				sessionStorage.setItem('info', JSON.stringify(data));
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
						default:
							isError = validators[i](inputElement.val().trim());
					}
					if (isError) break;
				}
				let messageElement = inputElement.parent('.input-box').find('.message');
				if (isError) {
					inputElement.parents('.input-box').addClass('error');
					messageElement.text(isError);
				} else {
					inputElement.parents('.input-box').removeClass('error');
					messageElement.text('');
				}
				return !isError;
			},
			handleSubmitForm() {
				const _this = this;
				$(_this.form).off('submit').on('submit', function (e) {
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
						inputElement.parents('.input-box').find('.message').text("");
						inputElement.parents('.input-box').removeClass('error');
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
			$('.admin .tabs').eq(0).fadeIn();
			$('aside .menu .menu-tab ul li').eq(0).addClass('mark');
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
			$('.admin .tabs .courses .container .item-courses').fadeOut(0);
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
			// $.post(ROOT + `admin/countAllUsers`, "",
			// 	function (data, textStatus, jqXHR) {
			// 		$('section .tabs header.user .list span').text(data.countAll);
			// 		$('section .tabs header.user .show span').text(data.countAll);
			// 	},
			// 	"json"
			// );
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
						role: 'lecturer',
						type: 'educations'
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
							<img src=${data[i].image !== null ? ROOT + `public/images/${data[i].image}` : ROOT + "public/images/anonymous.jpg"} alt="">
						</div>
						<div class="account">${data[i].account}</div>
					</div>
					<p>${data[i].user_name}</p>
					<p class="email">${data[i].email}</p>
					<p>${data[i].phone !== null ? data[i].phone : `Chưa cung cấp`}</p>
					<p>${data[i].education_name}</p>
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
					if (unique.education_name === $(valueOfElement).text()) {
						$(valueOfElement).attr('selected', true);
					} else {
						$(valueOfElement).attr('selected', false);

					}
				});
				$.each(status, function (indexInArray, valueOfElement) {
					if (unique.status === $(valueOfElement).val()) {
						$(valueOfElement).attr('selected', true);
					} else {
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
							$.post(ROOT + `admin/updateLecturer`, formData,
								function (data, textStatus, jqXHR) {
									if (data) {
										$('.main.popup-edit.lecturer').trigger('click');
										setTimeout(() => {
											parentThis.getInforLecturer();
										}, 300);
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
						role: 'student',
						type: 'majors'
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
							<img src=${data[i].image !== null ?ROOT+`public/images/${data[i].image}` : ROOT + "public/images/anonymous.jpg"} alt="">
						</div>
						<div class="account">${data[i].account}</div>
					</div>
					<p>${data[i].user_name}</p>
					<p>${data[i].email}</p>
					<p>${data[i].phone !== null ? data[i].phone : `Chưa cung cấp`}</p>
					<p>${data[i].major_name}</p>
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
					} else {
						$(valueOfElement).attr('selected', false);
					}
				});
				$.each(status, function (indexInArray, valueOfElement) {
					if (unique.status === $(valueOfElement).val()) {
						$(valueOfElement).attr('selected', true);
					} else {
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
			const { html, list, path, totalPages, role, type } = rest;
			let htmlTotalPages = "";
			for (let i = 0; i < totalPages; i++) {
				htmlTotalPages += `<li data-ID='${i}' >${i + 1}</li>`
			}
			$(html).html(htmlTotalPages);
			this.handlePagination({ list, path, role, type });

		},
		handlePagination({ ...rest }) {
			const { list, path, role, type } = rest;
			const _this = this;
			$(list).eq(0).addClass('active');
			$(list).on('click', function () {
				const index = $(this).index();
				const currentPage = parseInt($(this).attr('data-ID'));
				$(list).removeClass('active');
				$(list).eq(index).addClass('active');
				$.post(ROOT + path, { currentPage: currentPage },
					function (data, textStatus, jqXHR) {
						_this[role](data[role], data[type]);
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
		formData: [],
		id_course:null,
		id_subject:null,
		id_quizz:null,
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
					const admin = JSON.parse(sessionStorage.getItem('info'));
					forms.push({ name: 'admin', value: admin.id })
					$.post(ROOT + "admin/addCourse", forms,
						function (data, textStatus, jqXHR) {
							if (data) {
								swal('Thêm khoá học thành công', { icon: 'success', button: false, timer: 1000 });
								$('.popup-add-courses').trigger('click');
								_this.getCourses();
							} else {
								swal({
									icon: 'error',
									title: 'Thêm khoá học thất bại!',
									text: 'Không được phép trùng tên khoá học!',
									button: false,
									timer: 2000
								});
							}
						},
						"json"
					);

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
			});

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
				selectors: [checkBlank('#edit'), checkLength('#edit', 3)],
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
		renderCourse(data = []) {
			let html = "";
			for (let i = 0; i < data.length; i++) {
				html += `<div data-ID="${data[i].id_course}" class="item">
							<input type="checkbox" name="" id="">
							<p>${data[i].id_course}</p>
							<p class="name">${data[i].course_name}</p>
							<p>${data[i].account}</p>
							<p>${data[i].user_name}</p>
							<p class="icon"><i class='bx bx-edit edit'></i></p>
							<p class="icon"><i class='bx bx-trash trash'></i></p>
							<p class="icon"><i class='bx bx-folder-plus plus'></i></p>
							<p class="icon"><i class='bx bx-filter-alt filter'></i></p>
						</div>`
			};
			$('.admin .tabs .courses .container .item-courses.course .content').html(html);
			this.editCourse();
			this.deleteCourse();
			this.addSubject();
			this.filterSubject();
		},
		filterSubject() {
			const _this = this;
			$('.admin .tabs .courses .container .item-courses.course .content .item p.icon i.filter').on('click', function () {
				const ID = $(this).parents('.item').attr('data-id');
				_this.id_course = ID;
				$('.admin .tabs .courses .container .item-courses').fadeOut(300);
				$('.admin .tabs .courses .container .item-courses').eq(1).fadeIn(300);
				const width = $('.admin .tabs .courses .wrapper-courses-filter .filter-courses .role').eq(1).width();
				const position = $('.admin .tabs .courses .wrapper-courses-filter .filter-courses .role').eq(1).position().left;
				$('.admin .tabs .courses .wrapper-courses-filter .filter-courses .line').css('left', `${position}px`);
				$('.admin .tabs .courses .wrapper-courses-filter .filter-courses .line').css('width', `${width}px`);
				$.post(ROOT + "admin/getIdSubject", { id_course: ID },
					function (data, textStatus, jqXHR) {
						_this.renderSubject(data);
					},
					"json"
				);
			});
		},
		callbackSubject(){
			const _this = this;
			$.post(ROOT + "admin/getIdSubject", { id_course: _this.id_course },
				function (data, textStatus, jqXHR) {
					_this.renderSubject(data);
				},
				"json"
			);
		},
		renderSubject(data) {
			let html = "";
			for (let i = 0; i < data.length; i++) {
				html += `<div data-id="${data[i].id}" class="item">
						<div class="wrapper">
							<div class="top">		
									<img src="${data[i].image !== null ? ROOT + `public/images/${data[i].image}` : ROOT + "public/images/default_image.webp"}" alt="">
								<div class="content">
									<p class="update-at">Ngày tạo ${data[i].create_at}</p>
									<p class="title">${data[i].subject_name}</p>
									<p class="description">${data[i].description}</p>
								</div>
								<div class="info">
									<p>ID: <span>${data[i].id}</span></p>
									<p>Cấp độ: <span>${data[i].education_name}</span></p>
									<p>Khoá học: <span>${data[i].course_name}</span></p>
									<p>Giảng viên đảm nhiệm: <span>${data[i].user_name}</span></p>
									<p>Trạng thái: <span>${parseInt(data[i].is_private) === 0 ? 'Công khai' : 'Riêng tư'}</span></p>
									<p>Mã môn: <span>${data[i].subject_code !== null ? data[i].subject_code : "Không có mã code"}</span></p>
								</div>
							</div>
							<div class="bottom">
								<div class="wrapper-profile">
									<img src="${data[i].image !== null ? ROOT + `public/images/${data[i].image}` : ROOT + "public/images/default_image.webp"}" alt="">
								</div>
								<div class="wrapper-action">
									<p><i class='bx bx-list-ul list'></i>Danh sách câu hỏi</p>
									<p><i class='bx bx-plus-circle add'></i>Thêm Quizz</p>
									<p><i class='bx bx-edit edit'></i>Sửa môn học</p>
									<p><i class='bx bx-trash delete'></i>Xoá môn học</p>
								</div>
							</div>
						</div>
											
					</div>`
			}
			$('.item-courses.subject').html(html).hide().slideDown(800);
			this.deleteSubject(this.id_course);
			this.editSubject(this.id_course);
			this.addQuizName();
			this.listQuizz();
		},
		deleteSubject() {
			const _this = this;
			$('.item-courses.subject .item .bottom .wrapper-action i.delete').parent('p').on('click', function () {
				const id = $(this).parents('.item').attr('data-id');
				swal(`Bạn có chắc chắn muốn xoá ID: ${id}?`, {
					icon: 'error',
					buttons: {
						cancel: true,
						confirm: true
					}
				}).then(data => {
					if (data) {
						$.post(ROOT + "admin/deleteSubject", { id: id },
							function (data, textStatus, jqXHR) {
								if (data) {
									_this.callbackSubject(_this.id_course);
									swal('Xoá môn học thành công', { icon: 'success', timer: 1000 });
								}
							},
							"json"
						);
					}
				})

			});
		},
		editSubject() {
			const _this = this;
			$('.popup-edit-subject').on('click', function () {
				$('.popup-edit-subject').removeClass('active');
				$('.popup-edit-subject .wrapper form .col-left .input-box.status .screen').off('click');
			});
			$('.popup-edit-subject .wrapper').on('click', function (e) {
				e.stopPropagation();
			});
			$('.item-courses.subject .item .bottom .wrapper-action i.edit').parent('p').on('click', function () {
				$('.popup-edit-subject').addClass('active');
				const id = $(this).parents('.item').attr('data-id');
				$.post(ROOT + "admin/editSubject", { id: id },
					function (data, textStatus, jqXHR) {
						renderEdit(data, id);
					},
					"json"
				);
			});
			function renderEdit(data, id) {
				$('.popup-edit-subject .form-popup-edit-subject').find('input[name="subject_name"]').val(data.subject_name);
				$('.popup-edit-subject .form-popup-edit-subject').find('input[name="id"]').val(id);
				$('.popup-edit-subject .form-popup-edit-subject').find('textarea[name="description"]').val(data.description);
				$('.popup-edit-subject .form-popup-edit-subject .input-box.status .screen').text(parseInt(data.is_private) === 0 ? 'Công khai' : 'Riêng tư');
				$('.popup-edit-subject .wrapper form .col-left .input-box.status input[name="is_private"]').val(data.is_private);
				$('.popup-edit-subject .wrapper form .col-left .input-box.status .screen').on('click', function () {
					$('.popup-edit-subject .wrapper form .col-left .input-box.status ul').toggleClass('active');

				});
				$('.popup-edit-subject .wrapper form .col-left .input-box.status ul li').on('click', function () {
					$('.popup-edit-subject .wrapper form .col-left .input-box.status ul').removeClass('active');
					const id = $(this).attr('data-id');
					const text = $(this).text();
					$('.popup-edit-subject .wrapper form .col-left .input-box.status input[name="is_private"]').val(id);
					$('.popup-edit-subject .form-popup-edit-subject .input-box.status .screen').text(text);
				});
				$('.popup-edit-subject .wrapper form .col-right .wrapper-image i').on('click', function () {
					$('.popup-edit-subject .form-popup-edit-subject .col-right input[name="image"]').click();
				});
				$('.popup-edit-subject .wrapper form .col-right input[name="image"]').on('change', function () {
					const text = this.value;
					const formData = new FormData();
					formData.append('image', this.files[0]);
					_this.formData = formData;
					$('.popup-edit-subject .wrapper form .col-right .title-image').text(text);
					$('.popup-edit-subject .form-popup-edit-subject .col-right input[name="image-text"]').val(this.files[0].name);
				});

			}
			validate({
				form: '.form-popup-edit-subject',
				selectors: [
					checkBlank('input[name="subject_name"]'),
					checkLength('input[name="subject_name"]', 8),
					checkBlank('textarea[name="description"]'),
					checkLength('textarea[name="description"]', 12)
				],
				callback(forms) {
					const obj = {};
					for (let i = 0; i < forms.length; i++) {
						obj[forms[i].name] = forms[i].value;
					};
					fetch(ROOT + "admin/addImage", {
						method: 'post',
						body: _this.formData
					});
					if (parseInt(obj.is_private) === 1) {
						obj.subject_code = _this.randomSubjectCode();
					}
					$.post(ROOT + "admin/sendEditSubject", obj,
						function (data, textStatus, jqXHR) {
							if (data) {
								$('.popup-edit-subject .wrapper form .col-left .input-box.status ul li').off('click');
								$('.popup-edit-subject .wrapper form .col-left .input-box.status .screen').off('click');
								$('.popup-edit-subject').removeClass('active');
								_this.callbackSubject(_this.id_course);
								swal('Sửa môn học thành công', { icon: 'success', timer: 1000, button: false });
							}
						},
						"json"
					);
				}
			});
		},
		addSubject() {
			const _this = this;
			$('.admin .tabs .courses .container .item-courses.course .content .item p.icon i.plus').on('click', function () {
				$('.popup-configuration-subject').addClass('active');
				const id_course = parseInt($(this).parents('.item').attr('data-ID'));
				$('.popup-configuration-subject .input-box.course input[name="id_course"]').val(id_course);
				const course_name = $(this).parents('.item').find('.name').text();
				let ID = null;
				switch (id_course) {
					case 1:
					case 2:
					case 3:
					case 4:
					case 5:
						ID = 1;
						_this.selectLecturerEducation(ID, course_name);
						break;
					case 6:
					case 7:
					case 8:
					case 9:
						ID = 2;
						_this.selectLecturerEducation(ID, course_name);
						break;
					case 10:
					case 11:
					case 12:
						ID = 3;
						_this.selectLecturerEducation(ID, course_name);
						break;
					default:
						ID = 4;
						_this.selectLecturerEducation(ID, course_name);
						break;
				}

			});
			$('.popup-configuration-subject').on('click', function () {
				$('.popup-configuration-subject').removeClass('active');
				$('.popup-configuration-subject .form-popup-configuration-subject .col-right .input-box.lecturer .show-screen').off('click');
				$('.popup-configuration-subject .input-box.lecturer .show-screen .screen').delay(500).text("Lựa chọn giảng viên phụ trách");
				$('.popup-configuration-subject .input-box.lecturer input[name="id_lecturer"]').val("");
			})

			$('.popup-configuration-subject .wrapper').on('click', function (e) {
				e.stopPropagation();
			})
			$('.popup-configuration-subject .content .wrapper-image').on('mousedown', function () {
				$('.popup-configuration-subject .content input[name="image"]').click();
			});
			$('.popup-configuration-subject .content input[name="image"]').on('change', function () {
				$('.popup-configuration-subject .content .infor').text($(this).val());
				const formData = new FormData();
				formData.append('image', this.files[0]);
				_this.formData = formData;
				$('.popup-configuration-subject .content input[name="image-text"]').val(this.files[0].name);
			});
			//////////////////////////////////////////////////////////////////////////////////////////////////////
			$('.popup-configuration-subject .input-box.select .show-screen').on('mousedown', function () {
				$('.popup-configuration-subject .input-box.select ul').toggleClass('active');
			});

			$('.popup-configuration-subject .input-box.select ul li').on('mousedown', function () {
				const id = $(this).attr('data-id');
				const content = $(this).text();
				$('.popup-configuration-subject .input-box.select .show-screen .screen').text(content);
				$('.popup-configuration-subject .input-box.select input[name="isPrivate"]').val(id);
				$('.popup-configuration-subject .input-box.select .show-screen ul li').removeClass('active');
			});
			//////////////////////////////////////////////////////////////////////////////////////////////////////
			validate({
				form: '.form-popup-configuration-subject',
				selectors: [
					checkBlank('input[name="title"]'),
					checkLength('input[name="title"]', 8),
					checkBlank('textarea[name="description"]'),
					checkLength('textarea[name="description"]', 12),
					// checkBlank('input[name="image"]'),
					checkBlank('input[name="isPrivate"]'),
					checkBlank('input[name="id_lecturer"]')
				],
				callback(forms) {
					let newForms = forms.reduce((acc, curr) => {
						acc[curr.name] = curr.value;
						return acc;
					}, {});

					if (parseInt(newForms.isPrivate) === 1) {
						newForms.subject_code = _this.randomSubjectCode();
						_this.sendSubjectIntoDB(newForms);
						return;
					}
					_this.sendSubjectIntoDB(newForms);
				}
			})
		},
		addQuizName() {
			const _this = this;
			let id = null;
			$('.item-courses.subject .item .bottom .wrapper-action i.add').parent('p').on('click', function () {
				id = parseInt($(this).parents('.item').attr('data-id'));
				_this.id_subject = id;
				$('.popup-add-quiz-name').addClass('active');
				$('.popup-add-quiz-name .wrapper h1').text(`Bạn đang thêm câu hỏi ở môn học có ID: ${id}`)
			});
			$('.popup-add-quiz-name').on('click', function () {
				$('.popup-add-quiz-name').removeClass('active');
				id = null;
			})
			$('.popup-add-quiz-name .wrapper').on('click', function (e) {
				e.stopPropagation();
			});
			validate({
				form: '.form-add-quiz-name',
				selectors: [
					checkBlank('input[name="quiz-name"]'),
					checkLength('input[name="quiz-name"]', 4)
				],
				callback(forms) {
					const newForms = forms.reduce((acc, curr) => {
						acc[curr.name] = curr.value;
						return acc;
					}, {});
					newForms.id_subject = id;
					$.post(ROOT + "admin/addQuizName", newForms,
						function (data, textStatus, jqXHR) {
							if (data) {
									$('.admin .tabs .courses .container .item-courses').fadeOut(300);
									$('.admin .tabs .courses .container .item-courses').eq(2).fadeIn(300);
									const width = $('.admin .tabs .courses .wrapper-courses-filter .filter-courses .role').eq(2).width();
									const position = $('.admin .tabs .courses .wrapper-courses-filter .filter-courses .role').eq(2).position().left;
									$('.admin .tabs .courses .wrapper-courses-filter .filter-courses .line').css('left', `${position}px`);
									$('.admin .tabs .courses .wrapper-courses-filter .filter-courses .line').css('width', `${width}px`);
									$('.popup-add-quiz-name').removeClass('active');
									_this.callbackListQuizz();
									swal('Thêm quizz thành công', { icon: 'success', timer: 1000, button: false });
								
							} else {
								swal('Không được trùng tên trắc nhiệm đã tồn tại!', { icon: 'error', timer: 1000, button: false });
							}
						},
						"json"
					);
				}
			})
		},
		listQuizz() {
			const _this = this;
			$('.item-courses.subject .item .bottom .wrapper-action i.list').parent('p').on('click', function () {
				const id = $(this).parents('.item').attr('data-id');
				_this.id_subject = id;
				$('.admin .tabs .courses .container .item-courses').fadeOut(300);
				$('.admin .tabs .courses .container .item-courses').eq(2).fadeIn(300);
				const width = $('.admin .tabs .courses .wrapper-courses-filter .filter-courses .role').eq(2).width();
				const position = $('.admin .tabs .courses .wrapper-courses-filter .filter-courses .role').eq(2).position().left;
				$('.admin .tabs .courses .wrapper-courses-filter .filter-courses .line').css('left', `${position}px`);
				$('.admin .tabs .courses .wrapper-courses-filter .filter-courses .line').css('width', `${width}px`);
				$.post(ROOT + "admin/getIdQuizz", { id_subject: id },
					function (data, textStatus, jqXHR) {
						_this.renderQuizz(data);
					},
					"json"
				);
			});
		},
		callbackListQuizz(){
			const _this = this;
			$.post(ROOT + "admin/getIdQuizz", { id_subject: _this.id_subject },
				function (data, textStatus, jqXHR) {
					_this.renderQuizz(data);
				},
				"json"
			);
		},
		renderQuizz(data) {
			let html = "";
			for (let i = 0; i < data.length; i++) {
				html += `
				<div data-id="${data[i].id}" class="item">
							<p>${data[i].id}</p>
							<p class="quizz_name">${data[i].quizz_name}</p>
							<p class='id_subject'>${data[i].id_subject}</p>
							<p>${data[i].subject_name}</p>
							<p><i class='bx bx-layer question-lists'></i></p>
							<p><i class='bx bx-plus-circle plus'></i></p>
							<p><i class='bx bx-edit edit'></i></p>
							<p><i class='bx bx-trash delete'></i></p>
						</div>
						`
			}
			$('.item-courses.quizz .content').html(html).hide().slideDown(800);
			this.deleteQuizz();
			this.editQuizz();
			this.createQuestionFromQuizz();
			this.listQuestion();
		},
		deleteQuizz() {
			const _this = this;
			$('.item-courses.quizz .content .item p i.delete').parent('p').on('click', function () {
				const id = parseInt($(this).parents('.item').attr('data-id'));
				swal({
					title: `Bạn có chắc chắn muốn xoá ID: ${id}`,
					text: 'Điều này sẽ không thể khôi phục những câu hỏi từ trắc nhiệm',
					icon: 'warning',
					buttons: {
						cancel: true,
						confirm: true
					}
				}).then(type => {
					if (type) {
						$.post(ROOT + "admin/deleteQuizz", { id: id },
							function (data, textStatus, jqXHR) {
								_this.callbackListQuizz();
								swal('Xoá thành công', { timer: 1000, icon: 'success', button: false });
							},
							"json"
						);
					}
				})
			});
		},
		editQuizz() {
			const _this = this;
			let id = null;
			let id_subject = null;
			$('.item-courses.quizz .content .item p i.edit').parent('p').on('click', function () {
				id = $(this).parents('.item').attr('data-id');
				id_subject = parseInt($(this).parents('.item').find('.id_subject').text());
				const text = $(this).parents('.item').find('.quizz_name').text();
				$('.popup-edit-quizz').addClass('active');
				$('.popup-edit-quizz').find('input[name="quizz"]').val(text);
			});
			$('.popup-edit-quizz').on('click', function () {
				$('.popup-edit-quizz').removeClass('active');
				$('.popup-edit-quizz').find('input[name="quizz"]').val('');
			});
			$('.popup-edit-quizz .wrapper').on('click', function (e) {
				e.stopPropagation();
			});
			validate({
				form: '.popup-edit-quizz .form-edit-quiz',
				selectors: [
					checkBlank('input[name="quizz"]'),
					checkLength('input[name="quizz"]', 4)
				],
				callback(forms) {
					const obj = {};
					for (let i = 0; i < forms.length; i++) {
						obj[forms[i].name] = forms[i].value;
					}
					obj.id = id;
					obj.id_subject = id_subject;
					$.post(ROOT + "admin/editQuizz", obj,
						function (data, textStatus, jqXHR) {
							if (data) {
								$('.popup-edit-quizz').removeClass('active');
								_this.callbackListQuizz();
								swal('Sửa thành công', { timer: 1000, icon: 'success', button: false });
							} else {
								swal('Không được trùng lặp', { timer: 1000, icon: 'error', button: false });

							}
						},
						"json"
					);
				}
			})
		},
		listQuestion() {
			const _this = this;
			$('.item-courses.quizz .content .item p i.question-lists').parent('p').on('click', function () {
				const id = parseInt($(this).parents('.item').attr('data-id'));
				_this.id_quizz = id;
				$('.admin .tabs .courses .container .item-courses').fadeOut(300);
				$('.admin .tabs .courses .container .item-courses').eq(3).fadeIn(300);
				const width = $('.admin .tabs .courses .wrapper-courses-filter .filter-courses .role').eq(3).width();
				const position = $('.admin .tabs .courses .wrapper-courses-filter .filter-courses .role').eq(3).position().left;
				$('.admin .tabs .courses .wrapper-courses-filter .filter-courses .line').css('left', `${position}px`);
				$('.admin .tabs .courses .wrapper-courses-filter .filter-courses .line').css('width', `${width}px`);
				$.post(ROOT + "admin/listQuestion", { id_quizz: id },
					function (data, textStatus, jqXHR) {
						_this.renderQuestion(data);
					},
					"json"
				);
			});
		},
		callbackListQuestion(){
			const _this = this;
			$.post(ROOT + "admin/listQuestion", { id_quizz: _this.id_quizz },
				function (data, textStatus, jqXHR) {
					_this.renderQuestion(data);
				},
				"json"
			);
		},
		renderQuestion(data) {
			let html = "";
			for (let i = 0; i < data.length; i++) {
				html += `
				<div data-id="${data[i].id_question}" class="item">
							<p>${data[i].id_question}</p>
							<p class="quizz_name">${data[i].question}</p>
							<p class='id_subject'>${data[i].answers}</p>
							<p>${data[i].result}</p>
							<p data-id="${data[i].id_quizz}"><i class='bx bx-edit edit'></i></p>
							<p><i class='bx bx-trash delete'></i></p>
						</div>
				`
			};
			$('.item-courses.question .content').html(html).hide().slideDown(800);
			this.deleteQuestion();
			this.editQuestion(data);
		},
		deleteQuestion() {
			const _this = this;
			$('.item-courses.question .content .item p i.delete').on('click', function () {
				const id = parseInt($(this).parents('.item').attr('data-id'));
				swal(`Bạn có chắc chắn muốn xoá ID: ${id}?`, {
					icon: 'warning',
					buttons: {
						cancel: true,
						confirm: true
					}
				}).then(data => {
					if (data) {
						$.post(ROOT + "admin/deleteQuestion", { id: id },
							function (data, textStatus, jqXHR) {
								if (data) {
									_this.callbackListQuestion();
									swal(`Xoá câu hỏi thành công`, { icon: 'success', timer: 1000, button: false });
								}
							},
							"json"
						);
					}
				})
			});
		},
		editQuestion(data) {
			const _this = this;
			let id_quizz = null;
			let id_question = null;
			$('.item-courses.question .content .item p i.edit').on('click', function () {
				id_quizz = parseInt($(this).parent('p').attr('data-id'));
				id_question = parseInt($(this).parents('.item').attr('data-id'));
				$('.popup-edit-question').addClass('active');
				let [obj] = data.filter(item => parseInt(item.id_question) === id_question);
				$('.popup-edit-question .form-edit-question input[name="question"]').val(obj.question);
				$('.popup-edit-question .form-edit-question input[name="answers"]').val(obj.answers);
				$('.popup-edit-question .form-edit-question input[name="result"]').val(obj.result);
			});
			$('.popup-edit-question .wrapper').on('click', function (e) {
				e.stopPropagation();
			});
			$('.popup-edit-question').on('click', function () {
				$('.popup-edit-question').removeClass('active');
				$('.popup-edit-question .form-edit-question input[name="question"]').val('');
				$('.popup-edit-question .form-edit-question input[name="answers"]').val('');
				$('.popup-edit-question .form-edit-question input[name="result"]').val('');
			});
			validate({
				form: '.form-edit-question',
				selectors: [
					checkBlank('input[name="question"]'),
					checkLength('input[name="question"]', 8),
					checkBlank('input[name="answers"]'),
					checkLength('input[name="answers"]', 8),
					checkBlank('input[name="result"]'),
					checkLength('input[name="result"]', 1),
				],
				callback(forms) {
					const newForm = forms.reduce((accu, curr) => {
						accu[curr.name] = curr.value;
						return accu;
					}, {});

					const isMatch = newForm.answers.split(',').map(item => item.trim()).some(item => item === newForm.result);
					newForm.id_quizz = id_quizz;
					newForm.id_question = id_question;
					if (isMatch) {
						$.post(ROOT + "admin/editQuestion", newForm,
							function (data, textStatus, jqXHR) {
								if (data) {
									swal('Sửa thành công', {
										icon: 'success',
										timer: 1000,
										button: false
									});
									$('.popup-edit-question').removeClass('active');
									_this.callbackListQuestion();
								} else {
									swal('Không được phép trùng tên câu hỏi đã tồn tại!', {
										icon: 'error',
										timer: 1000,
										button: false
									})
								}
							},
							"json"
						);
					} else {
						swal('Bắt buộc phải khớp 1 trong 4 đáp án trên!', {
							icon: 'error',
							button: false
						})
					}
				}
			})
		},
		createQuestionFromQuizz() {
			$('.item-courses.quizz .content .item p i.plus').parent('p').off('click').on('click', function () {
				$('.admin .tabs').fadeOut(1);
				$('.admin .tabs').eq(3).fadeIn();
				$('aside .menu .menu-tab ul li').removeClass('mark');
				$('aside .menu .menu-tab ul li').eq(3).addClass('mark');
				const id = parseInt($(this).parents('.item').attr('data-id'));
				$('.admin .tabs.subject .container .quiz .list-question .list').html('');
				$('.admin .tabs.subject .container .quiz .quizzes .wrapper-data-fill').html('');
				$('.admin .tabs.subject > header h1#create-subject').removeClass('add-question');
				$('.admin .tabs.subject > header h1#create-subject').find('span').text("Tạo đề thi nhanh");
				subject_quizz.main();
				subject_quizz.dataSimulator = [];
				subject_quizz.ID_quizz = id;
			});
		},
		sendSubjectIntoDB(send) {
			fetch(ROOT + "admin/addImage", {
				method: "post",
				body: this.formData
			})
				.catch(console.error);
			$.post(ROOT + "admin/addSubject", send,
				function (data, textStatus, jqXHR) {
					if (data.type) {
						swal('Thêm môn học thành công', { icon: 'success', button: false, timer: 1000 });
						$('.popup-configuration-subject').trigger('click');
					} else {
						swal('Môn học này đã tồn tại!', { icon: 'error', button: false, timer: 1500 });
					}
				},
				"json"
			);
		},
		randomSubjectCode() {
			const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
			let code = "";
			for (let i = 0; i < 12; i++) {
				code += characters.charAt(Math.floor(Math.random() * characters.length));
			}
			return code;
		},
		selectLecturerEducation(ID, course_name) {
			const _this = this;
			$.post(ROOT + "admin/selectLecturerEducation", { id_course: ID },
				function (data, textStatus, jqXHR) {
					_this.renderInforLecturer(data, course_name);
				},
				"json"
			);
		},
		renderInforLecturer(data, course_name) {
			$('.popup-configuration-subject .input-box.course .show-screen .screen').text(course_name);
			////////////////////////////////////////////////////////////////////////////////
			let html = $.map(data, (item, index) => `
			<li data-id="${item.id_lecturer}">${item.user_name}</li>
			`).join('');
			$('.popup-configuration-subject .form-popup-configuration-subject .col-right .input-box.lecturer ul').html(html);
			$('.popup-configuration-subject .form-popup-configuration-subject .col-right .input-box.lecturer .show-screen').on('click', function () {
				$('.popup-configuration-subject .form-popup-configuration-subject .col-right .input-box.lecturer ul').toggleClass('active');
			});
			$('.popup-configuration-subject .form-popup-configuration-subject .col-right .input-box.lecturer ul li').on('click', function () {
				const id = $(this).attr('data-id');
				const content = $(this).text();
				$('.popup-configuration-subject .input-box.lecturer .show-screen .screen').text(content);
				$('.popup-configuration-subject .input-box.lecturer input[name="id_lecturer"]').val(id);
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
		ID_quizz: null,
		events() {
			const _this = this;
			$('.admin .tabs.subject .container .quiz').fadeOut();
			$('.admin .tabs.subject > header h1#create-subject').off('click').on('click', function () {
				if ($('.admin .tabs.subject > header h1#create-subject').hasClass('add-question')) {
					$('.popup-add-quizz').addClass('active');
				}
				$('.admin .tabs.subject > header h1#create-subject').addClass('add-question');
				$('.admin .tabs.subject > header h1#create-subject').find('span').text("Thêm câu hỏi");
				$('.admin .tabs.subject .container .quiz').slideDown(600);
				$('.admin .tabs.subject .wrapper-add').fadeIn(500);
			});
			////////////////////////////////////////////////////////////
			$('.popup-add-quizz').off('click').on('click', function () {
				$('.popup-add-quizz').removeClass('active');
			})
			$('.popup-add-quizz .wrapper').off('click').on('click', function (e) {
				e.stopPropagation();
			});
		},
		addQuestion() {
			const _this = this;
			validate({
				form: '.form-add-quizz', selectors: [
					checkBlank('#question'),
					checkLength('#question', 5),
					checkBlank('#answers'),
					checkLength('#answers', 3),
					checkBlank('#result'),
					checkLength('#result', 1),
				], callback(forms) {
					const test = {};
					$.each(forms, function (indexInArray, valueOfElement) {
						test[valueOfElement.name] = valueOfElement.value.trim();
					});
					test.answers = test.answers.split(',').map(item => item.trim()).join(',');
					const arrayAnswers = test.answers.split(',');
					if (arrayAnswers.includes(test.result)) {
						const isDuplicate = _this.dataSimulator.some(item => item.question.includes(test.question));
						if (isDuplicate) {
							swal('Tuyệt đối không được trùng câu hỏi!', { icon: 'error', button: false, timer: 2000 });
						} else {
							_this.dataSimulator.push(test);
							_this.renderQuestion();
						}
					} else {
						swal('Bắt buộc phải khớp 1 trong 4 câu hỏi trên!', { icon: 'error', button: false, timer: 2000 });
					}
				}
			});
		},
		renderQuestion() {
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
									<div class="edit"><i class='bx bx-edit edit'></i></div>
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
							</div>
							<div class="correct-answer input-box">
									<label for="">Câu trả lời đúng là: </label>
									<span class="question-text">${this.dataSimulator[i].result}</span>
									<p class="message"></p>
								</div>
								<input type="submit" hidden>
						</form>`;
				answersHTML = "";
				questionLists += `<a class="item" href="#item-${i}">${i + 1}</a>`;
			}
			$('.admin .tabs.subject .container .quiz .list-question .list').html(questionLists).hide().fadeIn(500);
			$('.admin .tabs.subject .container .quiz .quizzes .wrapper-data-fill').html(html).hide().slideDown(800);
			$('.admin .tabs.subject .container .quiz .list-question .list .item').off('click').on('click', function () {
				$('.admin .tabs.subject .container .quiz .list-question .list .item').removeClass('active');
				$(this).addClass('active');
			});
			this.editQuestion();
			this.deleteQuestion();
			if (this.dataSimulator.length > 4) {
				$('.admin .tabs.subject .container .quiz .list-question .bottom-wrapper--confirm .confirm p').addClass('show');
			} else {
				$('.admin .tabs.subject .container .quiz .list-question .bottom-wrapper--confirm .confirm p').removeClass('show');
			}
		},
		editQuestion() {
			const _this = this;
			function handleEditForm(id_item, newActiveSelectors, currentIndex) {
				validate({
					form: `.admin .tabs.subject .container .quiz .quizzes .wrapper-data-fill .item#${id_item}`,
					selectors: newActiveSelectors,
					callback(forms) {
						const obj = forms.reduce((acc, cur) => {
							if (!acc[cur.name]) {
								acc[cur.name] = [];
							}
							acc[cur.name].push(cur.value);
							return acc;
						}, {});
						let [question] = obj.question;
						obj.question = question;
						let [result] = obj.result;
						obj.result = result;
						const [item,num] = id_item.split('-');
						const ID_duplicate = parseInt(num);
						let isDuplicate = null;
						for(let i = 0;i<_this.dataSimulator.length;i++){
							if(i !== ID_duplicate){
								isDuplicate = _this.dataSimulator[i].question === obj.question ? true :false;
								if(isDuplicate) break;	
							}
						}
						if (isDuplicate) {
							swal('Không được trùng câu hỏi!', { icon: 'error', button: false, timer: 1500 });
							return;
						}
						const isFoundMatchAnswer = obj.answers.some(item => item === obj.result);
						if (!isFoundMatchAnswer) {
							swal('Bắt buộc phải khớp 1 trong 4 đáp án!', { icon: 'error', button: false, timer: 1500 });
							return;
						}
						obj.answers = obj.answers.join(",");
						_this.dataSimulator[currentIndex] = obj;
						_this.renderQuestion();
					}
				});
			}
			$('.admin .tabs.subject .container .quiz .quizzes .wrapper-data-fill .item .current i.edit').off('click').on('click', function () {
				$(this).closest('.item').find('.current .edit').fadeOut(300);
				// $(this).closest('.item').find('.current .wrapper-icon').prepend(`<div class="save"><i class='bx bx-save save'></i></div>`).hide(0).fadeIn(100);
				const currentIndex = $(this).closest('.item').index();
				const id_item = $(this).closest('.item').attr(`id`);
				const currentObj = _this.dataSimulator[currentIndex];
				const question = currentObj.question;
				const answers = currentObj.answers.split(',');
				const result = currentObj.result;
				$(this).closest('.item').find('.question .input-box .question-text').replaceWith(`
				<input type="text" name="question" id="question" value="${question}">	
				`);
				let count = 0;
				$(this).closest('.item').find('.answers .input-box .question-text').each((index, element) => {
					$(element).replaceWith(`<input type="text" name="answers" id="answers-${index}" value="${answers[index]}">`);
					count++;
				})
				let arr = [];
				for (let i = 0; i < count; i++) {
					arr.push(checkBlank(`#answers-${i}`));
				}
				let activeSelectors = [
					checkBlank('#question'),
					checkLength('#question', 5),
					arr,
					checkBlank('#result')
				];
				handleEditForm(id_item, activeSelectors.flat(), currentIndex);
				$(this).closest('.item').find('.correct-answer.input-box .question-text').replaceWith(`
					<input type="text" name="result" id="result" value="${result}">
				`);
			});

		},
		deleteQuestion() {
			const _this = this;
			$('.admin .tabs.subject .container .quiz .quizzes .wrapper-data-fill .item .current i.trash').off('click').on('click', function () {
				const ID = $(this).closest('.item').index();
				swal(`Bạn có chắc chắn muốn xoá câu hỏi số: ${ID + 1}`,
					{
						icon: 'warning',
						buttons: {
							cancel: true,
							confirm: true
						}
					}
				).then(data => {
					if (data) {
						_this.dataSimulator.splice(ID, 1);
						_this.renderQuestion();
					}
				})
			})
		},
		configurationSubject() {
			const _this = this;
			$('.admin .tabs.subject .container .quiz .list-question .bottom-wrapper--confirm .confirm p').off('click').on('click', function () {
				$.post(ROOT + "admin/addQuestion", {
					data: _this.dataSimulator,
					id_quizz: _this.ID_quizz
				},
					function (data, textStatus, jqXHR) {
						if (data) {
							swal(`Thêm những câu hỏi vào trắc nhiệm có ID: ${_this.ID_quizz} thành công!`, {
								icon: 'success',
								button: false,
								timer: 2000
							});
							$('.admin .tabs').fadeOut(1);
							$('.admin .tabs').eq(2).fadeIn();
							$('aside .menu .menu-tab ul li').removeClass('mark');
							$('aside .menu .menu-tab ul li').eq(2).addClass('mark');
							$('.admin .tabs.subject .container .quiz .list-question .list').html('');
							$('.admin .tabs.subject .container .quiz .quizzes .wrapper-data-fill').html('');
							$('.admin .tabs.subject > header h1#create-subject').removeClass('add-question');
							$('.admin .tabs.subject > header h1#create-subject').find('span').text("KHÔNG THỂ TẠO NẾU KHÔNG CÓ ID CỤ THỂ");
							$('.admin .tabs.subject .container .quiz .list-question .bottom-wrapper--confirm .confirm p').removeClass('show');
							_this.dataSimulator = [];
							_this.ID_quizz = null;
							$('.admin .tabs.subject > header h1#create-subject').off('click');
						} else {
							swal(`Phát hiện 1 số câu hỏi bị trùng trong cơ sở dữ liệu!`, {
								icon: 'error',
								button: false
							});
						}
					},
					"json"
				);
			});
		},
		main() {
			this.events();
			this.addQuestion();
			this.configurationSubject();
		}
	}
});

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