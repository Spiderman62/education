<?php
class AdminModel extends DB
{
	public function getInforStudent()
	{
		$array = [];
		$itemPerPages = 7;
		$currentPage = !empty($_POST['currentPage']) ? $_POST['currentPage'] : 0;
		$offset = $currentPage * $itemPerPages;
		$dataStudent = $this->connection->query("SELECT user.ID as user_ID, student.ID as student_ID, student.image,student.major,student.phone,student.status,
 		user.account,user.email,user.username,user.password
 		from user join student on student.userID = user.ID LIMIT $itemPerPages OFFSET $offset;");
		$getTotalStudentPages = $this->connection->query("SELECT user.ID as user_ID, student.ID as student_ID, student.image,student.major,student.phone,student.status,
		user.account,user.email,user.username,user.password
		from user join student on student.userID = user.ID");
		$getTotalStudentPages = ceil(mysqli_num_rows($getTotalStudentPages) / $itemPerPages);
		while ($row = mysqli_fetch_assoc($dataStudent)) {
			$array['student'][] = $row;
		}
		$array['totalStudentPages'] = $getTotalStudentPages;
		$study_fields = $this->connection->query("SELECT * FROM study_fields");
		while ($row = mysqli_fetch_assoc($study_fields)) {
			$array['studyFields'][] = $row;
		}
		header('Content-Type: application/json');
		echo json_encode($array);
	}
	public function getInforLecturer()
	{
		$array = [];
		$itemPerPages = 7;
		$currentPage = !empty($_POST['currentPage']) ? $_POST['currentPage'] : 0;
		$offset = $currentPage * $itemPerPages;
		$dataLecturer = $this->connection->query("SELECT user.ID as user_ID, lecturer.ID as lecturer_ID, lecturer.image,lecturer.education,lecturer.phone,lecturer.status,
 		user.account,user.email,user.username,user.password
 		from user join lecturer on lecturer.userID= user.ID LIMIT $itemPerPages OFFSET $offset;");
		while ($row = mysqli_fetch_assoc($dataLecturer)) {
			$array['lecturer'][] = $row;
		}
		$getTotalLecturerPages = $this->connection->query("SELECT user.ID as user_ID, lecturer.ID as lecturer_ID, lecturer.image,lecturer.education,lecturer.phone,lecturer.status,
 		user.account,user.email,user.username,user.password
 		from user join lecturer on lecturer.userID= user.ID");
		$getTotalLecturerPages = ceil(mysqli_num_rows($getTotalLecturerPages) / $itemPerPages);
		$array['totalLecturerPages'] = $getTotalLecturerPages;
		$lecturer_fields = $this->connection->query("SELECT * FROM lecturer_fields");
		while ($row = mysqli_fetch_assoc($lecturer_fields)) {
			$array['lecturer_fields'][] = $row;
		}
		header('Content-Type: application/json');
		echo json_encode($array);
	}
	public function countAllUsers()
	{
		$countAll = mysqli_fetch_assoc($this->connection->query("select count(*) as total from user where user.ID not in(select user.ID from user inner join admin on admin.userID = user.ID);"));
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
	public function updateLecturer($data)
	{
		$userID = $data['userID'];
		$account = $data['account'];
		$username = $data['username'];
		$email = $data['email'];
		$education = $data['education'];
		$phone = $data['phone'];
		$password = $data['password'];
		$status = (int)$data['status'];
		$this->connection->query("UPDATE lecturer SET lecturer.education = '$education',
		 lecturer.phone = CASE WHEN '$phone' = '' THEN NULL ELSE '$phone' END,
		  lecturer.status = $status WHERE lecturer.userID = $userID;");

		$this->connection->query("UPDATE user set user.account = '$account',
		user.email = '$email',
		user.password = '$password',
		user.username = '$username' where user.ID = '$userID';");
		header('Content-type: application/json');
		echo json_encode(true);
	}
	public function deleteStudent()
	{
		$ID = (int)$_POST['user_ID'];
		$this->connection->query("DELETE FROM student WHERE userID = '$ID';");
		$this->connection->query("DELETE FROM user WHERE ID = '$ID';");
		header('Content-Type: application/json');
		echo json_encode(true);
	}
	public function deleteLecturer()
	{
		$ID = (int)$_POST['user_ID'];
		$this->connection->query("DELETE FROM lecturer WHERE userID = '$ID';");
		$this->connection->query("DELETE FROM user WHERE ID = '$ID';");
		header('Content-Type: application/json');
		echo json_encode(true);
	}
	public function activeAccountLecturer($user_ID)
	{
		$this->connection->query("UPDATE lecturer SET status = 1 WHERE userID = '$user_ID'");
		header('Content-Type: application/json');
		echo json_encode(true);
	}
	public function getCourses()
	{
		$array = [];
		$data = $this->connection->query("SELECT * FROM courses");
		while ($row = mysqli_fetch_assoc($data)) {
			$array['courses'][] = $row;
		}
		header('Content-Type: application/json');
		echo json_encode($array);
	}
	public function addCourse($course)
	{
		header('Content-Type: application/json');
		$isDuplicate = $this->connection->query("SELECT * FROM courses WHERE name = '$course'");
		if (mysqli_num_rows($isDuplicate) > 0) {
			echo json_encode(false);
			return;
		}else{
			$this->connection->query("INSERT INTO courses(name)value('$course')");
			echo json_encode(true);
			return;
		}
	}
}
