<?php
class DecentralizationModel extends DB
{
	public function getStudyField()
	{
		$majors = $this->connection->query("SELECT * FROM major");
		$array = [];
		while ($row = mysqli_fetch_assoc($majors)) {
			$array[] = $row;
		}
		header('Content-Type: application/json');
		return json_encode($array);
	}
	public function getLecturerField()
	{
		$educations = $this->connection->query("SELECT * FROM education");
		$array = [];
		while ($row = mysqli_fetch_assoc($educations)) {
			$array[] = $row;
		}
		header('Content-Type: application/json');
		return json_encode($array);
	}
	public function studentSignUp($data)
	{
		header("Content-Type: application/json");
		$dataResponse = [];
		$account = $data['account'];
		$email = $data['email'];
		$username = $data['username'];
		$id_major = $data['id_major'];
		$password = $data['password'];
		$isFoundAccount = $this->connection->query("SELECT account FROM student WHERE account = '$account'");
		$isFoundEmail = $this->connection->query("SELECT account FROM student WHERE email = '$email'");
		if (mysqli_num_rows($isFoundAccount) > 0) {
			$dataResponse['account'] = true;
		}
		if (mysqli_num_rows($isFoundEmail) > 0) {
			$dataResponse['email'] = true;
		}
		if (!empty($dataResponse)) {
			echo json_encode($dataResponse);
			return;
		}
		$this->connection->query("INSERT INTO student(account,email,user_name,password,id_major)
			VALUE('$account','$email','$username','$password','$id_major');
			");
		$dataResponse['active'] = true;
		echo json_encode($dataResponse);
		return true;
	}
	public function activeAccountStudent($email)
	{
		$this->connection->query("UPDATE student SET status = 1
		WHERE email = '$email'");
	}
	public function studentSignIn($data)
	{
		header('Content-Type: application/json');
		$dataResponse = [];
		$account = $data['account'];
		$password = $data['password'];
		$isAdmin = $this->connection->query("SELECT * FROM admin where account = '$account' AND password = '$password'");
		if (!empty(mysqli_num_rows($isAdmin))) {
			$result =  mysqli_fetch_assoc($isAdmin);
			$dataResponse['info'] = $result;
			$dataResponse['active'] = true;
			$_SESSION['info'] = $result;
			echo json_encode($dataResponse);
			return;
		}
		$isAccount = $this->connection->query("SELECT * FROM student where account = '$account'");
		if (empty(mysqli_num_rows($isAccount))) {
			$dataResponse['isAccount'] = true;
		}
		$isPassword = $this->connection->query(" SELECT * FROM student where password = '$password'");
		if (empty(mysqli_num_rows($isPassword))) {
			$dataResponse['isPassword'] = true;
		}
		if (!empty($dataResponse)) {
			echo json_encode($dataResponse);
			return;
		}
		
		$isStatus = $this->connection->query("SELECT student.image,student.id,student.account,student.user_name,major.major_name FROM student inner join major on major.id = student.id_major
		where account = '$account' AND password = '$password' AND status = 1;");
		if (empty(mysqli_num_rows($isStatus))) {
			$dataResponse['isStatus'] = true;
			echo json_encode($dataResponse);
			return;
		}
		if (!empty(mysqli_num_rows($isStatus))) {
			$result =  mysqli_fetch_assoc($isStatus);
			$dataResponse['info'] = $result;
			$dataResponse['active'] = true;
			$_SESSION['info'] = $result;
			echo json_encode($dataResponse);
			return;
		}
		
	}
	public function lecturerSignUp($data)
	{
		header("Content-Type: application/json");
		$dataResponse = [];
		$account = $data['account'];
		$email = $data['email'];
		$username = $data['username'];
		$id_education = $data['id_education'];
		$password = $data['password'];
		$isFoundAccount = $this->connection->query("SELECT account FROM lecturer WHERE account = '$account'");
		$isFoundEmail = $this->connection->query("SELECT account FROM lecturer WHERE email = '$email'");
		if (mysqli_num_rows($isFoundAccount) > 0) {
			$dataResponse['account'] = true;
		}
		if (mysqli_num_rows($isFoundEmail) > 0) {
			$dataResponse['email'] = true;
		}
		if (!empty($dataResponse)) {
			echo json_encode($dataResponse);
			return;
		}
		$this->connection->query("INSERT INTO lecturer(account,email,user_name,password,id_education)
			VALUE('$account','$email','$username','$password','$id_education');
			");
		$dataResponse['active'] = true;
		echo json_encode($dataResponse);
		return true;
	}
	public function lecturerSignIn($data)
	{
		header('Content-Type: application/json');
		$dataResponse = [];
		$account = $data['account'];
		$password = $data['password'];
		$isAdmin = $this->connection->query("SELECT * FROM admin where account = '$account' AND password = '$password'");
		if (!empty(mysqli_num_rows($isAdmin))) {
			$result =  mysqli_fetch_assoc($isAdmin);
			$dataResponse['info'] = $result;
			$dataResponse['active'] = true;
			$_SESSION['info'] = $result;
			echo json_encode($dataResponse);
			return;
		}
		$isAccount = $this->connection->query("SELECT * FROM lecturer where account = '$account'");
		if (empty(mysqli_num_rows($isAccount))) {
			$dataResponse['isAccount'] = true;
		}
		$isPassword = $this->connection->query("SELECT * FROM lecturer where password = '$password'");
		if (empty(mysqli_num_rows($isPassword))) {
			$dataResponse['isPassword'] = true;
		}
		if (!empty($dataResponse)) {
			echo json_encode($dataResponse);
			return;
		}
		
		$isStatus = $this->connection->query("SELECT lecturer.image,lecturer.id,lecturer.account,lecturer.user_name,education.education_name from lecturer inner join education on education.id = lecturer.id_education
		where lecturer.account = '$account' AND lecturer.password = '$password' AND lecturer.status = 1;");
		if (empty(mysqli_num_rows($isStatus))) {
			$dataResponse['isStatus'] = true;
			echo json_encode($dataResponse);
			return;
		}
		if (!empty(mysqli_num_rows($isStatus))) {
			$result =  mysqli_fetch_assoc($isStatus);
			$dataResponse['info'] = $result;
			$dataResponse['active'] = true;
			$_SESSION['info'] = $result;
			echo json_encode($dataResponse);
			return;
		}
		
	}
}