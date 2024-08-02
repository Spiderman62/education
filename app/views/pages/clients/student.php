<aside>
	<header>
		<div class="logo">
			<img src=<?php echo __ROOT__ . "public/clients/images/logo.webp"; ?> alt="">
		</div>
		<div class="title">EduQuiz</div>
		<div class="toggle">
			<i class='bx bx-menu open'></i>
			<i class='bx bx-x close'></i>
		</div>
	</header>
	<div class="menu">
		<div class="menu-tab">
			<li class="search-box">
				<div class="icon">
					<i class='bx bx-search'></i>
				</div>
				<input type="text" placeholder="Code...">
			</li>
			<ul>
				<a style="text-decoration: none;" href="<?php echo __ROOT__ . "home" ?>">
					<li data-type="home">
						<div class="icon">
							<i class='bx bx-home-alt'></i>
						</div>
						<span>Trang chủ</span>
					</li>
				</a>
				<li data-type="category">
					<div class="icon">
						<i class='bx bx-book-open'></i>
					</div>
					<span>Đề thi</span>
				</li>
				<li data-type="ranking">
					<div class="icon">
						<i class='bx bx-bar-chart-alt'></i>
					</div>
					<span>Xếp hạng</span>
				</li>
				<li data-type="score">
					<div class="icon">
						<i class='bx bx-news'></i>
					</div>
					<span>Bảng điểm</span>
				</li>
				<li data-type="closest">
					<div class="icon">
						<i class='bx bx-bookmark'></i>
					</div>
					<span>Truy cập gần đây</span>
				</li>
			</ul>
		</div>
		<div class="information">
			<div class="mode-switch">
				<div class="moon-sun">
					<i class='bx bx-sun sun'></i>
					<i class='bx bx-moon moon'></i>
				</div>
				<div class="type">Dark mode</div>
				<div class="wrapper_mode-switch">
					<div class="switch"></div>
				</div>
			</div>

			<div class="profile">
				<div class="user_image">
					<img src=<?php echo !empty($_SESSION['info']['image']) ? $_SESSION['info']['image'] : __ROOT__ . "public/clients/images/anonymous.jpg" ?> alt="">
				</div>
				<div class="infor">
					<span class="name"><?php echo $_SESSION['info']['user_name']; ?></span>
					<span class="major"><?php echo $_SESSION['info']['major_name'] ?></span>
				</div>
				<div class="logout">
					<i class='bx bx-log-out'></i>
				</div>
			</div>

		</div>
	</div>
