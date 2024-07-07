<?php
	class Quiz extends Controller{
		private $data;
		public function index(){
			$this->data['aside_page'] = 'pages/clients/quiz';
			$this->data['title'] = "Quiz";
			$this->data['aside'] = 'layouts/aside';
			$this->data['aside_css'] = 'clients/css/aside';
			$this->data['aside_js'] = 'clients/javascript/aside';
			$this->data['css'] = 'clients/css/quiz';
			$this->data['boxicons'] = true;
			$this->data['jQuery'] = true;
			$this->data['gsap'] = true;
			$this->data['fonts'] = true;
			// Lâm hoàng, theo tao nghĩ là cái quiz này nó thực cơ chế 1 trang nên là aside bảo luôn vào
			// page luôn đi, khỏi bóc tách
			$this->view('clients_layout',$this->data);
			
		}
	}
?>