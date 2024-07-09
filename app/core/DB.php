<?php
	class DB{
		public $connection;
		private $server = "localhost";
		private $username = "root";
		private $password = "aztenderio7146";
		private $database = "education";
		public function __construct(){
			$this->connection = mysqli_connect($this->server,$this->username,$this->password,$this->database);	
		}
	}
?>