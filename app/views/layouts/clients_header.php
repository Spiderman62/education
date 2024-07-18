<div class="nav_mobile-fixed">
	<div class="header_moblie">
		<div class="logo">
			<div>
				<img src=<?php echo __ROOT__ . "public/clients/images/logo.webp" ?> alt="">
			</div>
			<p>EduQuiz</p>
		</div>
		<i class="fa-solid fa-xmark"></i>
	</div>
	<div class="line"></div>
	<ul>
		<li><a <?php echo $current_page === "home" ? "class='primary_nav'" : "" ?> href="">Trang chủ</a></li>
		<li><a <?php echo $current_page === "quiz" ? "class='primary_nav'" : "" ?> href="">Đề thi</a></li>
		<li><a <?php echo $current_page === "news" ? "class='primary_nav'" : "" ?> href="">Tin tức</a></li>
		<li><a <?php echo $current_page === "guide" ? "class='primary_nav'" : "" ?> href="">Hướng dẫn</a></li>
		<li><a <?php echo $current_page === "contact" ? "class='primary_nav'" : "" ?> href="">Liên hệ</a></li>
		<li><a href="">Đăng nhập</a></li>
	</ul>
</div>
<div class="popup_authorization">
	<div class="popup">
		<div class="wrapper_icon">
			<i class="fa-solid fa-lock"></i>
			<i class="fa-solid fa-unlock"></i>
		</div>
		<div class="title">Bạn thuộc vai trò nào?</div>
		<ul>
			<li data-action="lecturer">Giảng viên</li>
			<li data-action="student">Sinh viên</li>
		</ul>
		<div class="confirm">
			<span></span>
			Vui lòng chọn!
		</div>
		<a class="decentralization" hidden href=""></a>
	</div>
</div>
<header>
	<a class="logo" href="">
		<div>
			<img src=<?php echo __ROOT__ . "public/clients/images/logo.webp" ?> alt="">
		</div>
		<p>EduQuiz</p>
	</a>
	<ul>
		<li><a <?php echo $current_page === "home" ? "class='primary_nav'" : "" ?> href=<?php echo __ROOT__ . "home" ?>>Trang chủ</a></li>
		<li><a <?php echo $current_page === "quiz" ? "class='primary_nav'" : "" ?> href=<?php echo __ROOT__ . "quiz" ?>>Đề thi</a></li>
		<li><a <?php echo $current_page === "news" ? "class='primary_nav'" : "" ?> href="">Tin tức</a></li>
		<li><a <?php echo $current_page === "guide" ? "class='primary_nav'" : "" ?> href="">Hướng dẫn</a></li>
		<li><a <?php echo $current_page === "contact" ? "class='primary_nav'" : "" ?> href="">Liên hệ</a></li>

		<!--  -->
		<?php
		if (!empty($_SESSION['info']['major']) || !empty($_SESSION['info']['education'])) {
		?>
			<li class="session">
				<div class="wrapper-icon-session">
					<img src=<?php echo empty($_SESSION['info']['image']) ? __ROOT__ . "public/clients/images/anonymous.jpg" : __ROOT__ . "public/clients/images/" . $_SESSION['info']['image']; ?> alt="">
				</div>
				<div class="content">
					<div class="username"><?php echo $_SESSION['info']['username']; ?></div>
					<?php if (!empty($_SESSION['info']['major'])) { ?>
						<div class="major"><?php echo $_SESSION['info']['major']; ?></div>
					<?php } else { ?>
						<div class="major"><?php echo $_SESSION['info']['education']; ?></div>
					<?php } ?>
				</div>
				<div class="icon">
					<i class="fa-solid fa-chevron-down"></i>
					<div class="wrapper-info-user-popup">
						<a href="https://www.facebook.com/profile.php?id=100015098610636">
							<p>
								<i class="fa-solid fa-user-tie blue"></i>
								Liên hệ Admin
							</p>
						</a>
						<a href="">
							<p>
								<i class="fa-solid fa-user-gear gray"></i>
								Thông tin tài khoản
							</p>
						</a>
						<a href=<?php echo __ROOT__ . "SignOut" ?>>
							<p>
								<i class="fa-solid fa-arrow-right-from-bracket red"></i>
								Đăng xuất
							</p>
						</a>
					</div>
				</div>
			</li>
		<?php } else { ?>
			<li class="sign_in">Đăng nhập</li>

		<?php } ?>
		<!--  -->
	</ul>
	<div class="nav-mobile">
		<i class="fa-solid fa-bars"></i>
	</div>
</header>