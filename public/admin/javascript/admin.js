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
		catchEvents(){
			$('.select-btn').on('click',function(){
				$('.options').fadeToggle(300);
			});
			$('.options .option').on('click',function(){
				const value = $(this).find('span').text();
				$('.select-btn').find('.sBtn-text').text(value);
			});
		},
		main(){
			this.catchEvents();
		}
	}
	optionMenu.main();
	const callAPIUser = {
		getUsers(){
			const _this = this;
			$.post(ROOT+`admin/getInforUser`,"",
				function (data, textStatus, jqXHR) {
					console.log(data);
					$('section .tabs header.user .list span').text(data.countAll);
					$('section .tabs header.user .show span').text(data.countAll);
					_this.student(data.student);
					_this.renderListStudentTotalPages(data.totalStudentPages);
					_this.lecturer(data.lecturer,data.totalLecturerPages);
				},
				"json"
			);
		},
		lecturer(data,totalPages){
			let htmlLecturer = "";
			let htmlTotalPages = "";
			for(let i = 0;i<data.length;i++){
				htmlLecturer += `<div data-ID='${data[i].lecturer_ID}' class="item">
					<div class="select-all">
						<input type="checkbox">
					</div>
					<div class="wrapper-image-account">
						<div class="image">
							<img src=${data[i].image !== null ? data[i].image : ROOT+"public/clients/images/anonymous.jpg" } alt="">
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
			for(let i = 0;i<totalPages;i++){
				htmlTotalPages += `<li data-ID='${i}' >${i + 1}</li>`
			}
			$('main .switch-active .panigation.lecturer ul').html(htmlTotalPages);
		},
		student(data){
			let htmlStudents = "";
			for(let i = 0;i<data.length;i++){
				htmlStudents += `<div data-ID='${data[i].student_ID}' class="item">
					<div class="select-all">
						<input type="checkbox">
					</div>
					<div class="wrapper-image-account">
						<div class="image">
							<img src=${data[i].image !== null ? data[i].image : ROOT+"public/clients/images/anonymous.jpg" } alt="">
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
			this.editStudent();
		},
		editStudent(){
			$('main .switch-active .wrapper-content.student .content .icon i.edit').on('click',function(){
				gsap.to('.main.popup-edit', {
					scale: 1,
					duration: .5,
					ease: "back.in",
					onComplete: function () {
						gsap.to('.main.popup-edit .wrapper', {
							duration:.3,
							scale: 1
						})
					}
				});
			});
			$('.main.popup-edit').on('click',function(){
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
			$('.main.popup-edit .wrapper').on('click',function(e){
				e.stopPropagation();
			})
		},
		renderListStudentTotalPages(totalPages){
			let htmlTotalPages = "";
			for(let i = 0;i<totalPages;i++){
				htmlTotalPages += `<li data-ID='${i}' >${i + 1}</li>`
			}
			$('main .switch-active .panigation.student ul').html(htmlTotalPages);
			this.handlePagination();

		},
		handlePagination(){
			const _this = this;
			$('main .switch-active .panigation.student ul li').eq(0).addClass('active');
			$('main .switch-active .panigation.student ul li').on('click',function(){
				const index = $(this).index();
				const currentPage = parseInt($(this).attr('data-ID'));
				$('main .switch-active .panigation.student ul li').removeClass('active');
				$('main .switch-active .panigation.student ul li').eq(index).addClass('active');
				$.post(ROOT+`admin/getInforUser`, {currentPage:currentPage},
					function (data, textStatus, jqXHR) {
						_this.student(data.student);
					},
					"json"
				);
			});

		},
		main(){
			this.getUsers();
		}
	}
	callAPIUser.main();
	
});