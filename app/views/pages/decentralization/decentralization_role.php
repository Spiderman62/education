<div class="container">
	<div class="form-container">
		<div class="signIn-signUp">
			<!-- Student's form -->
			<?php if ($role === 'student') { ?>
				<form action=<?php echo __ROOT__ . "ajax/studentSignUp";?> method="post" class="sign-in-form">
					<h2 class="title">Sign in</h2>
					<div class="input-box">
						<i class="fa-solid fa-address-card"></i>
						<input type="text" placeholder="Account">
						<span class="message"></span>
					</div>
					<div class="input-box">
						<i class="fas fa-lock"></i>
						<input type="password" placeholder="Password">
						<span class="message"></span>
					</div>
					<input type="submit" value="login" class="btn solid">
				</form>
				<form action=<?php echo __ROOT__ . "ajax/studentSignUp";?> class="sign-up-form" method="post" enctype="multipart/form-data">
					<h2 class="title">Sign up</h2>
					<div class="input-box">
						<i class="fa-solid fa-address-card"></i>
						<input type="text" id="account" name="account" placeholder="Account">
						<span class="message"></span>
					</div>
					<div class="input-box">
						<i class="fas fa-user"></i>
						<input type="text" id="username" name="username" placeholder="Username">
						<span class="message"></span>
					</div>
					<div class="input-box">
						<i class="fas fa-envelope"></i>
						<input type="text" id="email" name="email" placeholder="Email">
						<span class="message"></span>
					</div>
					<div class="input-box">
						<i class="fa-solid fa-briefcase"></i>
						<input type="text" id="education" name="education" placeholder="Education">
						<span class="message"></span>
						<div class="sub-menu">
							<ul>
								
							</ul>
						</div>
					</div>
					<div class="input-box">
						<i class="fa-solid fa-upload"></i>
						<input type="file" name="file" id="file">
						<label for="file">Upload file</label>
						<span class="message"></span>
					</div>
					<div class="input-box">
						<i class="fas fa-lock"></i>
						<input type="password" id="password" name="password" placeholder="Password">
						<span class="message"></span>
					</div>
					<div class="input-box">
						<i class="fas fa-lock"></i>
						<input type="password" id="confirm_password" placeholder="Confirm password">
						<span class="message"></span>
					</div>
					<input type="submit" value="register" class="btn solid">
				</form>
				<!-- Lecturer's form -->
			<?php } else { ?>
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
			<?php } ?>
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