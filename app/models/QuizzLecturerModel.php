<?php
class QuizzLecturerModel extends DB
{
	public function insertScoreLecturer()
	{
		date_default_timezone_set('Asia/Ho_Chi_Minh');
		header('Content-Type: application/json');
		$score = $_POST['score'];
		$countCorrect = $_POST['countCorrect'];
		$countIncorrect = $_POST['countIncorrect'];
		$totalQuestion = $_POST['totalQuestion'];
		$gradeLevel = $_POST['gradeLevel'];
		$gradeLevel = $_POST['gradeLevel'];
		$id_quizz = $_POST['id_quizz'];
		$id_lecturer = $_SESSION['info']['id'];
		$date = date('Y-m-d H:i:s');
		$isDuplicate = $this->connection->query("SELECT id FROM score_lecturer WHERE id_lecturer = '$id_lecturer' AND id_quizz = '$id_quizz'");
		if (mysqli_num_rows($isDuplicate) > 0) {
			$row = mysqli_fetch_assoc($isDuplicate);
			$id_score = $row['id'];
			$this->connection->query("UPDATE score_lecturer SET 
			total = '$totalQuestion',correct = '$countCorrect',
			incorrect = '$countIncorrect',grade_level = '$gradeLevel',score = '$score',create_at = '$date'
			WHERE id = '$id_score'");
			return;
		}
		$this->connection->query("INSERT INTO score_lecturer(total,correct,incorrect,id_lecturer,id_quizz,grade_level,score,create_at)
		value('$totalQuestion','$countCorrect','$countIncorrect','$id_lecturer','$id_quizz','$gradeLevel','$score','$date');
		");
	}
	public function insertLecturerSubject()
	{
		date_default_timezone_set('Asia/Ho_Chi_Minh');
		$date = date('Y-m-d H:i:s');
		$id_lecturer = $_SESSION['info']['id'];
		$id_subject = $_POST['id_subject'];
		$isDuplicate = $this->connection->query("SELECT id FROM lecturer_subject WHERE id_subject = '$id_subject' AND id_lecturer = '$id_lecturer'");
		if (mysqli_num_rows($isDuplicate) > 0) {
			return;
		}
		$this->connection->query("INSERT INTO lecturer_subject(id_lecturer,id_subject,registration_date)
		value('$id_lecturer','$id_subject','$date');
		");
	}
	public function callAPIResult()
	{
		header('Content-Type: application');
		$result = [];
		$id_lecturer = $_SESSION['info']['id'];
		$data = $this->connection->query("SELECT score_lecturer.correct,score_lecturer.incorrect,score_lecturer.grade_level,
		DATE_FORMAT(score_lecturer.create_at,'%d/%m/%Y - %H:%i:%s') as create_at,score_lecturer.total,quizzs.quizz_name,score_lecturer.score,
		subject.subject_name
		FROM score_lecturer 
		inner join quizzs on quizzs.id = score_lecturer.id_quizz
		inner join subject on subject.id = quizzs.id_subject
		WHERE score_lecturer.id_lecturer = '$id_lecturer';
		");
		while ($row = mysqli_fetch_assoc($data)) {
			$result[] = $row;
		}
		echo json_encode($result);
	}
	public function changePasswordLecturer()
	{
		header('Content-Type: application/json');
		$old_password = $_POST['old_password'];
		$confirm_new_password = $_POST['confirm_new_password'];
		$id_lecturer = $_SESSION['info']['id'];
		$isHas = $this->connection->query("SELECT * FROM lecturer WHERE id = '$id_lecturer' AND password = '$old_password'");
		if (mysqli_num_rows($isHas) > 0) {
			$this->connection->query("UPDATE lecturer SET password = '$confirm_new_password' WHERE id = '$id_lecturer'");
			echo json_encode(true);
			return;
		}
		echo json_encode(false);
	}
	public function getProfileLecturer()
	{
		header('Content-Type: application/json');
		$result = [];
		$id_lecturer = $_SESSION['info']['id'];
		$dataProfileLecturer = mysqli_fetch_assoc($this->connection->query("SELECT lecturer.user_name,education.education_name,lecturer.image FROM lecturer inner join education on education.id = lecturer.id_education WHERE lecturer.id = '$id_lecturer'"));
		$dataTotalQuizz = mysqli_fetch_assoc($this->connection->query("SELECT count(score_lecturer.id) as total_quizz FROM lecturer 
		inner join score_lecturer on score_lecturer.id_lecturer = lecturer.id
		WHERE lecturer.id = '$id_lecturer'
		group by lecturer.id;"));
		$dataTotalSubject = mysqli_fetch_assoc($this->connection->query("SELECT count(lecturer_subject.id) as total_subject FROM lecturer 
		inner join lecturer_subject on lecturer_subject.id_lecturer = lecturer.id
		WHERE lecturer.id = '$id_lecturer'
		group by lecturer.id;"));
		$dataAccurate = mysqli_fetch_assoc($this->connection->query("SELECT ROUND(AVG(score_lecturer.correct) * 100 / MAX(score_lecturer.total), 0) AS average_accuracy_percent
		FROM lecturer 
		INNER JOIN score_lecturer ON score_lecturer.id_lecturer = lecturer.id
		WHERE lecturer.id = '$id_lecturer'"));
		$result = [
			'profile' => $dataProfileLecturer,
			'total_quizz' => $dataTotalQuizz,
			'total_subject' => $dataTotalSubject,
			'accurate' => $dataAccurate,
		];
		echo json_encode($result);
		$this->connection->close();
	}
	public function updateLecturer()
	{
		header('Content-Type: application/json');
		$id_lecturer = $_SESSION['info']['id'];
		$image = $_POST['image-text'];
		$username = $_POST['username'];
		if (!empty($image)) {
			$this->connection->query("UPDATE lecturer SET image = '$image',user_name = '$username' WHERE id = '$id_lecturer'");
		} else {
			$this->connection->query("UPDATE lecturer SET user_name = '$username' WHERE id = '$id_lecturer'");
		}
		echo json_encode($image);
	}
	public function getSubjectOwnLecturer() {
		header('Content-Type: application/json');
		$result = [];
		$id_lecturer = $_SESSION['info']['id'];
		$subjects = $this->connection->query("SELECT 
		courses.course_name,
    	subject.id AS id_subject, 
    	subject.subject_name,
    	subject.update_at,
    	subject.image AS subject_image,
        subject.description,
    	lecturer.user_name,
		education.education_name,
    	COALESCE(COUNT(DISTINCT quizzs.id), 0) AS total_quizzes,
    	COALESCE(COUNT(DISTINCT question.id), 0) AS total_questions
		FROM subject
		INNER JOIN courses ON subject.id_course = courses.id
		INNER JOIN lecturer ON lecturer.id = subject.id_lecturer  
		INNER JOIN education ON education.id = lecturer.id_education
		LEFT JOIN quizzs ON quizzs.id_subject = subject.id
		LEFT JOIN question ON question.id_quizz = quizzs.id
		WHERE subject.id_lecturer = '$id_lecturer' AND subject.status = 1 AND subject.is_private = 0 
		GROUP BY subject.id");
		while($row = mysqli_fetch_assoc($subjects)){
			$result[] = $row;
		}
		echo json_encode($result);
	}
}