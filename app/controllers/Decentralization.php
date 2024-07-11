<?php
class Decentralization extends Controller
{
	private $DecentralizationModel , $data;
	public function __construct(){
		$this->DecentralizationModel = $this->model('DecentralizationModel');
	}
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
		$this->data['root'] = true;
		$this->data['jQuery'] = true;
		$this->data['sweetAlert'] = true;
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
		$this->data['root'] = true;
		$this->data['sweetAlert'] = true;
		$this->view('decentralization_layout', $this->data);
	}
	public function activeAccountStudent($email = []) {
		$this->DecentralizationModel->activeAccountStudent($email);
		$this->data['page'] = 'pages/decentralization/turnBack';
		$this->data['css'] = 'decentralization/clients/css/turnBack';
		$this->data['content']['check'] = true;
		$this->data['sweetAlert'] = true;
		$this->data['js'] = 'decentralization/clients/javascript/turnBack';
		$this->view('decentralization_layout',$this->data);
	}
}
