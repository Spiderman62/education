<?php
class QuizzStudentModel extends DB
{
	public function callAPISubject()
	{
		header('Content-Type: application/json');
		$result = [];
		$data_courses = $this->connection->query("SELECT id as id_course,course_name from courses order by id asc");
		while ($row = mysqli_fetch_assoc($data_courses)) {
			$id_course = $row['id_course'];
			$course_name = $row['course_name'];
			$subject = [];
			$data_subject = $this->connection->query("SELECT 
    		subject.id AS id_subject, 
    		subject.subject_name,
    		subject.update_at,
    		subject.image AS subject_image,
    		lecturer.image AS lecturer_image,
    		lecturer.user_name,
    		COALESCE(COUNT(DISTINCT quizzs.id), 0) AS total_quizzes,
    		COALESCE(COUNT(DISTINCT question.id), 0) AS total_questions
			FROM subject
			INNER JOIN courses ON subject.id_course = courses.id
			INNER JOIN lecturer ON lecturer.id = subject.id_lecturer  
			LEFT JOIN quizzs ON quizzs.id_subject = subject.id
			LEFT JOIN question ON question.id_quizz = quizzs.id
			WHERE subject.id_course = '$id_course' AND subject.status = 1 AND subject.is_private = 0
			GROUP BY subject.id LIMIT 8;");
			while ($rows = mysqli_fetch_assoc($data_subject)) {
				$subject[] = $rows;
			}
			$result[] = [
					'id_course'=> $id_course,
					'course_name' => $course_name,
					'subject'=> $subject
			];
		};

		echo json_encode($result);
	}
	public function getAllSubjectFromCourse() {
		header('Content-Type: application/json');
		$id_course = $_POST['id_course'];
		$result = [];
		$data = $this->connection->query("SELECT 
    	subject.id AS id_subject, 
    	subject.subject_name,
    	subject.update_at,
    	subject.image AS subject_image,
    	lecturer.image AS lecturer_image,
    	lecturer.user_name,
    	COALESCE(COUNT(DISTINCT quizzs.id), 0) AS total_quizzes,
    	COALESCE(COUNT(DISTINCT question.id), 0) AS total_questions
		FROM subject
		INNER JOIN courses ON subject.id_course = courses.id
		INNER JOIN lecturer ON lecturer.id = subject.id_lecturer  
		LEFT JOIN quizzs ON quizzs.id_subject = subject.id
		LEFT JOIN question ON question.id_quizz = quizzs.id
		WHERE subject.id_course = '$id_course' AND subject.status = 1 AND subject.is_private = 0 
		GROUP BY subject.id limit 20;");
		while($row = mysqli_fetch_assoc($data)){
			$result[] = $row;
		}
		echo json_encode($result);
	}
	public function detailSubject() {
		header('Content-Type: application/json');
		$result = [];
		$id_subject = !empty($_POST['id_subject']) ?$_POST['id_subject'] : null;
		$is_private = (int)$_POST['is_private'];
		$subject_code = !empty($_POST['subject_code']) ? $_POST['subject_code'] : null ;
		if($is_private === 0){
			$data = $this->connection->query("SELECT 
			subject.id AS id_subject, 
			subject.subject_name,
			subject.description,
			subject.update_at,
			subject.image AS subject_image,
			lecturer.image AS lecturer_image,
			lecturer.user_name,
			COALESCE(COUNT(DISTINCT quizzs.id), 0) AS total_quizzes,
			COALESCE(COUNT(DISTINCT question.id), 0) AS total_questions
			FROM subject
			INNER JOIN lecturer ON lecturer.id = subject.id_lecturer  
			LEFT JOIN quizzs ON quizzs.id_subject = subject.id
			LEFT JOIN question ON question.id_quizz = quizzs.id
			WHERE subject.id = '$id_subject' AND subject.status = 1 AND subject.is_private = 0 
			GROUP BY subject.id;");
			while($row = mysqli_fetch_assoc($data)){
				$result = $row;
			}
		}else{
			$data = $this->connection->query("SELECT 
			subject.id AS id_subject, 
			subject.subject_name,
			subject.description,
			subject.update_at,
			subject.image AS subject_image,
			lecturer.image AS lecturer_image,
			subject.subject_code,
			lecturer.user_name,
			COALESCE(COUNT(DISTINCT quizzs.id), 0) AS total_quizzes,
			COALESCE(COUNT(DISTINCT question.id), 0) AS total_questions
			FROM subject
			INNER JOIN lecturer ON lecturer.id = subject.id_lecturer  
			LEFT JOIN quizzs ON quizzs.id_subject = subject.id
			LEFT JOIN question ON question.id_quizz = quizzs.id
			WHERE subject.status = 1 AND subject.subject_code = '$subject_code' 
			GROUP BY subject.id;");
			if(mysqli_num_rows($data) > 0){
				while($row = mysqli_fetch_assoc($data)){
					$result = $row;
				}
			}else{
				echo json_encode(null);
				return;
			}
		}
		echo json_encode($result);
	}
	public function getAllQuizz() {
		header('Content-Type: application/json');
		$result = [];
		$id_subject = $_POST['id_subject'];
		$data = $this->connection->query("SELECT * FROM quizzs WHERE id_subject = '$id_subject'");
		while($row = mysqli_fetch_assoc($data)){
			$result[] = $row;
		};
		echo json_encode($result);
	}
	public function getQuestion() {
		header('Content-Type: application/json');
		$id_quizz = $_POST['id_quizz'];
		$result = [];
		$data = $this->connection->query("SELECT * FROM question WHERE id_quizz = '$id_quizz'");
		while($row = mysqli_fetch_assoc($data)){
			$result[] = $row;
		};
		echo json_encode($result);
	}
}
