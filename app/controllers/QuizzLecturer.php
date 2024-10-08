<?php
class QuizzLecturer extends Controller
{
	private $QuizzLecturerModel;
	public function __construct()
	{
		$this->QuizzLecturerModel = $this->model('QuizzLecturerModel');
	}
	public function insertScoreLecturer() {
		$this->QuizzLecturerModel->insertScoreLecturer();
	}
	public function insertLecturerSubject() {
		$this->QuizzLecturerModel->insertLecturerSubject();
	}
	public function callAPIResult() {
		$this->QuizzLecturerModel->callAPIResult();
	}
	public function changePasswordLecturer(){
		$this->QuizzLecturerModel->changePasswordLecturer();
	}
	public function getProfileLecturer() {
		$this->QuizzLecturerModel->getProfileLecturer();
	}
	public function updateLecturer() {
		$this->QuizzLecturerModel->updateLecturer();
	}
	public function getSubjectOwnLecturer() {
		$this->QuizzLecturerModel->getSubjectOwnLecturer();
	}
	public function getQuizzFromSubject() {
		$this->QuizzLecturerModel->getQuizzFromSubject();
	}
	public function getQuestionFromQuizz() {
		$this->QuizzLecturerModel->getQuestionFromQuizz();
	}
	public function updateQuestion() {
		$this->QuizzLecturerModel->updateQuestion();
	}
	public function deleteQuestion() {
		$this->QuizzLecturerModel->deleteQuestion();
	}
	public function addQuestion() {
		$this->QuizzLecturerModel->addQuestion();
	}
}
