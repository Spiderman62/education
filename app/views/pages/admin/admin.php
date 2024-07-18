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
			<!-- <li class="search-box">
				<div class="icon">
					<i class='bx bx-search'></i>
				</div>
				<input type="search" placeholder="Search...">
			</li> -->
			<ul>
				<li data-type="home">
					<div class="icon">
						<i class='bx bx-bar-chart-alt'></i>
					</div>
					<span>Thống kê</span>
				</li>
				<li data-type="user">
					<div class="icon">
						<i class='bx bxs-user-detail'></i>
					</div>
					<span>Người dùng</span>
				</li>
				<li data-type="category">
					<div class="icon">
						<i class='bx bx-category'></i>
					</div>
					<span>Danh mục khoá học</span>
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
					<span class="name"><?php echo $_SESSION['info']['username']; ?></span>
					<span class="major">Administrator</span>
				</div>
				<div class="logout">
					<i class='bx bx-log-out'></i>
				</div>
			</div>

		</div>
	</div>
</aside>
<section class="admin">
	<div class="tabs">
		<header>
			<h1>THỐNG KÊ</h1>
		</header>
	</div>
	<div class="tabs">
		<header class="user">
			<h1 class="list">DANH SÁCH NGƯỜI DÙNG ( <span>19</span> )</h1>
			<div class="stand-line"></div>
			<h1 class="show">HIỂN THỊ ( <span>19</span> )</h1>
			<div class="stand-line"></div>
			<h1>THÙNG RÁC ( <span>0</span> )</h1>
		</header>
		<div class="wrapper-user">
			<div class="wrapper-filter">
				<div class="switch">
					<div class="role"><i class="fa-solid fa-user-group"></i>Sinh viên</div>
					<div class="stand-line"></div>
					<div class="role"><i class="fa-solid fa-user-graduate"></i>Giảng viên</div>
					<div class="line"></div>
				</div>
				<div class="filter">
					<div class="select-menu">
						<div class="select-btn">
							<span class="sBtn-text">Select your option</span>
							<i class="bx bx-chevron-down"></i>
						</div>
						<ul class="options">
							<!-- <li class="option">
								
								<span class="option-text">Github</span>
							</li> -->


						</ul>
					</div>
					<div class="input-box">
						<input type="text" placeholder="Tìm kiếm...">
					</div>
				</div>
			</div>
			<main>
				<div class="switch-active">
					<div class="wrapper-content student">
						<div class="title">
							<div class="select-all">
								<input type="checkbox">
							</div>
							<p>Tài khoản</p>
							<p>Tên sinh viên</p>
							<p>Email</p>
							<p>Số điện thoại</p>
							<p>Nghành học</p>
							<p>Mật khẩu</p>
							<p>Status</p>
						</div>
						<div class="content">
						</div>
					</div>
					<ul class="panigation student">
						<button class="btn1">
							<i class='bx bx-arrow-back'></i>
							Prev</button>
						<ul>

						</ul>
						<button class="btn2">
							Next
							<i class='bx bx-arrow-back'></i>
						</button>

					</ul>

				</div>
				<div class="switch-active">
					<div class="wrapper-content lecturer">
						<div class="title">
							<div class="select-all">
								<input type="checkbox">
							</div>
							<p>Tài khoản</p>
							<p>Tên giảng viên</p>
							<p>Email</p>
							<p>Số điện thoại</p>
							<p>Trình độ học vấn</p>
							<p>Mật khẩu</p>
							<p>Activity</p>
							<p>Status</p>
						</div>
						<div class="content">

						</div>

					</div>
					<ul class="panigation lecturer">
						<button class="btn1">
							<i class='bx bx-arrow-back'></i>
							Prev</button>
						<ul>

						</ul>
						<button class="btn2">
							Next
							<i class='bx bx-arrow-back'></i>
						</button>

					</ul>
			</main>
		</div>
	</div>
	<div class="tabs">
		<header>
			<h1>DANH SÁCH KHOÁ HỌC ( <span>5</span> )</h1>
			<h1>DANH SÁCH MÔN HỌC ( <span>21</span> )</h1>
			<h1>DANH SÁCH BÀI QUIZ ( <span>21</span> )</h1>
		</header>
		<div class="courses">
			<div class="wrapper-courses-filter">
				<div class="filter-courses">
					<div class="role">
						<i class='bx bxs-category-alt'></i>
						Khoá học
					</div>
					<div class="stand-line"></div>

					<div class="role">
						<i class='bx bxs-book'></i>
						Môn học
					</div>
					<div class="stand-line"></div>

					<div class="role">
						<i class='bx bxs-edit-alt'></i>
						Quiz
					</div>
					<div class="line"></div>
				</div>
				<div class="filter">

				</div>
			</div>
			<div class="container">
				<div class="item-courses course">
					<div class="add-course">
						<div class="right">
							<i class='bx bx-plus-circle'></i>
							Thêm khoá học
						</div>
					</div>
					<div class="title">
						<input type="checkbox" name="" id="">
						<p>ID</p>
						<p>Tên khoá học</p>
					</div>
					<div class="content">
						
					</div>
				</div>
				<div class="item-courses">
					2
				</div>
				<div class="item-courses">
					3
				</div>
			</div>
		</div>
	</div>
