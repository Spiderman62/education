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
			$('.expand .courses .detail-course .wrapper .detail-subject .start').off('click').on('click', function () {
				const id_subject = parseInt($(this).attr('data-id'));
				$('.popup-choose-quizz').addClass('active');
				$.post(ROOT + "quizzStudent/getAllQuizz", { id_subject: id_subject },
					function (data, textStatus, jqXHR) {
						_this.renderQuizzFromSubject(data);
					},
					"json"
				);
			});
			$('.popup-choose-quizz').on('click', function () {
				$('.popup-choose-quizz').removeClass('active');
				$('.popup-choose-quizz .wrapper .content .show-screen ul').html('');
				$('.popup-choose-quizz .wrapper .content .show-screen .screen').text('Vui Lòng chọn trắc nhiệm');
				$('.select-quizz input[name="id_quizz"]').val('');
			});
			$('.popup-choose-quizz .wrapper').on('click', function (e) {
				e.stopPropagation();
			});
		},
		renderQuizzFromSubject(data) {
			const _this = this;
			let html = "";
			if (data.length > 0) {
				for (let i = 0; i < data.length; i++) {
					html += `
					<li data-id="${data[i].id}">${data[i].quizz_name}</li>
					`
				}
				$('.popup-choose-quizz .wrapper .content .show-screen ul').html(html);
				_this.configurationQuizzFromSubject();
			} else {
				$('.popup-choose-quizz .wrapper .content .show-screen .screen').text("Maintenance, We'll fix that later");
			}
		},
		configurationQuizzFromSubject() {
			const _this = this;
			$('.popup-choose-quizz .wrapper .content .show-screen .screen').off('click').on('click', function () {
				$('.popup-choose-quizz .wrapper .content .show-screen ul').toggleClass('active');
			});
			$('.popup-choose-quizz .wrapper .content .show-screen ul li').off('click').on('click', function () {
				$('.popup-choose-quizz .wrapper .content .show-screen ul').removeClass('active');
				const id_quizz = parseInt($(this).attr('data-id'));
				const quizz_text = $(this).text();
				$('.popup-choose-quizz .wrapper .content .show-screen .screen').text(quizz_text);
				$('.select-quizz input[name="id_quizz"]').val(id_quizz);
			});
			$('.popup-choose-quizz .wrapper .content .show-screen .confirm').off('click').on('click', function () {
				$('.select-quizz input[type="submit"]').click();
			})
			validate({
				form: '.select-quizz',
				selectors: [
					checkBlank('input[name="id_quizz"]')
				],
				callback(forms) {
					$.post(ROOT + "quizzStudent/getQuestion", forms,
						function (data, textStatus, jqXHR) {
							$('.popup-choose-quizz').removeClass('active');
							$('.popup-choose-quizz .wrapper .content .show-screen ul').html('');
							$('.popup-choose-quizz .wrapper .content .show-screen .screen').text('Vui Lòng chọn trắc nhiệm');
							$('.select-quizz input[name="id_quizz"]').val('');
							$('.expand .tab.courses .detail-course').fadeOut(100);
							$('.expand .tab.courses .quizz').slideDown(1000);
							_this.question_quizz(data);
						},
						"json"
					);
				},
			});
		},
		question_quizz(data) {
			const { infor, questions } = data;
			const quizz = {
				catchCheat:0,
				infor: infor,
				data: questions,
				currentIndex: null,
				listsSubmit: [],
				listsResult: [],
				isSubmit: false,
				inforQuizz() {
					const _this = this;
					$('.expand .courses .start-education .progress .name-quizz').text(_this.infor.quizz_name);
					$('.expand .courses .start-education .progress .info-lecturer .wrapper-image img').attr('src', `${_this.infor.image !== null ? ROOT + `public/images/${_this.infor.image}` : ROOT + 'public/images/anonymous.jpg'}`);
					$('.expand .courses .start-education .progress .info-lecturer .name-lecturer').text(_this.infor.user_name);
					$(document).off('visibilitychange').on('visibilitychange',function(){
						if(document.hidden){
							_this.catchCheat++;
						}
						if(_this.catchCheat === 1){
							swal(`Cảnh báo`,{
								text:`Nếu bạn thoát ra bên ngoài thêm 1 lần nữa coi như bài làm của bạn bị huỷ bỏ`,
								icon:'error',
								button:false
							})
						}
						if(_this.catchCheat === 2){
							swal(`Rất tiếc`,{
								text:`Bài làm của bạn bị huỷ bỏ`,
								icon:'error',
								button:false
							})
							$(document).off('click').on('click',(e)=>{
								swal(`Rất tiếc`,{
									text:`Bài làm của bạn bị huỷ bỏ`,
									icon:'error',
									button:false
								})
							})
							out();
						}

						
					})
					const out = ()=>{
						setTimeout(()=>{
							window.location.href = ROOT+'quiz/student';
						},3000);
					}
				},
				renderQuestionList() {
					const _this = this;
					let html = $.map(_this.data, (item, index) => `<li>${index + 1}</li>`).join('');
					$('.expand .courses .start-education .list-question ul').html(html);
					_this.handleQuestionList();
				},
				handleQuestionList() {
					const _this = this;
					$('.expand .courses .start-education .list-question ul li').off('click').on('click', function () {
						_this.currentIndex = $(this).index();
						_this.renderCurrentQuestion();
						$('.expand .courses .start-education .list-question ul li').removeClass('selected');
						$('.expand .courses .start-education .list-question ul li').eq(_this.currentIndex).addClass('selected');
						let selected = _this.listsSubmit[_this.currentIndex];
						$('.expand .courses .start-education .question ul li').removeClass('active');
						selected >= 0 && $('.expand .courses .start-education .question ul li').eq(selected).trigger('click');
						if (_this.isSubmit) {
							_this.renderResult();
						}
					});
					$('.expand .courses .start-education .list-question ul li').eq(0).trigger('click');
				},
				renderCurrentQuestion() {
					const _this = this;
					$('.expand .courses .start-education .question .total-question').text(`Câu ${_this.currentIndex + 1} - ${_this.data.length} câu hỏi`);
					$('.expand .courses .start-education .question .name-question').text(`${_this.data[_this.currentIndex].question}`);
					const answerArray = _this.data[_this.currentIndex].answers.split(',');
					$.each($('.expand .courses .start-education .question ul li span'), function (index, item) {
						$(item).text(answerArray[index]);
					});
				},
				handleAnswers() {
					const _this = this;
					$('.expand .courses .start-education .question ul li').off('click').on('click', function () {
						if (!_this.isSubmit) {
							$('.expand .courses .start-education .question ul li').removeClass('active');
							$('.expand .courses .start-education .question ul li').eq($(this).index()).addClass('active');
							$('.expand .courses .start-education .list-question ul li').eq(_this.currentIndex).addClass('active');
							_this.listsSubmit[_this.currentIndex] = $(this).index();
							_this.handleProgress();
						} else {
							return;
						}
					});
				},
				handleProgress(correct) {
					const _this = this;
					const radius = $('.expand .courses .start-education .progress .quiz_progress svg circle').attr('r');
					const progressLength = _this.listsSubmit.filter(item => item >= 0);
					if (!_this.isSubmit) {
						$('#progress').css('stroke-dasharray', `${(2 * Math.PI * radius) * progressLength.length / _this.data.length}px 9999px`);
						$('#progress_text').text(`${progressLength.length}/${_this.data.length}`);
					} else {
						$('#progress').css('stroke-dasharray', `${(2 * Math.PI * radius) * correct / _this.data.length}px 9999px`);
						$('#progress_text').text(`${correct}/${_this.data.length}`);
					}
				},
				renderProgress() {
					const _this = this;
					$('#progress').css('stroke-dasharray', `0px 9999px`);
					$('#progress_text').text(`0/${_this.data.length}`);
				},
				handleNext() {
					const _this = this;
					$('.expand .courses .start-education .question .wrapper-button button.next').off('click').on('click', function () {
						_this.currentIndex++;
						if (_this.currentIndex > _this.data.length - 1) {
							_this.currentIndex = 0;
						}
						$('.expand .courses .start-education .list-question ul li').eq(_this.currentIndex).trigger('click');

					});
				},
				handlePrev() {
					const _this = this;
					$('.expand .courses .start-education .question .wrapper-button button.prev').off('click').on('click', function () {
						_this.currentIndex--;
						if (_this.currentIndex < 0) {
							_this.currentIndex = _this.data.length - 1;
						}
						$('.expand .courses .start-education .list-question ul li').eq(_this.currentIndex).trigger('click');
					});
				},
				handleSubmit() {
					const _this = this;
					$('.expand .courses .start-education .end-quizz').off('click').on('click', function () {
						const progressLength = _this.listsSubmit.filter(item => item >= 0);
						if (progressLength.length === _this.data.length) {
							let correct = 0;
							_this.data.forEach((itemParent, index) => {
								const answerArray = itemParent.answers.split(',');
								// const result = _this.data.find(r => parseInt(r.id) === parseInt(_this.data[index].id));
								if (answerArray[progressLength[index]] === itemParent.result) {
									$('.expand .courses .start-education .list-question ul li').eq(index).removeClass('incorrect');
									correct++;
								} else {
									$('.expand .courses .start-education .list-question ul li').eq(index).addClass('incorrect');
								}
								_this.listsResult[index] = answerArray.indexOf(itemParent.result);
							});
							_this.isSubmit = true;
							_this.handleProgress(correct);
							$('.expand .courses .start-education .end-quizz').fadeOut(300);
							$('.expand .courses .start-education .turn-back').addClass('active');
							_this.sendDataToStudent();
						} else {
							swal({
								title: 'Vui lòng chọn hết đáp án!',
								text: `Hiện tại bạn đang làm ${_this.listsSubmit.length} / ${_this.data.length} số câu hỏi`,
								icon: 'warning',
								button: false,
							})

						}
					});
				},
				renderResult() {
					if (this.listsResult[this.currentIndex] === this.listsSubmit[this.currentIndex]) {
						$('.expand .courses .start-education .question ul li').removeClass('incorrect');
						$('.expand .courses .start-education .question ul li').eq(this.listsResult[this.currentIndex]).addClass('active');
					} else {
						$('.expand .courses .start-education .question ul li').removeClass('incorrect');
						$('.expand .courses .start-education .question ul li').removeClass('active');
						$('.expand .courses .start-education .question ul li').eq(this.listsResult[this.currentIndex]).addClass('active');
						$('.expand .courses .start-education .question ul li').eq(this.listsSubmit[this.currentIndex]).addClass('incorrect');
					}
				},
				randomQuestion() {
					const _this = this;
					_this.data = _this.data.sort(() => Math.random() - Math.random());
					_this.data.forEach(item => {
						item.answers = item.answers.split(',').sort(() => Math.random() - Math.random()).join(',');
					});
				},
				handleKeyDown() {
					const _this = this;
					$(document).off('keydown').on('keydown', function (e) {
						const direction = e.keyCode;
						switch (direction) {
							case 39:
								$('.expand .courses .start-education .question .wrapper-button button.next').trigger('click');
								return;
							case 37:
								$('.expand .courses .start-education .question .wrapper-button button.prev').trigger('click');
								return;
							default:
								return;
						}
					})
				},
				sendDataToStudent() {
					const _this = this;
					const countCorrect = _this.listsResult.filter((item, index) => item === _this.listsSubmit[index]).length;
					const countIncorrect = _this.listsResult.filter((item, index) => item !== _this.listsSubmit[index]).length;
					const totalQuestion = _this.data.length;
					const score = parseFloat(((countCorrect / totalQuestion) * 10).toFixed(1));
					const gradeLevel = this.calculatorGradeLevel(score);
					swal({
						title: `Kết quả làm bài của bạn đã hoàn thành là:`,
						text: `Số câu đúng: ${countCorrect} | Số câu sai: ${countIncorrect} | Điểm của của bạn là: ${score} | Học lực của bạn là: ${gradeLevel}`,
						icon: 'success',
						button: false
					});
					const result = {
						countCorrect: countCorrect,
						countIncorrect: countIncorrect,
						totalQuestion: totalQuestion,
						score: score,
						gradeLevel: gradeLevel,
						id_quizz: _this.infor.id_quizz
					}
					$.post(ROOT + "quizzStudent/insertScoreStudent", result,
						function (data, textStatus, jqXHR) {

						},
						"json"
					);
					$.post(ROOT + "quizzStudent/insertStudentSubject", { id_subject: _this.infor.id_subject },
						function (data, textStatus, jqXHR) {

						},
						"json"
					);
					$('.expand .courses .start-education .turn-back').on('click', function () {
						window.location.href = ROOT + "quiz/student";
					});
				},
				calculatorGradeLevel(score) {
					if (score >= 9) {
						return "Xuất sắc";
					} else if (score >= 8) {
						return "Giỏi";
					} else if (score >= 7) {
						return "Khá";
					} else if (score >= 5) {
						return "Trung bình";
					} else {
						return "Yếu";
					}
				},
				main() {
					this.inforQuizz();
					$('.expand .courses .start-education .end-quizz').fadeIn(300);
					$('.expand .courses .start-education .turn-back').removeClass('active');
					this.randomQuestion();
					this.renderQuestionList();
					this.handleAnswers();
					this.renderProgress();
					this.handleNext();
					this.handlePrev();
					this.handleSubmit();
					this.handleKeyDown();
				}
			}
			quizz.main();
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
	const profile = {
		formData: null,
		call() {
			const _this = this;
			$.post(ROOT + "quizzStudent/getProfileStudent", {},
				function (data, textStatus, jqXHR) {
					const { profile, accurate, total_quizz, total_subject } = data;
					_this.render(profile, accurate, total_quizz, total_subject);
					_this.renderChangeProfile(profile);
				},
				"json"
			);
		},
		render(profile, accurate, total_quizz, total_subject) {
			$('.expand .tab.profile .profile-card .avatar img').attr('src', profile.image !== null ? ROOT + `public/images/${profile.image}` : ROOT + 'public/images/anonymous.jpg');
			$('.expand .tab.profile .profile-card .details h1').text(profile.user_name);
			$('.expand .tab.profile .profile-card .details h2').text(profile.major_name);
			$('.expand .tab.profile .profile-card .numbers .item.subject h2').text(total_subject.total_subject);
			$('.expand .tab.profile .profile-card .numbers .item.quizz h2').text(total_quizz.total_quizz);
			$('.expand .tab.profile .profile-card .numbers .item.accurate h2').text(`${accurate.average_accuracy_percent}%`);
		},
		renderChangeProfile(profile) {
			$('.popup-change-profile .wrapper .wrapper-image img').attr('src', profile.image !== null ? ROOT + `public/images/${profile.image}` : ROOT + 'public/images/anonymous.jpg');
			$('.popup-change-profile .wrapper .input-box input[name="username"]').val(profile.user_name);
		},
		changePassword() {
			$('.expand .tab.profile .profile-card .btns button.outline').on('click', function () {
				$('.popup-change-password').addClass('active');
			});
			$('.popup-change-password').on('click', function () {
				$('.popup-change-password').removeClass('active');
				$('.form-change-password input[name="old_password"]').val('');
				$('.form-change-password input[name="new_password"]').val('');
				$('.form-change-password input[name="confirm_new_password"]').val('');
			});
			$('.popup-change-password .wrapper').on('click', function (e) {
				e.stopPropagation();
			});
			validate({
				form: '.form-change-password',
				selectors: [
					checkBlank('input[name="old_password"]'),
					checkLength('input[name="old_password"]', 5),
					checkBlank('input[name="new_password"]'),
					checkLength('input[name="new_password"]', 5),
					checkBlank('input[name="confirm_new_password"]'),
					checkLength('input[name="confirm_new_password"]', 5),
					checkMatch('input[name="confirm_new_password"]', () => $('input[name="new_password"]').val())
				],
				callback(forms) {
					$.post(ROOT + "quizzStudent/changePasswordStudent", forms,
						function (data, textStatus, jqXHR) {
							if (data) {
								swal(`Đổi mật khẩu thành công`, { icon: 'success', timer: 2000, button: false });
								$('.popup-change-password').removeClass('active');
								$('.form-change-password input[name="old_password"]').val('');
								$('.form-change-password input[name="new_password"]').val('');
								$('.form-change-password input[name="confirm_new_password"]').val('');
							} else {
								swal(`Mật khẩu cũ không khớp!`, { icon: 'error', button: false });
							}
						},
						"json"
					);
				}
			});
		},
		changeProfile() {
			const _this = this;
			$('.expand .tab.profile .profile-card .btns button.fill').on('click', function () {
				$('.popup-change-profile').addClass('active');
			});
			$('.popup-change-profile').on('click', function () {
				$('.popup-change-profile').removeClass('active');
				$('.popup-change-profile .wrapper .upload-file-text').text('');
				$('.form-change-profile input[name="image-text"]').val('');
			});
			$('.popup-change-profile .wrapper').on('click', function (e) {
				e.stopPropagation();
			});
			$('.popup-change-profile .wrapper .upload-file').on('click', function () {
				$('.form-change-profile input[name="image"]').click();
			});
			$('.form-change-profile input[name="image"]').on('change', function () {
				const text = this.value;
				const formData = new FormData();
				if (this.files.length > 0) {
					formData.append('image', this.files[0]);
					_this.formData = formData;
					$('.popup-change-profile .wrapper .upload-file-text').text(text);
					$('.form-change-profile input[name="image-text"]').val(this.files[0].name);
				} else {
					$('.popup-change-profile .wrapper .upload-file-text').text('');
					$('.form-change-profile input[name="image-text"]').val('');
				}
			})
			validate({
				form: '.form-change-profile',
				selectors: [
					checkBlank('input[name="username"]'),
					checkLength('input[name="username"]', 5),
				],
				callback(forms) {
					fetch(ROOT + "admin/addImage", {
						method: 'POST',
						body: _this.formData
					});
					$.post(ROOT + "quizzStudent/updateStudent", forms,
						function (data, textStatus, jqXHR) {
							console.log(data)
							swal('Cập nhật thành công', { timer: 1000, button: false, icon: 'success' });
							$('.popup-change-profile').removeClass('active');
							$('.popup-change-profile .wrapper .upload-file-text').text('');
							_this.call();
						},
						"json"
					);
				}
			})
		},
		main() {
			this.call();
			this.changePassword();
			this.changeProfile();
		}
	}
	profile.main();
});