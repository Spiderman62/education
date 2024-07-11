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
	public function studentSignUp($data){
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
	public function activeAccountStudent($email){
		$this->connection->query("UPDATE student SET student.status = 1
		WHERE student.userID = (SELECT user.ID FROM user
    	WHERE user.email = '$email');");
	}
}
