<?php
class Quiz extends Controller
{
	private $data;
	public function index()
	{
		$this->data['title'] = "Quiz";
		$this->data['js'] = 'clients/javascript/student';
		$this->data['css'] = 'clients/css/student';
		$this->data['page'] = 'pages/clients/student';
		$this->data['boxicons'] = true;
		$this->data['jQuery'] = true;
		$this->data['gsap'] = true;
		$this->data['fonts'] = true;
		$this->view('clients_layout', $this->data);
	}
	public function student()
	{
		$this->data['title'] = "Quiz";
		$this->data['js'] = 'clients/javascript/student';
		$this->data['css'] = 'clients/css/student';
		$this->data['page'] = 'pages/clients/student';
		$this->data['boxicons'] = true;
		$this->data['jQuery'] = true;
		$this->data['gsap'] = true;
		$this->data['fonts'] = true;
		$this->data['root'] = true;
		$this->view('clients_layout', $this->data);
	}
	public function lecturer()
	{
		$this->data['title'] = "Quiz";
		$this->data['js'] = 'lecturer/javascript/lecturer';
		$this->data['css'] = 'lecturer/css/lecturer';
		$this->data['page'] = 'pages/lecturer/lecturer';
		$this->data['boxicons'] = true;
		$this->data['jQuery'] = true;
		$this->data['gsap'] = true;
		$this->data['fonts'] = true;
		$this->view('clients_layout', $this->data);
	}
}