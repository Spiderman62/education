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
		main() {
			$('aside .menu ul li').on('click', handleTabs);
			$('aside ul li').removeClass('mark');
			$('aside ul li').eq(1).addClass('mark');
			$('.expand .tab').eq(1).fadeIn(300);
			function handleTabs(e) {
				const index = $(this).index();
				$('aside ul li').removeClass('mark');
				$('aside ul li').eq(index).addClass('mark');
				$('.expand .tab').fadeOut(1);
				$('.expand .tab').eq(index).fadeIn(300);
			};
		}
	}
	tabs.main();
	const callAPISubject = {
		call() {
			const _this = this;
			$.post(ROOT + "quizzStudent/callAPISubject", {},
				function (data, textStatus, jqXHR) {
					_this.render(data);
				},
				"json"
			);
		},
		render(data = []) {
			let htmlCourses = "";
			let htmlSubjects = "";
			for (let i = 0; i < data.length; i++) {
				let subject = data[i].subject;
				for (let j = 0; j < subject.length; j++) {
					htmlSubjects += `
					<div data-id="${subject[j].id_subject}" class="item">
						<div class="wrapper-image">
							<img src=${subject[j].subject_image !== null ? ROOT + `public/images/${subject[j].subject_image}` : ROOT + "public/images/default_image.webp"} alt="">
						</div>
						<div class="content">
							<h1 class="subject_name">${subject[j].subject_name}</h1>
							<div class="infor-lecturer">
								<div class="profile-image">
									<img src=${subject[j].lecturer_image !== null ? ROOT + `public/images/${subject[j].lecturer_image}` : ROOT + "public/images/anonymous.jpg"} alt="">
								</div>
								<p class="lecturer_username">Giảng viên: ${subject[j].user_name}</p>
							</div>
							<p class="create_at"><i class='bx bx-time'></i> ${subject[j].update_at}</p>
							<div class="wrapper-icon">
								<span><i class='bx bxs-help-circle questions'></i>Câu hỏi: ${subject[j].total_questions}</span>
								<span><i class='bx bxs-book book'></i>Trắc nhiệm: ${subject[j].total_quizzes}</span>
							</div>
							<div data-id="${subject[j].id_subject}" class="start"><i class='bx bx-book-content'></i>Bắt đầu</div>
						</div>
					</div>
					`
				};
				htmlCourses += `
				<div class="course-container">
				<div class="top">
					<p class="course-name">${data[i].course_name}</p>
					<p data-id="${data[i].id_course}" class="show--more">Xem tất cả</p>
				</div>
				<div class="bottom">
				${htmlSubjects}
				</div>
			</div>
				`
				htmlSubjects = "";
			}
			$('.expand .courses .handle--course').html(htmlCourses).hide(1).slideDown(2000);
			this.showMore();
			this.getSubjectFromCourse();
		},
		getSubjectFromCourse() {
			const _this = this;
			$('.expand .courses .course-container .bottom .item .content .start').on('click', function () {
				const id_subject = parseInt($(this).attr('data-id'));
				$('.expand .tab.courses .handle--course').fadeOut(300);
				_this.detailSubject(id_subject);
			});
		},
		showMore() {
			const _this = this;
			$('.expand .courses .course-container .top p.show--more').on('click', function () {
				$('.expand .tab.courses .handle--course').fadeOut(300);
				$('.expand .tab.courses .show--more-courses').fadeIn(300);
				const id_course = parseInt($(this).attr('data-id'));
				_this.getAllSubject(id_course);
			});
			$('.expand .tab.courses .show--more-courses .top .wrapper .turn-back').on('click', function () {
				$('.expand .tab.courses .handle--course').fadeIn(300);
				$('.expand .tab.courses .show--more-courses').fadeOut(300);
			});
		},
		getAllSubject(id) {
			const _this = this;
			$.post(ROOT + "quizzStudent/getAllSubjectFromCourse", { id_course: id },
				function (data, textStatus, jqXHR) {
					_this.renderAllSubject(data);
				},
				"json"
			);
		},
		renderAllSubject(data) {
			const _this = this;
			let html = "";
			for (let i = 0; i < data.length; i++) {
				html += `
				<div class="item">
						<div data-id="${data[i].id_subject}" class="item">
							<div class="wrapper-image">
								<img src=${data[i].subject_image !== null ? ROOT + `public/images/${data[i].subject_image}` : ROOT + "public/images/default_image.webp"}  alt="">
							</div>
							<div class="content">
								<h1 class="subject_name">${data[i].subject_name}</h1>
								<div class="infor-lecturer">
									<div class="profile-image">
										<img src=${data[i].lecturer_image !== null ? ROOT + `public/images/${data[i].lecturer_image}` : ROOT + "public/images/anonymous.jpg"} alt="">
									</div>
									<p class="lecturer_username">Giảng viên: ${data[i].user_name}</p>
								</div>
								<p class="create_at"><i class='bx bx-time'></i> ${data[i].update_at}</p>
								<div class="wrapper-icon">
									<span><i class='bx bxs-help-circle questions'></i>Câu hỏi: ${data[i].total_questions}</span>
									<span><i class='bx bxs-book book'></i>Trắc nhiệm: ${data[i].total_quizzes}</span>
								</div>
								<div data-id="${data[i].id_subject}" class="start"><i class='bx bx-book-content'></i>Bắt đầu</div>
							</div>
						</div>
					</div>
				`
			};
			$('.expand .tab.courses .show--more-courses .bottom').html(html).hide().fadeIn(300);
			$('.expand .tab.courses .show--more-courses .bottom .item .start').off('click').on('click', function () {
				const id_subject = parseInt($(this).attr('data-id'));
				$('.expand .tab.courses .show--more-courses').fadeOut(200);
				_this.detailSubject(id_subject);
			});
			
		},
		detailSubject(id_subject = null, is_private = 0, subject_code = null) {
			const _this = this;
			$.post(ROOT + "quizzStudent/detailSubject", {
				id_subject: id_subject,
				is_private: is_private,
				subject_code: subject_code
			},
				function (data, textStatus, jqXHR) {
					if (data) {
						$('.expand .tab.courses .handle--course').fadeOut(300);
						$('.expand .tab.courses .detail-course').fadeIn(300);
						_this.renderDetailSubject(data);
					} else {
						swal(`Không tồn tại môn học!`, { timer: 2000, icon: 'error', button: false });
					}
				},
				"json"
			);
			$('.expand .courses .detail-course .wrapper .turn-back').on('click', function () {
				$('.expand .tab.courses .detail-course').fadeOut(300);
				$('.expand .tab.courses .handle--course').fadeIn(300);
			});
		},
		detailSubjectPrivate() {
			const _this = this;
			validate({
				form: '#search-subject-private',
				selectors: [checkBlank('input[name="code"]')],
				callback(forms) {
					let [name] = forms;
					name = name.value;
					$('.expand .tab.courses .quizz').hide(0);
					_this.detailSubject(null, 1, name);
				}
			})
		},
		renderDetailSubject(data) {
			const subject = $('.expand .courses .detail-course .wrapper .detail-subject');
			subject.find('.wrapper-image img').attr('src', `${data.subject_image !== null ? ROOT + `public/images/${data.subject_image}` : ROOT + "public/images/default_image.webp"}`);
			subject.find('.infor-lecturer .profile-image img').attr('src', `${data.lecturer_image !== null ? ROOT + `public/images/${data.lecturer_image}` : ROOT + "public/images/anonymous.jpg"}`);
			subject.find('.subject_name').html(data.subject_name);
			subject.find('.description').html(data.description);
			subject.find('.infor-lecturer .lecturer_username').html(`Giảng viên: ${data.user_name}`);
			subject.find('.create_at').html(`<i class='bx bx-time'></i> ${data.update_at}`);
			subject.find('.wrapper-icon .question').html(`<i class='bx bxs-help-circle questions'></i>Câu hỏi: ${data.total_questions}`);
			subject.find('.wrapper-icon .book').html(`<i class='bx bxs-book book'></i>Trắc nhiệm: ${data.total_quizzes}`);
			subject.find('.start').attr('data-id', `${data.id_subject}`);
			////////////////////////////////////////////////////////////////////////////
			const isExist = data.rankingSubject ? data.rankingSubject : [];
			let rankingSubjectHTML = isExist.map(item=>`
					<div class="item">
					<div class="wrapper-image">
						<img src=${item.image !== null ? ROOT+ `public/images/${item.image}`: ROOT+'public/images/anonymous.jpg'} alt="">
					</div>
					<p>${item.quizz_name}</p>
					<p>${item.user_name}</p>
					<p>${item.max_score}</p>
					<p>${item.grade_level}</p>
				</div>
				`);
			$('.popup-show-ranking-subject .wrapper .content').html(rankingSubjectHTML);
			$('.expand .courses .detail-course .wrapper .detail-subject .show-ranking').off('click').on('click',function(){
				$('.popup-show-ranking-subject').addClass('active');
			});
			$('.popup-show-ranking-subject').on('click',function(){
				$('.popup-show-ranking-subject').removeClass('active');
			})
			$('.popup-show-ranking-subject .wrapper').on('click',function(e){
				e.stopPropagation();
			})
			this.getIdSubject();
		},
		getIdSubject() {
			const _this = this;
			let type = null;
			$('.expand .courses .detail-course .wrapper .detail-subject .start').off('click').on('click', function () {
				$('.popup_authorization').addClass('active');
			});
			$('.popup_authorization').on('click',()=>{
				$('.popup_authorization').removeClass('active');
			});
			$('.popup_authorization .popup').on('click',(e)=>{
				e.stopPropagation();
			});
			$('.popup_authorization .popup ul li').on('click',function(){
				type = _this.typeDencentralization($(this).attr('data-action'));
				$('.popup_authorization .popup ul li').removeClass('selected');
				$('.popup_authorization .popup ul li').eq($(this).index()).addClass('selected');
				$('.popup_authorization .popup .confirm').addClass('active');
				$('.popup_authorization .popup .confirm').text('Xác nhận');
			});
			$('.popup_authorization .popup .confirm').on('click',()=>{
				if($('.popup_authorization .popup .confirm').hasClass('active')){
					$('.popup_authorization .popup .decentralization').attr('href',type);
					document.querySelector('.popup_authorization .popup .decentralization').click();
				}
			})
		},
		typeDencentralization(type){
			const decentraization = {
				student:ROOT+'decentralization/student',
				lecturer:ROOT+'decentralization/lecturer'
			}
			return decentraization[type];
		},
		main() {
			this.call();
			this.detailSubjectPrivate();
		}
	}
	callAPISubject.main();
	const callAPIResult = {
		call() {
			const _this = this;
			$.post(ROOT + "quizzStudent/callAPIResult", {},
				function (data, textStatus, jqXHR) {
					_this.render(data);
				},
				"json"
			);
		},
		render(data = []) {
			let html = data.map(item => `
				<div class="item">
							<p class="subject_name">${item.subject_name}</p>
							<p>${item.quizz_name}</p>
							<p>${item.total}</p>
							<p>${item.correct}</p>
							<p>${item.incorrect}</p>
							<p>${item.score}</p>
							<p class="${item.grade_level === 'Yếu' ? 'bad' : item.grade_level === 'Xuất sắc' ? 'excelent' : null}">${item.grade_level}</p>
							<p>${item.create_at}</p>
						</div>
				`).join('');
			$('.expand .result.tab .infor-quizz-done .wrapper .wrapper-info .content').html(html);

		},
		main() {
			this.call();
		}
	}
	callAPIResult.main();
	const callRankking = {
		call() {
			const _this = this;
			$.post(ROOT + "quizzStudent/callAPIRankking", {},
				function (data, textStatus, jqXHR) {
					const { students, subjects } = data;
					_this.render(students, subjects);
				},
				"json"
			);
		},
		render(students = [], subjects = []) {
			const ranking = ['top', 'second', 'third'];
			const studentHTML = students.map((item, index) => `
				<div class="item">
						<div class="wrapper-image">
							<img src=${item.image !== null ? ROOT + `public/images/${item.image}` : ROOT + 'public/images/anonymous.jpg'} alt="">
						</div>
						<div class="info">
							<div class="username">${item.user_name}</div>
							<div class="count"><i class='bx bxs-crown ${ranking[index] ? ranking[index] : ""}'></i><span>${item.score}</span></div>
						</div>
					</div>
				`).join('');
			$('.expand .rank.tab .wrapper .col-left .content').html(studentHTML);
			const subjectHTML = subjects.map(item => `
				<div class="item">
						<div class="wrapper-image">
							<img src=${item.subject_image !== null ? ROOT + `public/images/${item.subject_image}` : ROOT + 'public/images/default_image.webp'} alt="">
						</div>
						<div class="info">
							<div class="subject">${item.subject_name}</div>
							<div class="infor-lecturer">
								<div class="wrapper-lecturer">
									<img src=${item.lecturer_image !== null ? ROOT + `public/images/${item.lecturer_image}` : ROOT + 'public/images/anonymous.jpg'} alt="">
								</div>
								<div class="username">${item.user_name}</div>
							</div>
							<div class="count"><i class='bx bxs-user' ></i><span>${item.total}</span></div>
						</div>
					</div>
				`).join('');
			$('.expand .rank.tab .wrapper .col-right .content').html(subjectHTML);
		},
		main() {
			this.call();
		}
	}
	callRankking.main();
	
});