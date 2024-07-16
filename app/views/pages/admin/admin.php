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
			<h1>DANH SÁCH KHOÁ HỌC</h1>
		</header>
	</div>
</section>
<div class="main popup-edit">
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
				
				</div>
				
				<input type="submit" value="Cập nhập thông tin">
			</form>
		</div>
	</div>
</div>