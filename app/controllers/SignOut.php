<?php
	class SignOut{
		public function index() {
			session_destroy();
			$home = __ROOT__ . "home";
			header("location: $home");
		}
	}
?>