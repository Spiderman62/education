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
						<i class='bx bx-home-alt'></i>

					</div>
					<span>Trang chủ</span>
				</li>
				<li data-type="user">
					<div class="icon">
						<i class="fa-solid fa-users"></i>
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
		<header>
			<h1>DANH SÁCH NGƯỜI DÙNG ( <span>19</span> )</h1>
			<div class="stand-line"></div>
			<h1>HIỂN THỊ ( <span>19</span> )</h1>
			<div class="stand-line"></div>
			<h1>THÙNG RÁC ( <span>0</span> )</h1>
		</header>
		<div class="wrapper-user">
			<div class="switch">
				<div class="role"><i class="fa-solid fa-user-group"></i>Sinh viên</div>
				<div class="stand-line"></div>
				<div class="role"><i class="fa-solid fa-user-graduate"></i>Giảng viên</div>
				<div class="line"></div>
			</div>
			<main>
				<div class="switch-active">
					Đây là trang sinh viên
				</div>
				<div class="switch-active">
					đây là trang giảng viên
				</div>
			</main>
		</div>

	</div>
	<div class="tabs">
		<header>
			<h1>DANH SÁCH KHOÁ HỌC</h1>
		</header>
	</div>
</section>