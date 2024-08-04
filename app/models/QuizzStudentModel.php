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
				'id_course' => $id_course,
				'course_name' => $course_name,
				'subject' => $subject
			];
		};

		echo json_encode($result);
	}
	public function getAllSubjectFromCourse()
	{
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
		while ($row = mysqli_fetch_assoc($data)) {
			$result[] = $row;
		}
		echo json_encode($result);
	}
	public function detailSubject()
	{
		header('Content-Type: application/json');
		$result = [];
		$id_subject = !empty($_POST['id_subject']) ? $_POST['id_subject'] : null;
		$is_private = (int)$_POST['is_private'];
		$subject_code = !empty($_POST['subject_code']) ? $_POST['subject_code'] : null;
		if ($is_private === 0) {
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
			while ($row = mysqli_fetch_assoc($data)) {
				$result = $row;
			}
		} else {
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
			if (mysqli_num_rows($data) > 0) {
				while ($row = mysqli_fetch_assoc($data)) {
					$result = $row;
				}
			} else {
				echo json_encode(null);
				return;
			}
		}
		echo json_encode($result);
	}
	public function getAllQuizz()
	{
		header('Content-Type: application/json');
		$result = [];
		$id_subject = $_POST['id_subject'];
		$data = $this->connection->query("SELECT * FROM quizzs WHERE id_subject = '$id_subject'");
		while ($row = mysqli_fetch_assoc($data)) {
			$result[] = $row;
		};
		echo json_encode($result);
	}
	public function getQuestion()
	{
		header('Content-Type: application/json');
		$id_quizz = $_POST['id_quizz'];
		$result = [];
		$infor = mysqli_fetch_assoc($this->connection->query("SELECT quizzs.quizz_name,quizzs.id as id_quizz,subject.id as id_subject,lecturer.user_name,lecturer.image from quizzs
		inner join subject on subject.id = quizzs.id_subject 
		inner join lecturer on lecturer.id = subject.id_lecturer
		where quizzs.id = '$id_quizz';"));
		$data = $this->connection->query("SELECT id,question,answers,result FROM question WHERE id_quizz = '$id_quizz'");
		while ($row = mysqli_fetch_assoc($data)) {
			$questions[] = $row;
		};
		$result = [
			'infor'=>$infor,
			'questions'=>$questions
		];
		echo json_encode($result);
	}
	public function insertScoreStudent() {
		date_default_timezone_set('Asia/Ho_Chi_Minh');
		header('Content-Type: application/json');
		$score = $_POST['score'];
		$countCorrect = $_POST['countCorrect'];
		$countIncorrect = $_POST['countIncorrect'];
		$totalQuestion = $_POST['totalQuestion'];
		$gradeLevel = $_POST['gradeLevel'];
		$gradeLevel = $_POST['gradeLevel'];
		$id_quizz = $_POST['id_quizz'];
		$id_student = $_SESSION['info']['id'];
		$date = date('Y-m-d H:i:s');
		$isDuplicate = $this->connection->query("SELECT id FROM score_student WHERE id_student = '$id_student' AND id_quizz = '$id_quizz'");
		if(mysqli_num_rows($isDuplicate) > 0){
			$row = mysqli_fetch_assoc($isDuplicate);
			$id_score = $row['id'];
			$this->connection->query("UPDATE score_student SET 
			total = '$totalQuestion',correct = '$countCorrect',
			incorrect = '$countIncorrect',grade_level = '$gradeLevel',score = '$score',create_at = '$date'
			WHERE id = '$id_score'");
			return;
		}
		$this->connection->query("INSERT INTO score_student(total,correct,incorrect,id_student,id_quizz,grade_level,score,create_at)
		value('$totalQuestion','$countCorrect','$countIncorrect','$id_student','$id_quizz','$gradeLevel','$score','$date');
		");
	}
	public function insertStudentSubject() {
		date_default_timezone_set('Asia/Ho_Chi_Minh');
		$date = date('Y-m-d H:i:s');
		$id_student = $_SESSION['info']['id'];
		$id_subject = $_POST['id_subject'];
		$isDuplicate = $this->connection->query("SELECT id FROM student_subject WHERE id_subject = '$id_subject' AND id_student = '$id_student'");
		if(mysqli_num_rows($isDuplicate) > 0){
			return;
		}
		$this->connection->query("INSERT INTO student_subject(id_student,id_subject,registration_date)
		value('$id_student','$id_subject','$date');
		");
	}
}
