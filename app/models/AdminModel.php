<?php

class AdminModel extends DB
{
	public function getInforUser()
	{
		$array = [];
		$itemPerPages = 7;
		$currentPage = !empty($_POST['currentPage']) ? $_POST['currentPage'] : 0;
		$offset = $currentPage * $itemPerPages;
		$countAll = mysqli_fetch_assoc($this->connection->query("select count(*) as total from user where user.ID not in(select user.ID from user inner join admin on admin.userID = user.ID);"));
		$dataStudent = $this->connection->query("SELECT user.ID as user_ID, student.ID as student_ID, student.image,student.major,student.phone,student.status,
 		user.account,user.email,user.username,user.password
 		from user join student on student.userID = user.ID LIMIT $itemPerPages OFFSET $offset;");

		$dataLecturer = $this->connection->query("SELECT user.ID as user_ID, lecturer.ID as lecturer_ID, lecturer.image,lecturer.education,lecturer.phone,lecturer.status,
 		user.account,user.email,user.username,user.password
 		from user join lecturer on lecturer.userID= user.ID LIMIT $itemPerPages OFFSET $offset;");

		$getTotalStudentPages = $this->connection->query("SELECT user.ID as user_ID, student.ID as student_ID, student.image,student.major,student.phone,student.status,
		user.account,user.email,user.username,user.password
		from user join student on student.userID = user.ID");
		$getTotalStudentPages = ceil(mysqli_num_rows($getTotalStudentPages) / $itemPerPages);
		$getTotalLecturerPages = $this->connection->query("SELECT user.ID as user_ID, lecturer.ID as lecturer_ID, lecturer.image,lecturer.education,lecturer.phone,lecturer.status,
 		user.account,user.email,user.username,user.password
 		from user join lecturer on lecturer.userID= user.ID");
		$getTotalLecturerPages = ceil(mysqli_num_rows($getTotalLecturerPages) / $itemPerPages);
		while ($row = mysqli_fetch_assoc($dataStudent)) {
			$array['student'][] = $row;
		}
		while ($row = mysqli_fetch_assoc($dataLecturer)) {
			$array['lecturer'][] = $row;
		}
		$array['totalStudentPages'] = $getTotalStudentPages;
		$array['totalLecturerPages'] = $getTotalLecturerPages;
		$array['countAll'] = (INT)$countAll['total'];
		header('Content-Type: application/json');
		echo json_encode($array);
	}
}
