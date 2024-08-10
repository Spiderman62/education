<div class="container">
	<div class="form-container">
		<div class="signIn-signUp">
			<!-- Student's form -->
			<?php if ($role === 'student') { ?>
				<form class="sign-in-form">
					<h2 class="title">Sign in</h2>
					<div class="input-box">
						<i class="fa-solid fa-address-card"></i>
						<input type="text" id="account" name="account" placeholder="Account">
						<span class="message"></span>
					</div>
					<div class="input-box">
						<i class="fas fa-lock"></i>
						<input type="password" id="password" name="password" placeholder="Password">
						<span class="message"></span>
					</div>
					<div class="forgot-password">Forgot the password?<span data-role="forget_student">Click here!</span></div>
					<input type="submit" value="login" class="btn solid">
				</form>
				<form class="sign-up-form">
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
						<input type="text" id="id_major" name="id_major" hidden>
						<input type="search" id="search" name="search" placeholder="Search...">
						<span class="message"></span>
						<div class="sub-menu">
							<ul>

							</ul>
						</div>
					</div>
					<!-- <div class="input-box">
						<i class="fa-solid fa-upload"></i>
						<input type="file" name="file" id="file">
						<label for="file">Upload file</label>
						<span class="message"></span>
					</div> -->
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
				<form class="sign-in-form">
					<h2 class="title">Sign in</h2>
					<div class="input-box">
						<i class="fa-solid fa-address-card"></i>
						<input type="text" id="account" name="account" placeholder="Account">
						<span class="message"></span>
					</div>
					<div class="input-box">
						<i class="fas fa-lock"></i>
						<input type="password" id="password" name="password" placeholder="Password">
						<span class="message"></span>
					</div>
					<div class="forgot-password">Forgot the password?<span data-role="forget_lecturer">Click here!</span></div>
					<input type="submit" value="login" class="btn solid">
				</form>
				<form class="sign-up-form">
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
						<input type="text" id="id_education" name="id_education" hidden>
						<input type="search" id="search" name="search" placeholder="Education...">
						<span class="message"></span>
						<div class="sub-menu">
							<ul>

							</ul>
						</div>
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
<div class="popup-forget-passwrod">
	<div class="wrapper">
		<div class="icon">
			<i class="fa-solid fa-magnifying-glass"></i>
		</div>
		<h1>Forgot password?</h1>
		<p>No worries, we'll send you reset instructions.</p>
		<form class="form-forget-password">
			<div class="input-box">
				<div class="email"><i class="fa-solid fa-envelope"></i></div>
				<input type="text" name="email">
				<p class="message">sdfsd</p>
			</div>
			<input type="submit" value="Send">
		</form>
	</div>
</div>