<?php
	class Admin extends Controller{
		private $data;
		public function index() {
			$this->data['page'] = 'pages/admin/admin';
			$this->data['title'] = 'Admin';
			$this->data['css'] = 'admin/css/admin';
			$this->data['js'] = 'admin/javascript/admin';
			$this->data['jQuery'] = true;
			$this->data['fonts'] = true;
			$this->data['boxicons'] = true;
			$this->data['icon'] = true;
			$this->data['lenis'] = true;
			$this->view('admin_layout',$this->data);
		}
	}
?>