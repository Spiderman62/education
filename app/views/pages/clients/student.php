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
				<li data-type="score">
					<div class="icon">
						<i class='bx bx-news'></i>
					</div>
					<span>Bảng điểm</span>
				</li>
				<li data-type="score">
					<div class="icon">
						<i class='bx bx-info-square'></i>
					</div>
					<span>Hồ sơ của bạn</span>
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
				<h1>Top 10 thí sinh có số điểm thi cao nhất</h1>
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
	<div class="result tab">
		<div class="infor-quizz-done">
			<div class="wrapper">
				<div class="wrapper-info">
					<header>
						<h1>Danh sách kết quả đề thi đã làm</h1>
						<div class="title">
							<p>Tên môn học</p>
							<p>Tên trắc nhiệm</p>
							<p>Tổng số câu hỏi</p>
							<p>Số câu đúng</p>
							<p>Số câu sai</p>
							<p>Điểm số</p>
							<p>Xếp loại</p>
							<p>Thời gian kết thúc bài thi</p>
						</div>
					</header>
					<div class="content">

					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="tab profile">
		<div class="profile-card">
			<div class="profile-type">PRO</div>
			<div class="avatar">
				<img src="" alt="">
			</div>
			<div class="details">
				<h1></h1>
				<h2></h2>
			</div>
			<div class="numbers">
				<div class="item subject">
					<p>Tổng môn học</p>
					<h2></h2>
				</div>
				<div class="item quizz">
					<p>Tổng bài làm</p>
					<h2></h2>
				</div>
				<div class="item accurate">
					<p>Độ chính xác</p>
					<h2></h2>
				</div>
			</div>
			<div class="btns">
				<button class="outline">Đổi mật khẩu</button>
				<button class="fill">Cập nhật</button>
			</div>
		</div>
	</div>
</section>
<div class="popup-choose-quizz">
	<div class="wrapper">
		<div class="icon">
			<svg class="logo" viewBox="0 0 128 128" width="50" height="50" data-v-3fd5be35="">
				<path fill="#42b883" d="M78.8,10L64,35.4L49.2,10H0l64,110l64-110C128,10,78.8,10,78.8,10z" data-v-3fd5be35=""></path>
				<path fill="#35495e" d="M78.8,10L64,35.4L49.2,10H25.6L64,76l38.4-66H78.8z" data-v-3fd5be35=""></path>
			</svg>
		</div>
		<div class="content">
			<h1>Welcome to the brand new world!</h1>
			<p class="description">Trước khi làm bài hãy chọn trắc nhiệm mà bạn muốn</p>
			<div class="show-screen">
				<div class="screen">Vui Lòng chọn trắc nhiệm</div>
				<ul>

				</ul>
				<div class="confirm">Xác nhận</div>
			</div>
			<form class="select-quizz">
				<div class="input-box">
					<input type="text" hidden name="id_quizz">
					<p class="message"></p>
				</div>
				<input hidden type="submit">
			</form>
		</div>
	</div>
</div>
<div class="popup-change-password">
	<div class="wrapper">
		<h1>Đổi mật khẩu</h1>
		<p>Để đảm bảo tính bảo mật, bạn nên nhập mật khẩu hiện tại trước khi đổi mật khẩu mới</p>
		<form class="form-change-password">
			<div class="input-box">
				<input type="text" name="old_password" placeholder="Nhập mật khẩu cũ">
				<p class="message"></p>
			</div>
			<div class="input-box">
				<input type="text" name="new_password" placeholder="Nhập mật khẩu mới">
				<p class="message"></p>
			</div>
			<div class="input-box">
				<input type="text" name="confirm_new_password" placeholder="Nhập lại mật khẩu mới">
				<p class="message"></p>
			</div>
			<input type="submit" value="Xác nhận">
		</form>
	</div>
</div>
<div class="popup-change-profile">
	<div class="wrapper">
		<h1>Cập nhật hồ sơ</h1>
		<form class="form-change-profile">
			<div class="wrapper-image">
				<img src=<?php echo __ROOT__ . 'public/images/anonymous.jpg' ?> alt="">
			</div>
			<div class="block-upload-file">
				<div class="upload-file">
					<i class='bx bx-upload'></i>
					Upload file
				</div>
			</div>
			<div class="upload-file-text"></div>
			<div class="input-box">
				<input hidden name="image" type="file">
				<input hidden name="image-text" type="text">
				<p class="message"></p>
			</div>
			<div class="input-box">
				<input type="text" name="username" placeholder="Họ và tên">
				<p class="message"></p>
			</div>
			<input type="submit" value="Lưu thay đổi">
		</form>
	</div>
</div>