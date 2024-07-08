<?php
class Decentralization extends Controller
{
	private $data;
	public function lecturer()
	{
		$this->data['title'] = "Lecturer";
		$this->data['css'] = "decentralization/style";
		$this->data['js'] = "decentralization/script";
		$this->data['js_role'] = "decentralization/lecturers/javascript/lecturers";
		$this->data['page'] = "pages/decentralization/decentralization_role";
		$this->data['gsap'] = true;
		$this->data['content']['role'] = "lecturer";
		$this->data['icon'] = true;
		
		$this->data['jQuery'] = true;
		$this->view('decentralization_layout', $this->data);
	}
	public function student()
	{
		$this->data['title'] = "Student";
		$this->data['css'] = "decentralization/style";
		$this->data['js'] = "decentralization/script";
		$this->data['js_role'] = "decentralization/clients/javascript/clients";
		$this->data['page'] = "pages/decentralization/decentralization_role";
		$this->data['gsap'] = true;
		$this->data['content']['role'] = "student";
		$this->data['icon'] = true;
		$this->data['jQuery'] = true;
		$this->view('decentralization_layout', $this->data);
	}
}