</aside>
<section class="expand">
	<div class="tab">

	</div>
	<div class="courses tab">
		<div class="handle--course">
		</div>
		<div class="show--more-courses">
			<div class="block">
				<div class="top">
					<div class="wrapper">
						<p class="turn-back">Quay lại</p>
						<form class="search">
							<div class="input-box">
								<input type="text" placeholder="Nhập từ khoá">
								<p class="message"></p>
							</div>
							<input type="submit" hidden value="">
						</form>
					</div>
					<div class="pagination">
						<div class="current-position">20 of 100</div>
						<div class="control">
							<div class="icon left"><i class='bx bx-chevron-left'></i></div>
							<div class="icon right"><i class='bx bx-chevron-right'></i></div>
						</div>
					</div>
				</div>
				<div class="bottom">
					<div class="item">
						<div data-id="${subject[j].id_subject}" class="item">
							<div class="wrapper-image">
								<img src=<?php echo __ROOT__ . "public/images/default_image.avif" ?> alt="">
							</div>
							<div class="content">
								<h1 class="subject_name">asdfasdfasdnfasndfiajsbdfiabsdfbasdfbasdbfkzshdb</h1>
								<div class="infor-lecturer">
									<div class="profile-image">
										<img src=<?php echo __ROOT__ . "public/images/default_image.avif" ?> alt="">
									</div>
									<p class="lecturer_username">Giảng viên: Nguyễn Lâm Hoàng</p>
								</div>
								<p class="create_at"><i class='bx bx-time'></i> 1/8/2024 9:17:44</p>
								<div class="wrapper-icon">
									<span><i class='bx bxs-help-circle questions'></i>Câu hỏi: 40</span>
									<span><i class='bx bxs-book book'></i>Trắc nhiệm: 4</span>
								</div>
								<div data-id="${subject[j].id_subject}" class="start"><i class='bx bx-book-content'></i>Bắt đầu</div>
							</div>
						</div>
					</div>
					<div class="item">
						<div data-id="${subject[j].id_subject}" class="item">
							<div class="wrapper-image">
								<img src=<?php echo __ROOT__ . "public/images/default_image.avif" ?> alt="">
							</div>
							<div class="content">
								<h1 class="subject_name">asdfasdfasdnfasndfiajsbdfiabsdfbasdfbasdbfkzshdb</h1>
								<div class="infor-lecturer">
									<div class="profile-image">
										<img src=<?php echo __ROOT__ . "public/images/default_image.avif" ?> alt="">
									</div>
									<p class="lecturer_username">Giảng viên: Nguyễn Lâm Hoàng</p>
								</div>
								<p class="create_at"><i class='bx bx-time'></i> 1/8/2024 9:17:44</p>
								<div class="wrapper-icon">
									<span><i class='bx bxs-help-circle questions'></i>Câu hỏi: 40</span>
									<span><i class='bx bxs-book book'></i>Trắc nhiệm: 4</span>
								</div>
								<div data-id="${subject[j].id_subject}" class="start"><i class='bx bx-book-content'></i>Bắt đầu</div>
							</div>
						</div>
					</div>
					<div class="item">
						<div data-id="${subject[j].id_subject}" class="item">
							<div class="wrapper-image">
								<img src=<?php echo __ROOT__ . "public/images/default_image.avif" ?> alt="">
							</div>
							<div class="content">
								<h1 class="subject_name">asdfasdfasdnfasndfiajsbdfiabsdfbasdfbasdbfkzshdb</h1>
								<div class="infor-lecturer">
									<div class="profile-image">
										<img src=<?php echo __ROOT__ . "public/images/default_image.avif" ?> alt="">
									</div>
									<p class="lecturer_username">Giảng viên: Nguyễn Lâm Hoàng</p>
								</div>
								<p class="create_at"><i class='bx bx-time'></i> 1/8/2024 9:17:44</p>
								<div class="wrapper-icon">
									<span><i class='bx bxs-help-circle questions'></i>Câu hỏi: 40</span>
									<span><i class='bx bxs-book book'></i>Trắc nhiệm: 4</span>
								</div>
								<div data-id="${subject[j].id_subject}" class="start"><i class='bx bx-book-content'></i>Bắt đầu</div>
							</div>
						</div>
					</div>
					<div class="item">
						<div data-id="${subject[j].id_subject}" class="item">
							<div class="wrapper-image">
								<img src=<?php echo __ROOT__ . "public/images/default_image.avif" ?> alt="">
							</div>
							<div class="content">
								<h1 class="subject_name">asdfasdfasdnfasndfiajsbdfiabsdfbasdfbasdbfkzshdb</h1>
								<div class="infor-lecturer">
									<div class="profile-image">
										<img src=<?php echo __ROOT__ . "public/images/default_image.avif" ?> alt="">
									</div>
									<p class="lecturer_username">Giảng viên: Nguyễn Lâm Hoàng</p>
								</div>
								<p class="create_at"><i class='bx bx-time'></i> 1/8/2024 9:17:44</p>
								<div class="wrapper-icon">
									<span><i class='bx bxs-help-circle questions'></i>Câu hỏi: 40</span>
									<span><i class='bx bxs-book book'></i>Trắc nhiệm: 4</span>
								</div>
								<div data-id="${subject[j].id_subject}" class="start"><i class='bx bx-book-content'></i>Bắt đầu</div>
							</div>
						</div>
					</div>
					<div class="item">
						<div data-id="${subject[j].id_subject}" class="item">
							<div class="wrapper-image">
								<img src=<?php echo __ROOT__ . "public/images/default_image.avif" ?> alt="">
							</div>
							<div class="content">
								<h1 class="subject_name">asdfasdfasdnfasndfiajsbdfiabsdfbasdfbasdbfkzshdb</h1>
								<div class="infor-lecturer">
									<div class="profile-image">
										<img src=<?php echo __ROOT__ . "public/images/default_image.avif" ?> alt="">
									</div>
									<p class="lecturer_username">Giảng viên: Nguyễn Lâm Hoàng</p>
								</div>
								<p class="create_at"><i class='bx bx-time'></i> 1/8/2024 9:17:44</p>
								<div class="wrapper-icon">
									<span><i class='bx bxs-help-circle questions'></i>Câu hỏi: 40</span>
									<span><i class='bx bxs-book book'></i>Trắc nhiệm: 4</span>
								</div>
								<div data-id="${subject[j].id_subject}" class="start"><i class='bx bx-book-content'></i>Bắt đầu</div>
							</div>
						</div>
					</div>
					<div class="item">
						<div data-id="${subject[j].id_subject}" class="item">
							<div class="wrapper-image">
								<img src=<?php echo __ROOT__ . "public/images/default_image.avif" ?> alt="">
							</div>
							<div class="content">
								<h1 class="subject_name">asdfasdfasdnfasndfiajsbdfiabsdfbasdfbasdbfkzshdb</h1>
								<div class="infor-lecturer">
									<div class="profile-image">
										<img src=<?php echo __ROOT__ . "public/images/default_image.avif" ?> alt="">
									</div>
									<p class="lecturer_username">Giảng viên: Nguyễn Lâm Hoàng</p>
								</div>
								<p class="create_at"><i class='bx bx-time'></i> 1/8/2024 9:17:44</p>
								<div class="wrapper-icon">
									<span><i class='bx bxs-help-circle questions'></i>Câu hỏi: 40</span>
									<span><i class='bx bxs-book book'></i>Trắc nhiệm: 4</span>
								</div>
								<div data-id="${subject[j].id_subject}" class="start"><i class='bx bx-book-content'></i>Bắt đầu</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="detail-course">
			<div class="wrapper">
				<div class="detail-subject">
					<h1 class="infor-detail">Thông tin môn học</h1>
					<div class="wrapper-image">
						<img src=<?php echo __ROOT__ . "public/images/default_image.avif" ?> alt="">
					</div>
					<h1 class="subject_name">Tiếng anh lớp 10 chương trình đại trà</h1>
					<p class="description">Bộ đề trắc nghiệm toàn diện nhằm giúp học sinh lớp 10 ôn tập và chuẩn bị cho kỳ thi học kỳ và kỳ thi cuối năm về môn Tiếng Anh. Bao gồm các dạng bài tập như ngữ pháp, từ vựng, đọc hiểu và nghe hiểu.</p>
					<div class="infor-lecturer">
						<div class="profile-image">
							<img src=<?php echo __ROOT__ . "public/images/anonymous.jpg" ?> alt="">
						</div>
						<p class="lecturer_username">Giảng viên: Nguyễn Lâm Hoàng</p>
					</div>
					<p class="create_at"><i class='bx bx-time'></i> 2/8/2024</p>
					<div class="wrapper-icon">
						<span><i class='bx bxs-help-circle questions'></i>Câu hỏi: 60</span>
						<span><i class='bx bxs-book book'></i>Trắc nhiệm: 5</span>
					</div>
					<div data-id="${subject[j].id_subject}" class="start"><i class='bx bx-book-content'></i>Bắt đầu làm bài</div>
				</div>
				<div class="comment">
					<div class="about-english">
						<div class="english-intro">
							<h2>Tiếng Anh - Cửa ngõ tới thế giới</h2>
							<p>Tiếng Anh là một trong những ngôn ngữ phổ biến nhất trên thế giới, với hơn 1 tỷ người sử dụng như một ngôn ngữ chính hoặc phụ. Nó không chỉ là một công cụ giao tiếp quốc tế, mà còn mang lại nhiều cơ hội trong học tập, du học và nghề nghiệp trong thời đại toàn cầu hóa.</p>
						</div>

						<div class="english-history">
							<h3>Lịch sử phát triển của tiếng Anh</h3>
							<p>Tiếng Anh có nguồn gốc từ ngôn ngữ Anglo-Saxon, được du nhập vào Anh từ thế kỷ 5 sau Công nguyên. Trải qua nhiều thế kỷ, tiếng Anh đã phát triển và trở thành một trong những ngôn ngữ ảnh hưởng nhất trên thế giới.</p>
							<p>Sự phát triển của tiếng Anh gắn liền với lịch sử của người Anh, từ thời kỳ đô hộ châu Âu, đến việc trở thành ngôn ngữ chính của Đế chế Anh, và cuối cùng là ngôn ngữ toàn cầu trong kỷ nguyên công nghệ số và toàn cầu hóa.</p>
						</div>

						<div class="english-benefits">
							<h3>Lợi ích khi học tiếng Anh</h3>
							<ul>
								<li>Nâng cao khả năng giao tiếp quốc tế</li>
								<li>Mở ra nhiều cơ hội trong học tập, du học và nghề nghiệp</li>
								<li>Tiếp cận được nhiều nguồn tài nguyên, kiến thức trên toàn cầu</li>
								<li>Trau dồi tư duy logic và sáng tạo</li>
								<li>Tăng cơ hội việc làm và thu nhập trong tương lai</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	</div>
	<div class="tab">
		xep hang
	</div>
	<div class="tab">
		bang diem
	</div>
	<div class="tab">
		truy cap gan day
	</div>
</section>