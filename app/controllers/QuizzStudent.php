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
	public function getAllSubjectFromCourse() {
		$this->QuizzStudentModel->getAllSubjectFromCourse();
	}
	public function detailSubject() {
		$this->QuizzStudentModel->detailSubject();
	}
	public function getAllQuizz() {
		$this->QuizzStudentModel->getAllQuizz();
	}
	public function getQuestion() {
		$this->QuizzStudentModel->getQuestion();
	}
}
