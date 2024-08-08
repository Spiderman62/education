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
				<form id="search-subject-private">
					<input type="text" name="code" placeholder="Code...">
				</form>
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
				</div>
			</div>
		</div>
		<div class="detail-course">
			<div class="wrapper">
				<div class="turn-back">
					<p>Quay về</p>
				</div>
				<div class="detail-subject">
					<h1 class="infor-detail">Thông tin môn học</h1>
					<div class="wrapper-image">
						<img src="" alt="">
					</div>
					<h1 class="subject_name"></h1>
					<p class="description"></p>
					<div class="infor-lecturer">
						<div class="profile-image">
							<img src="" alt="">
						</div>
						<p class="lecturer_username"></p>
					</div>
					<p class="create_at"></p>
					<div class="wrapper-icon">
						<span class="question"></span>
						<span class="book"></span>
					</div>
					<div data-id="" class="start"><i class='bx bx-book-content'></i>Bắt đầu làm bài</div>
					<div data-id="" class="show-ranking"><i class='bx bx-crown'></i></i>Bảng xếp hạng môn học</div>
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
		<div class="quizz">
			<div class="start-education">
				<div class="progress">
					<h1 class="name-quizz"></h1>
					<div class="info-lecturer">
						<div class="wrapper-image">
							<img src="" alt="">
						</div>
						<p class="name-lecturer"></p>
					</div>
					<div class="line"></div>
					<div class="quiz_progress">
						<svg>
							<circle r="82"></circle>
							<circle id="progress" r="82"></circle>
						</svg>
						<span id="progress_text"></span>
					</div>
					<div class="end-quizz">Kết thúc bài làm</div>
					<div class="turn-back">Quay về</div>
				</div>
				<div class="question">
					<h5 class="total-question"></h5>
					<p class="name-question"></p>
					<div class="line"></div>
					<ul>
						<li>A.<span></span></li>
						<li>B.<span></span></li>
						<li>C.<span></span></li>
						<li>D.<span></span></li>
					</ul>
					<div class="wrapper-button">
						<button class="prev"><i class='bx bxs-left-arrow-circle'></i>Trước</button>
						<button class="next">Sau<i class='bx bxs-right-arrow-circle'></i></button>
					</div>
				</div>
				<div class="list-question">
					<h1>Mục lục câu hỏi</h1>
					<div class="line"></div>
					<ul>

					</ul>
				</div>
			</div>
		</div>
	</div>
	</div>
	<div class="rank tab">
		<div class="wrapper">
			<div class="col-left">
				<h1>Top 10 thí sinh có hoạt động năng nổ cao nhất</h1>
				<div class="content">
				</div>
			</div>
			<div class="col-right">
				<h1>Top 10 môn học có lượng truy cập nhiều nhất</h1>
				<div class="content">


				</div>
			</div>
		</div>
	</div>
	
	
</section>
<div class="popup-show-ranking-subject">
	<div class="wrapper">
		<div class="block">
			<header>
				<h1>Bảng xếp hạng những sinh viên có điểm số cao nhất môn học</h1>
				<div class="item">
					<p>Ảnh đại diện</p>
					<p>Tên trắc nhiệm</p>
					<p>Họ và tên</p>
					<p>Điểm số</p>
					<p>Học lực</p>
				</div>
			</header>
			<div class="content">
			</div>
		</div>
	</div>
</div>
<div class="popup_authorization">
	<div class="popup">
		<div class="wrapper_icon">
		<i class='bx bxs-lock-alt'></i>
		<i class='bx bx-lock-open-alt' ></i>
		</div>
		<div class="title">Vui lòng đăng nhập</div>
		<ul>
			<li data-action="lecturer">Giảng viên</li>
			<li data-action="student">Sinh viên</li>
		</ul>
		<div class="confirm">
			Vui lòng chọn!
		</div>
		<a class="decentralization" hidden href=""></a>
	</div>
</div>