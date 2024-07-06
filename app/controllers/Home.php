<?php
class Home extends Controller{
	private $data = [];
	public function index(){
		$this->data['header_css'] = "clients/css/header";
		$this->data['header'] = "layouts/clients_header";
		$this->data['header_js'] = "clients/javascript/clients_header";
		$this->data['footer_css'] = "clients/css/footer";
		$this->data['footer'] = "layouts/clients_footer";
		$this->data['page'] = 'home';
		$this->data['title'] = "Home";
		$this->data['css'] = "clients/css/home";
		$this->data['footer_css'] = "clients/css/footer";
		$this->data['js'] = "clients/javascript/home";
		$this->data['content']['current_page'] = "home";
		$this->data['footer'] = "layouts/clients_footer";
		$this->data['page'] = "pages/clients/home";
		$this->data['gsap'] = "gsap/umd/gsap";
		$this->data['scrollTrigger'] = true;
		$this->data['icon'] = true;
		$this->data['lenis'] = true;
		$this->data['jQuery'] = "jQuery";
		$this->view('clients_layout',$this->data);
	}
}