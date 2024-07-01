<header>
	<a class="logo" href="">
		<div>
			<img src=<?php echo __ROOT__ . "public/clients/images/logo.webp" ?> alt="">
		</div>
		<p>EduQuiz</p>
	</a>
	<ul>
		<li><a <?php echo $current_page === "home" ? "class='primary_nav'" : "" ?> href="">Trang chủ</a></li>
		<li><a <?php echo $current_page === "quiz" ? "class='primary_nav'" : "" ?> href="">Đề thi</a></li>
		<li><a <?php echo $current_page === "news" ? "class='primary_nav'" : "" ?> href="">Tin tức</a></li>
		<li><a <?php echo $current_page === "guide" ? "class='primary_nav'" : "" ?> href="">Hướng dẫn</a></li>
		<li><a <?php echo $current_page === "contact" ? "class='primary_nav'" : "" ?> href="">Liên hệ</a></li>

		<!--  -->
		<li class="sign_in"><a href="">Đăng nhập</a></li>
		<!--  -->
	</ul>
	<div class="nav-mobile">
		<i class="fa-solid fa-bars"></i>
	</div>
</header>
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