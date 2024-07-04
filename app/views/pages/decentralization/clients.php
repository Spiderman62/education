<div class="container">
	<div class="form-container">
		<div class="signIn-signUp">
			<form action="" class="sign-in-form">
				<h2 class="title">Sign in</h2>
				<div class="input-box">
					<i class="fas fa-user"></i>
					<input type="text" placeholder="Username">
				</div>
				<div class="input-box">
					<i class="fas fa-lock"></i>
					<input type="password" placeholder="Password">
				</div>
				<input type="submit" value="login" class="btn solid">
			</form>
			<form action="" class="sign-up-form">
				<h2 class="title">Sign up</h2>
				<div class="input-box">
					<i class="fas fa-user"></i>
					<input type="text" placeholder="Username">
				</div>
				<div class="input-box">
					<i class="fas fa-envelope"></i>
					<input type="text" placeholder="Email">
				</div>
				<div class="input-box">
					<i class="fas fa-lock"></i>
					<input type="password" placeholder="Password">
				</div>
				<input type="submit" value="register" class="btn solid">
			</form>
		</div>
	</div>
	<div class="panels-container">
		<div class="panel left-panel">
			<div class="content">
				<h3>Bạn là người mới ?</h3>
				<button class="btn transparent" id="sign-up-btn">Sign up</button>
			</div>
			<img src=<?php echo __ROOT__ . "public/decentralization/svg/maker_launch.svg" ?> class="image" alt="">
		</div>
		<div class="panel right-panel">
			<div class="content">
				<h3>Bạn đã có tài khoản ?</h3>
				<button class="btn transparent" id="sign-in-btn">Sign in</button>
			</div>
			<img src=<?php echo __ROOT__ . "public/decentralization/svg/software_engineer.svg" ?> class="image" alt="">
		</div>
	</div>
</div>