<?php
	class Quiz extends Controller{
		private $data;
		public function index(){
			$this->data['page'] = 'pages/clients/quiz';
			$this->view('clients_layout',$this->data);
		}
	}
?>