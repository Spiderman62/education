<main>
	<?php
	if (!empty($information)) {


	?>
		<div class="profile-card">
			<div class="avatar">
				<img src=<?php echo !empty($information['image']) ? __ROOT__ . "public/images/" . $information['image'] : __ROOT__ . "public/images/anonymous.jpg" ?> alt="">
			</div>
			<div class="details">
				<h1><?php echo $information['user_name']?></h1>
				<h2><?php echo $information['major_name'] ?></h2>
			</div>
			<form class="update-new-password">
				<div class="input-box">
					<input type="text" name="password" placeholder="Nhập mật khẩu mới">
					<input hidden type="text" name="id" value="<?php echo $information['id'] ?>">
					<p class="message"></p>

				</div>
				<div class="input-box">
					<input type="text" name="confirm_password" placeholder="Nhập lại mật khẩu mới">
					<p class="message"></p>
				</div>
				<div class="wrapper-submit">
					<input type="submit" value="Xác nhận">
				</div>
			</form>
		</div>
		<div class="turn-back">
			<a href=<?php echo __ROOT__ . "decentralization/student" ?>>
				<div class="magneto">
					<div class="wave"></div>
					<div class="wave"></div>
					<div class="wave"></div>
					<div class="wave"></div>
					<span class="text">Quay về</span>
				</div>
			</a>
		</div>
	<?php } else { ?>
		<div class="exist">
			<h1>Rất tiếc, hệ thống không tìm thấy tài khoản của bạn trong hệ thống</h1>
			<p>Vui lòng đăng kí hoặc đăng nhập</p>
			<div class="turn-back">
			<a href=<?php echo __ROOT__ . "decentralization/student" ?>>
				<div class="magneto">
					<div class="wave"></div>
					<div class="wave"></div>
					<div class="wave"></div>
					<div class="wave"></div>
					<span class="text">Quay về</span>
				</div>
			</a>
		</div>
		</div>
	<?php } ?>
</main>