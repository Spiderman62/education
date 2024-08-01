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
				<a style="text-decoration: none;" href="<?php echo __ROOT__ . "home"?>">
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
					<img src=<?php echo !empty($_SESSION['info']['image'])? $_SESSION['info']['image']: __ROOT__ . "public/clients/images/anonymous.jpg" ?> alt="">
				</div>
				<div class="infor">
					<span class="name"><?php echo $_SESSION['info']['user_name'];?></span>
					<span class="major"><?php echo $_SESSION['info']['major_name']?></span>
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