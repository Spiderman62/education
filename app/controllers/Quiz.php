<?php
	class Quiz extends Controller{
		private $data;
		public function index(){
			$this->data['title'] = "Quiz";
			$this->data['js'] = 'clients/javascript/quiz';
			$this->data['css'] = 'clients/css/quiz';
			$this->data['page'] = 'pages/clients/quiz';
			$this->data['boxicons'] = true;
			$this->data['jQuery'] = true;
			$this->data['gsap'] = true;
			$this->data['fonts'] = true;
			$this->view('clients_layout',$this->data);
			
		}
	}
?>