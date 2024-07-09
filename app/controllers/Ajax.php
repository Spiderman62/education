<?php
	class Ajax extends Controller{
		private $DecentralizationModel,$data;
		public function __construct(){
			$this->DecentralizationModel = $this->model('DecentralizationModel');
		}
		public function getStudyField(){
			echo $this->DecentralizationModel->getStudyField();
		}
		public function studentSignUp(){
			$this->data['account'] = $_POST['account'];
			$this->data['username'] = $_POST['username'];
			$this->data['email'] = $_POST['email'];
			$this->data['education'] = $_POST['education'];
			$this->data['file'] = $_FILES['file']['name'];
			$this->data['passsword'] = $_POST['password'];
			$this->DecentralizationModel->studentSignUp($this->data);
		}
	}
?>