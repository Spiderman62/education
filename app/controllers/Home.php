<?php
class Home extends Controller{
	private $data = [];
	public function index(){
		$this->data['page'] = 'home';
		$this->data['title'] = "Home";
		$this->data['css'] = "clients/css/home";
		$this->data['header_css'] = "clients/css/header";
		$this->data['footer_css'] = "clients/css/footer";
		$this->data['script'] = "clients/javascript/home";
		$this->data['header'] = "layouts/clients_header";
		$this->data['content']['current_page'] = "home";
		$this->data['footer'] = "layouts/clients_footer";
		$this->data['page'] = "pages/clients/home";
		$this->data['gsap'] = "gsap/umd/gsap";
		$this->view('clients_layout',$this->data);
	}
}