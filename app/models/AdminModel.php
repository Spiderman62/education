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
		$array['countAll'] = (int)$countAll['total'];
		header('Content-Type: application/json');
		echo json_encode($array);
	}
	public function updateStudent($data)
	{
		$userID = $data['userID'];
		$account = $data['account'];
		$username = $data['username'];
		$email = $data['email'];
		$major = $data['major'];
		$phone = $data['phone'];
		$password = $data['password'];
		$status = (int)$data['status'];
		$this->connection->query("UPDATE student SET student.major = '$major',
		 student.phone = CASE WHEN '$phone' = '' THEN NULL ELSE '$phone' END,
		  student.status = $status WHERE student.userID = $userID;");

		$this->connection->query("UPDATE user set user.account = '$account',
		user.email = '$email',
		user.password = '$password',
		user.username = '$username' where user.ID = '$userID';");
		header('Content-type: application/json');
		echo json_encode(true);
	}
	public function deleteStudent() {
		$ID = (INT)$_POST['user_ID'];
		$this->connection->query("DELETE FROM student WHERE userID = '$ID';");
		$this->connection->query("DELETE FROM user WHERE ID = '$ID';");
		header('Content-Type: application/json');
		echo json_encode(true);
	}
}
?>