</section>
<div class="main popup-edit student">
	<div class="wrapper">
		<header>
			<h1>Chỉnh sửa hồ sơ</h1>
			<div class="switch">
				<p>Thông tin người dùng</p>
				<p>Khác</p>
			</div>
			<div class="line"></div>
		</header>
		<div class="content">
			<form class="check-validate" action="">
				<div class="update-form">
					<input hidden type="text" name="user_ID" id="user_ID" value="">
					<div class="input-box">
						<label for="account">Tài khoản</label>
						<input type="text" name="account" id="account" value="">
						<span class="message"></span>
					</div>
					<div class="input-box">
						<label for="username">Họ và tên</label>
						<input type="text" name="username" id="username" value="">
						<span class="message"></span>
					</div>
					<div class="input-box">
						<label for="email">Email</label>
						<input type="email" name="email" id="email" value="">
						<span class="message"></span>
					</div>
					<div class="input-box">
						<label for="password">Mật khẩu</label>
						<input type="password" name="password" id="password" value="">
						<span class="message"></span>
					</div>
					<div class="input-box major select">
						<label for="major">Nghành học</label>
						<select name="major" id="major">

						</select>
					</div>
					<div class="input-box">
						<label for="phone">Số điện thoại</label>
						<input type="text" name="phone" id="phone" value="">
						<span class="message"></span>
					</div>
					<div class="input-box status select">
						<label for="status">Trạng thái</label>
						<select name="status" id="status">
							<option value="0">Tài khoản đã bị vô hiệu hoá</option>
							<option value="1">Tài khoản đang hoạt động</option>
						</select>
					</div>
				</div>

				<input type="submit" value="Cập nhập thông tin">
			</form>
		</div>
	</div>
</div>
<div class="main popup-edit lecturer">
	<div class="wrapper">
		<header>
			<h1>Chỉnh sửa hồ sơ</h1>
			<div class="switch">
				<p>Thông tin người dùng</p>
				<p>Khác</p>
			</div>
			<div class="line"></div>
		</header>
		<div class="content">
			<form class="check-validate" action="">
				<div class="update-form">
					<input hidden type="text" name="user_ID" id="user_ID" value="">
					<div class="input-box">
						<label for="account">Tài khoản</label>
						<input type="text" name="account" id="account" value="">
						<span class="message"></span>
					</div>
					<div class="input-box">
						<label for="username">Họ và tên</label>
						<input type="text" name="username" id="username" value="">
						<span class="message"></span>
					</div>
					<div class="input-box">
						<label for="email">Email</label>
						<input type="email" name="email" id="email" value="">
						<span class="message"></span>
					</div>
					<div class="input-box">
						<label for="password">Mật khẩu</label>
						<input type="password" name="password" id="password" value="">
						<span class="message"></span>
					</div>
					<div class="input-box education select">
						<label for="education">Trình độ học vấn</label>
						<select name="education" id="education">

						</select>
					</div>
					<div class="input-box">
						<label for="phone">Số điện thoại</label>
						<input type="text" name="phone" id="phone" value="">
						<span class="message"></span>
					</div>
					<div class="input-box status select">
						<label for="status">Trạng thái</label>
						<select name="status" id="status">
							<option value="0">Tài khoản đã bị vô hiệu hoá</option>
							<option value="1">Tài khoản đang hoạt động</option>
						</select>
					</div>
				</div>

				<input type="submit" value="Cập nhập thông tin">
			</form>
		</div>
	</div>
</div>
<div class="pending">
	<div class="wrapper">
		<div class="box-wrap">
			<div class="box one"></div>
			<div class="box two"></div>
			<div class="box three"></div>
			<div class="box four"></div>
			<div class="box five"></div>
			<div class="box six"></div>
		</div>
	</div>
</div>
<div class="popup-add-courses">
	<div class="wrapper">
		<h1>Hãy chắc chắn</h1>
		<p>Khi bạn thêm khoá học cũng tức là người khác hoặc sẽ là 1 bên thứ 3 sẽ dựa vào khoá học bạn đã tạo</p>
		<form class="formAddCourses" action="">
			<div class="input-box">
				<input id="course" name="course" type="text" placeholder="English, math, biology,...">
				<span class="message"></span>
			</div>
			<input type="submit" value="Thêm khoá học">
		</form>
	</div>
</div>