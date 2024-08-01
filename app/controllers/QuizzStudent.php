<?php
class QuizzStudent extends Controller
{
	private $QuizzStudentModel;
	public function __construct()
	{
		$this->QuizzStudentModel = $this->model('QuizzStudentModel');
	}
	public function callAPISubject() {
		$this->QuizzStudentModel->callAPISubject();
	}
}
