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
		FROM student inner join major on major.id = student.id_major LIMIT $itemPerPages OFFSET $offset;");
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
		$dataLecturer = $this->connection->query("SELECT 
    	lecturer.image,
    	lecturer.id,
    	lecturer.account,
    	lecturer.user_name,
    	lecturer.email,
    	lecturer.phone,
    	education.education_name,
    	lecturer.status,
    	lecturer.password,
    	education.id as id_education
		FROM lecturer INNER JOIN education ON education.id = lecturer.id_education
		ORDER BY lecturer.id ASC
		LIMIT $itemPerPages OFFSET $offset;");
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
		$id_major = $data['id_major'];
		$phone = $data['phone'];
		$password = $data['password'];
		$status = (int)$data['status'];
		$this->connection->query("UPDATE student SET id_major = $id_major,email = '$email',account = '$account',
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
		$id_education = $data['id_education'];
		$phone = $data['phone'];
		$password = $data['password'];
		$status = (int)$data['status'];
		$this->connection->query("UPDATE lecturer SET id_education = '$id_education',account = '$account',
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
		inner join admin on admin.id = courses.id_admin WHERE courses.status = 1;");
		while ($row = mysqli_fetch_assoc($data)) {
			$array['courses'][] = $row;
		}
		header('Content-Type: application/json');
		echo json_encode($array);
	}
	public function addCourse($course, $admin)
	{
		header('Content-Type: application/json');
		$isDuplicate = $this->connection->query("SELECT * FROM courses WHERE course_name = '$course' AND status = 1");
		if (mysqli_num_rows($isDuplicate) > 0) {
			echo json_encode(true);
			return;
		}
		$isExist = $this->connection->query("SELECT * FROM courses WHERE course_name = '$course' AND status = 0");
		if (mysqli_num_rows($isExist) > 0) {
			$this->connection->query("UPDATE courses SET status = 1 where course_name = '$course';");
			echo json_encode(true);
			return;
		}
		$this->connection->query("INSERT INTO courses(course_name,id_admin)
			value('$course','$admin')");
		echo json_encode(true);
	}
	public function editCourse($ID, $edit)
	{
		header('Content-Type: application/json');
		$this->connection->query("UPDATE courses SET course_name = '$edit' WHERE id = $ID");
		echo json_encode(true);
	}
	public function deleteCourse($ID)
	{
		header('Content-Type: application/json');
		$this->connection->query("UPDATE courses SET status = 0 WHERE id = $ID");
		echo json_encode(true);
	}
	public function selectLecturerEducation($id_course)
	{
		header('Content-Type: application/json');
		$array = [];
		$lecturer_education = $this->connection->query("SELECT lecturer.id as id_lecturer,lecturer.account,lecturer.user_name,education.education_name from lecturer
		inner join education on education.id = lecturer.id_education
		where education.id = '$id_course' AND lecturer.status = 1 order by lecturer.id asc");
		while ($row = mysqli_fetch_assoc($lecturer_education)) {
			$array[] = $row;
		};
		echo json_encode($array);
	}
	public function addSubject()
	{
		header('Content-Type: application/json');
		$array = [];
		date_default_timezone_set('Asia/Ho_Chi_Minh');
		$date = date('Y-m-d H:i:s');
		$title = $_POST['title'];
		$description = $_POST['description'];
		$id_course = $_POST['id_course'];
		$id_lecturer = $_POST['id_lecturer'];
		$image_text = !empty($_POST['image-text']) ? "'" . $_POST['image-text'] . "'" : 'NULL';
		$subject_code = !empty($_POST['subject_code']) ? "'" . $_POST['subject_code'] . "'"  : 'NULL';
		$isPrivate = $_POST['isPrivate'];
		$isDuplicate = $this->connection->query("SELECT * FROM subject WHERE subject_name = '$title'");
		if (mysqli_num_rows($isDuplicate) > 0) {
			$array['type'] = false;
			echo json_encode($array);
			return;
		}
		$this->connection->query("INSERT into subject (subject_name,description,image,create_at,update_at,subject_code,is_private,id_lecturer,id_course)
			value('$title','$description',$image_text,'$date','$date',$subject_code,'$isPrivate','$id_lecturer','$id_course')");
		$array['type'] = true;
		echo json_encode($array);
	}
	public function getIdSubject() {
		$array = [];
		$id_course = $_POST['id_course'];
		$data = $this->connection->query("SELECT education.education_name, courses.course_name, subject.id,subject.subject_name,subject.description,subject.image,subject.create_at,subject.subject_code,subject.is_private,lecturer.user_name from subject
		inner join lecturer on lecturer.id = subject.id_lecturer
		inner join courses on courses.id = subject.id_course
		inner join education on education.id = lecturer.id_education
		where subject.id_course = $id_course AND subject.status = 1;");
		while($row = mysqli_fetch_assoc($data)){
			$array[] = $row;
		}
		header('Content-Type: application/json');
		echo json_encode($array);
	}
	public function deleteSubject() {
		$id = $_POST['id'];
		$this->connection->query("UPDATE subject SET status = 0 WHERE id = $id");
		header('Content-Type: aplication/json');
		echo json_encode(true);
	}
	public function editSubject() {
		header('Content-Type: application/json');
		$id = $_POST['id'];
		$data = $this->connection->query("SELECT * FROM subject where id = $id");
		$row = mysqli_fetch_assoc($data);
		echo json_encode($row);
	}
	public function sendEditSubject() {
		$id = $_POST['id'];
		$subject_name = $_POST['subject_name'];
		$description = $_POST['description'];
		$is_private = $_POST['is_private'];
		$subject_code = !empty($_POST['subject_code']) ? "'". $_POST['subject_code'] ."'" : 'NULL';
		header('Content-Type: application/json');
		$this->connection->query("UPDATE subject SET subject_name = '$subject_name', description = '$description', is_private = '$is_private',subject_code = $subject_code WHERE id = '$id'");
		echo json_encode(true);
	}
}
