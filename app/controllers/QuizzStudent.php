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
	public function insertScoreStudent() {
		$this->QuizzStudentModel->insertScoreStudent();
	}
	public function insertStudentSubject() {
		$this->QuizzStudentModel->insertStudentSubject();
	}
	public function callAPIResult() {
		$this->QuizzStudentModel->callAPIResult();
	}
	public function callAPIRankking() {
		$this->QuizzStudentModel->callAPIRankking();
	}
	public function changePasswordStudent(){
		$this->QuizzStudentModel->changePasswordStudent();
	}
	public function getProfileStudent() {
		$this->QuizzStudentModel->getProfileStudent();
	}
	public function updateStudent() {
		$this->QuizzStudentModel->updateStudent();
	}
}
