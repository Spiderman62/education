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
							<img src=${subject[j].subject_image !== null ? ROOT +`public/images/${subject[j].subject_image}` : ROOT + "public/images/default_image.avif"} alt="">
						</div>
						<div class="content">
							<h1 class="subject_name">${subject[j].subject_name}</h1>
							<div class="infor-lecturer">
								<div class="profile-image">
									<img src=${subject[j].lecturer_image !== null ? ROOT +`public/images/${subject[j].lecturer_image}` : ROOT + "public/images/anonymous.jpg"} alt="">
								</div>
								<p class="lecturer_username">Giảng viên: ${subject[j].user_name}</p>
							</div>
							<p class="create_at"><i class='bx bx-time'></i> ${subject[j].update_at}</p>
							<div class="wrapper-icon">
								<span><i class='bx bxs-help-circle questions'></i>Câu hỏi: ${subject[j].total_questions}</span>
								<span><i class='bx bxs-book book'></i>Trắc nhiệm: ${subject[j].total_quizzes}</span>
							</div>
							<div class="start"><i class='bx bx-book-content'></i>Bắt đầu</div>
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
			$('.expand .courses .handle--course').html(htmlCourses);
		},
		main() {
			this.call();
		}
	}
	callAPISubject.main();
});