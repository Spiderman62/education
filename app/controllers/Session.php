<?php
	class Session{
		public function index() {
			header('Content-Type: application/json');
			echo json_encode($_SESSION['info']);
		}
	}
?>