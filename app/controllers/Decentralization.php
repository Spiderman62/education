<?php
class Decentralization extends Controller
{
	private $data;
	public function lecturer()
	{
		$this->data['title'] = "Lecturer";
		$this->data['css'] = "decentralization/clients/css/clients";
		$this->data['js'] = "decentralization/clients/javascript/clients";
		$this->data['page'] = "pages/decentralization/clients";
		$this->data['gsap'] = true;
		$this->data['role'] = "lecturer";
		$this->data['icon'] = true;
		$this->data['jQuery'] = true;
		$this->view('decentralization_layout', $this->data);
	}
	public function student()
	{
		$this->data['title'] = "Lecturer";
		$this->data['css'] = "decentralization/clients/css/clients";
		$this->data['js'] = "decentralization/clients/javascript/clients";
		$this->data['page'] = "pages/decentralization/clients";
		$this->data['gsap'] = true;
		$this->data['role'] = "student";
		$this->data['icon'] = true;
		$this->data['jQuery'] = true;
		$this->view('decentralization_layout', $this->data);
	}
}
