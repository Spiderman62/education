<?php
class Quiz extends Controller
{
	private $data;
	public function index()
	{
		$this->data['title'] = "Quiz";
		$this->data['js'] = 'mustSignIn/javascript/default';
		$this->data['css'] = 'clients/css/student';
		$this->data['page'] = 'pages/mustSignIn/default';
		$this->data['boxicons'] = true;
		$this->data['jQuery'] = true;
		$this->data['gsap'] = true;
		$this->data['fonts'] = true;
		$this->data['root'] = true;
		$this->data['validate'] = true;
		$this->view('clients_layout', $this->data);
	}
	public function student()
	{
		if(empty($_SESSION['info'])){
			header('Location: '.__ROOT__."home");
		};
		$this->data['title'] = "Quiz";
		$this->data['js'] = 'clients/javascript/student';
		$this->data['css'] = 'clients/css/student';
		$this->data['page'] = 'pages/clients/student';
		$this->data['boxicons'] = true;
		$this->data['jQuery'] = true;
		$this->data['gsap'] = true;
		$this->data['fonts'] = true;
		$this->data['root'] = true;
		$this->data['validate'] = true;
		$this->data['sweetAlert'] = true;
		$this->view('clients_layout', $this->data);
	}
	public function lecturer()
	{
		if(empty($_SESSION['info'])){
			header('Location: '.__ROOT__."home");
		};
		$this->data['title'] = "Quiz";
		$this->data['js'] = 'lecturer/javascript/lecturer';
		$this->data['css'] = 'clients/css/student';
		$this->data['page'] = 'pages/lecturer/lecturer';
		$this->data['boxicons'] = true;
		$this->data['jQuery'] = true;
		$this->data['gsap'] = true;
		$this->data['fonts'] = true;
		$this->data['root'] = true;
		$this->data['validate'] = true;
		$this->data['sweetAlert'] = true;
		$this->view('clients_layout', $this->data);
	}
}