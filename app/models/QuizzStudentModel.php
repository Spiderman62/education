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
}
