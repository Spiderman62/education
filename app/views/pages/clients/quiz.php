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
				<input type="search" placeholder="Search...">
			</li>
			<ul>
				<li data-type="home">
					<div class="icon">
						<i class='bx bx-home-alt'></i>
						
					</div>
					<span>Trang chủ</span>
				</li>
				<li data-type="category">
					<div class="icon">
						<i class='bx bx-category'></i>
					</div>
					<span>Danh mục</span>
				</li>
				<li data-type="ranking">
					<div class="icon">
						<i class='bx bx-bar-chart-alt'></i>
					</div>
					<span>Xếp hạng</span>
				</li>
				<li data-type="news">
					<div class="icon">
						<i class='bx bx-news'></i>
					</div>
					<span>Tin tức</span>
				</li>
				<li data-type="contact">
					<div class="icon">
						<i class='bx bx-book-content'></i>
					</div>
					<span>Liên hệ</span>
				</li>
				<li data-type="guide">
					<div class="icon">
						<i class='bx bx-info-circle'></i>
					</div>
					<span>Hướng dẫn</span>
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
			<?php
				if(!empty($_SESSION['info'])){

				
			?>
			<div class="profile">
				<div class="user_image">
					<img src=<?php echo !empty($_SESSION['info']['image'])? $_SESSION['info']['image']: __ROOT__ . "public/clients/images/anonymous.jpg" ?> alt="">
				</div>
				<div class="infor">
					<span class="name"><?php echo $_SESSION['info']['username'];?></span>
					<span class="major"><?php echo $_SESSION['info']['major']?></span>
				</div>
				<div class="logout">
					<i class='bx bx-log-out'></i>
				</div>
			</div>
					<?php }?>
		</div>
	</div>
</aside>
<section class="expand">
	kasdlknds
</section>