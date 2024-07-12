<?php
class DecentralizationModel extends DB
{
	public function getStudyField()
	{
		$study_fields = $this->connection->query("SELECT * FROM study_fields");
		$array = [];
		while ($row = mysqli_fetch_assoc($study_fields)) {
			$array[] = $row;
		}
		header('Content-Type: application/json');
		return json_encode($array);
	}
	public function getLecturerField()
	{
		$lecturer_fields = $this->connection->query("SELECT * FROM lecturer_fields");
		$array = [];
		while ($row = mysqli_fetch_assoc($lecturer_fields)) {
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
		$major = $data['major'];
		$password = $data['password'];
		$isFoundAccount = $this->connection->query("SELECT account FROM user WHERE account = '$account'");
		$isFoundEmail = $this->connection->query("SELECT account FROM user WHERE email = '$email'");
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
		$this->connection->query("INSERT INTO user(account,email,username,password)
			VALUE('$account','$email','$username','$password');
			");
		$this->connection->query("INSERT INTO student(userID,major)
			VALUE(last_insert_id(),'$major');
			");
		$dataResponse['active'] = true;
		echo json_encode($dataResponse);
		return true;
	}
	public function activeAccountStudent($email)
	{
		$this->connection->query("UPDATE student SET student.status = 1
		WHERE student.userID = (SELECT user.ID FROM user
    	WHERE user.email = '$email');");
	}
	public function studentSignIn($data)
	{
		header('Content-Type: application/json');
		$dataResponse = [];
		$account = $data['account'];
		$password = $data['password'];
		$isAccount = $this->connection->query("SELECT * FROM user where account = '$account'");
		if (empty(mysqli_num_rows($isAccount))) {
			$dataResponse['isAccount'] = true;
		}
		$isPassword = $this->connection->query(" SELECT * FROM user where password = '$password'");
		if (empty(mysqli_num_rows($isPassword))) {
			$dataResponse['isPassword'] = true;
		}
		if (!empty($dataResponse)) {
			echo json_encode($dataResponse);
			return;
		}
		$isAdmin = $this->connection->query("SELECT * FROM user inner join admin on admin.userID = user.ID 
		where user.account = '$account' AND user.password = '$password'");
		if (!empty(mysqli_num_rows($isAdmin))) {
			$result =  mysqli_fetch_assoc($isAdmin);
			$dataResponse['info'] = $result;
			$dataResponse['active'] = true;
			$_SESSION['info'] = $result;
			echo json_encode($dataResponse);
			return;
		}
		$isStatus = $this->connection->query("SELECT * FROM user inner join student on student.userID = user.ID 
		where user.account = '$account' AND user.password = '$password' AND student.status = 1;");
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
		$education = $data['education'];
		$password = $data['password'];
		$isFoundAccount = $this->connection->query("SELECT account FROM user WHERE account = '$account'");
		$isFoundEmail = $this->connection->query("SELECT account FROM user WHERE email = '$email'");
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
		$this->connection->query("INSERT INTO user(account,email,username,password)
			VALUE('$account','$email','$username','$password');
			");
		$this->connection->query("INSERT INTO lecturer(userID,education)
			VALUE(last_insert_id(),'$education');
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
		$isAccount = $this->connection->query("SELECT * FROM user where account = '$account'");
		if (empty(mysqli_num_rows($isAccount))) {
			$dataResponse['isAccount'] = true;
		}
		$isPassword = $this->connection->query(" SELECT * FROM user where password = '$password'");
		if (empty(mysqli_num_rows($isPassword))) {
			$dataResponse['isPassword'] = true;
		}
		if (!empty($dataResponse)) {
			echo json_encode($dataResponse);
			return;
		}
		$isAdmin = $this->connection->query("SELECT * FROM user inner join admin on admin.userID = user.ID 
		where user.account = '$account' AND user.password = '$password'");
		if (!empty(mysqli_num_rows($isAdmin))) {
			$result =  mysqli_fetch_assoc($isAdmin);
			$dataResponse['info'] = $result;
			$dataResponse['active'] = true;
			$_SESSION['info'] = $result;
			echo json_encode($dataResponse);
			return;
		}
		$isStatus = $this->connection->query("SELECT * FROM user inner join lecturer on lecturer.userID = user.ID 
		where user.account = '$account' AND user.password = '$password' AND lecturer.status = 1;");
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