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
			$this->data['sendEmail'] = false;
			$this->data['account'] = $_POST['account'];
			$this->data['username'] = $_POST['username'];
			$this->data['email'] = $_POST['email'];
			$this->data['major'] = $_POST['major'];
			$this->data['password'] = $_POST['password'];
			
			$this->data['sendEmail'] = $this->DecentralizationModel->studentSignUp($this->data);
			
			if(!empty($this->data['sendEmail'])){
				$title = "EduQuiz just sent to you the link to active your account";
				$html = "
				<h1 style='text-align:center'>We hope that you will be one of the contributors to education</h1>
				<br/>
				<a style='font-size:18px;color:#506AF3;display:block;text-align:center' href=".__ROOT__."decentralization/activeAccountStudent/".$this->data['email'].">Active account right here</a>
				";
				$this->sendEmail($title,$html,$this->data['email']);
			}
		}
		
	}
?>