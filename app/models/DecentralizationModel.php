<?php
	class DecentralizationModel extends DB{
		public function getStudyField() {
			$study_fields = $this->connection->query("SELECT * FROM study_fields");
			$array = [];
			while($row = mysqli_fetch_assoc($study_fields)){
				$array[] = $row;
			}
			header('Content-Type: application/json');
			return json_encode($array);
		}
		public function studentSignUp($data) {
			// $this->connection

		}
	}
?>