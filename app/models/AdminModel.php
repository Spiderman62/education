<?php
class AdminModel extends DB
{
	public function getInforStudent()
	{
		$array = [];
		$itemPerPages = 7;
		$currentPage = !empty($_POST['currentPage']) ? $_POST['currentPage'] : 0;
		$offset = $currentPage * $itemPerPages;
		$dataStudent = $this->connection->query("SELECT student.image,
		student.id,
		student.account,
		student.user_name,
		student.email,
		student.phone,
		major.major_name,
		student.status,
		student.password,
		major.id as id_major
		FROM student inner join major on major.id = student.major LIMIT $itemPerPages OFFSET $offset;");
		$getTotalStudentPages = $this->connection->query("SELECT * FROM student");
		$getTotalStudentPages = ceil(mysqli_num_rows($getTotalStudentPages) / $itemPerPages);
		while ($row = mysqli_fetch_assoc($dataStudent)) {
			$array['student'][] = $row;
		}
		$array['totalStudentPages'] = $getTotalStudentPages;
		$majors = $this->connection->query("SELECT * FROM major");
		while ($row = mysqli_fetch_assoc($majors)) {
			$array['majors'][] = $row;
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
		$dataLecturer = $this->connection->query("SELECT lecturer.image,
		lecturer.id,
		lecturer.account,
		lecturer.user_name,
		lecturer.email,
		lecturer.phone,
		education.education_name,
		lecturer.status,
		lecturer.password,
		education.id as id_education
		FROM lecturer inner join education on education.id = lecturer.education LIMIT $itemPerPages OFFSET $offset;");
		while ($row = mysqli_fetch_assoc($dataLecturer)) {
			$array['lecturer'][] = $row;
		}
		$getTotalLecturerPages = $this->connection->query("SELECT * FROM lecturer");
		$getTotalLecturerPages = ceil(mysqli_num_rows($getTotalLecturerPages) / $itemPerPages);
		$array['totalLecturerPages'] = $getTotalLecturerPages;
		$educations = $this->connection->query("SELECT * FROM education");
		while ($row = mysqli_fetch_assoc($educations)) {
			$array['educations'][] = $row;
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
		$id = $data['id'];
		$account = $data['account'];
		$user_name = $data['user_name'];
		$email = $data['email'];
		$major = $data['major'];
		$phone = $data['phone'];
		$password = $data['password'];
		$status = (int)$data['status'];
		$this->connection->query("UPDATE student SET major = $major,email = '$email',account = '$account',
		password = '$password',user_name = '$user_name',
		phone = CASE WHEN '$phone' = '' THEN NULL ELSE '$phone' END,
		status = $status WHERE id = $id;");
		header('Content-type: application/json');
		echo json_encode(true);
	}
	public function updateLecturer($data)
	{
		$id = $data['id'];
		$account = $data['account'];
		$user_name = $data['user_name'];
		$email = $data['email'];
		$education = $data['education'];
		$phone = $data['phone'];
		$password = $data['password'];
		$status = (int)$data['status'];
		$this->connection->query("UPDATE lecturer SET education = '$education',account = '$account',
		user_name = '$user_name',email = '$email',password = '$password',
		 phone = CASE WHEN '$phone' = '' THEN NULL ELSE '$phone' END,
		  status = $status WHERE id = $id;");
		header('Content-type: application/json');
		echo json_encode(true);
	}
	public function deleteStudent()
	{
		$id = (int)$_POST['id'];
		$this->connection->query("DELETE FROM student WHERE id = '$id';");
		header('Content-Type: application/json');
		echo json_encode(true);
	}
	public function deleteLecturer()
	{
		$id = (int)$_POST['id'];
		$this->connection->query("DELETE FROM lecturer WHERE id = '$id';");
		header('Content-Type: application/json');
		echo json_encode(true);
	}
	public function activeAccountLecturer($id)
	{
		$this->connection->query("UPDATE lecturer SET status = 1 WHERE id = '$id'");
		header('Content-Type: application/json');
		echo json_encode(true);
	}
	public function getCourses()
	{
		$array = [];
		$data = $this->connection->query("SELECT courses.id as id_course,
		courses.course_name,admin.id as id_admin,
		admin.account,admin.user_name from courses
		inner join admin on admin.id = courses.id_admin;");
		while ($row = mysqli_fetch_assoc($data)) {
			$array['courses'][] = $row;
		}
		header('Content-Type: application/json');
		echo json_encode($array);
	}
	public function addCourse($course,$admin)
	{
		header('Content-Type: application/json');
		$isDuplicate = $this->connection->query("SELECT * FROM courses WHERE course_name = '$course'");
		if (mysqli_num_rows($isDuplicate) > 0) {
			echo json_encode(false);
			return;
		}
			$this->connection->query("INSERT INTO courses(course_name,id_admin)
			value('$course','$admin')");
			echo json_encode(true);
	}
	public function editCourse($ID,$edit) {
		header('Content-Type: application/json');
		$this->connection->query("UPDATE courses SET course_name = '$edit' WHERE id = $ID");
		echo json_encode(true);
	}
	public function deleteCourse($ID) {
		header('Content-Type: application/json');
		$this->connection->query("DELETE FROM courses WHERE id = $ID");
		echo json_encode(true);
	}
}
