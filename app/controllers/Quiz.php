<?php
	class Quiz extends Controller{
		private $data;
		public function index(){
			// $this->data['page'] = 'pages/clients/quiz';
			$this->data['title'] = "Quiz";
			$this->data['aside'] = 'layouts/aside';
			$this->data['css'] = 'clients/css/aside';
			$this->data['js'] = 'clients/javascript/aside';
			$this->data['boxicons'] = true;
			$this->data['jQuery'] = true;
			$this->data['gsap'] = true;
			$this->view('clients_layout',$this->data);
			
		}
	}
?>