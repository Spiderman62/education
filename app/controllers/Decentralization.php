<?php
class Decentralization extends Controller
{
	private $data;
	public function lecturer()
	{
		echo "This is a lecturer page";
	}
	public function student()
	{
		$this->data['title'] = "Lecturer";
		$this->data['css'] = "decentralization/clients/css/clients";
		$this->data['script'] = "decentralization/clients/javascript/clients";
		$this->data['page'] = "pages/decentralization/clients";
		$this->data['gsap'] = "gsap/umd/gsap";
		$this->data['icon'] = true;
		$this->data['jQuery'] = "jQuery";
		$this->view('decentralization_layout', $this->data);
	}
}
