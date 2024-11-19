<?php
use PHPMailer\PHPMailer\PHPMailer;
class Controller
{
	public function model($model)
	{
		if (file_exists("./app/models/" . $model . ".php")) {
			require_once "./app/models/" . $model . ".php";
			return new $model();
		}
	}
	public function view($view, $data = [])
	{
		extract($data);
		if (file_exists("./app/views/" . $view . ".php")) {
			require_once "./app/views/" . $view . ".php";
		}
	}
	public function sendEmail($title, $html,$email)
	{
		
		require_once "./app/libraries/PHPMailer/src/PHPMailer.php";
		require_once "./app/libraries/PHPMailer/src/SMTP.php";
		require_once "./app/libraries/PHPMailer/src/Exception.php";
		$mail = new PHPMailer(true);
		$mail->isSMTP();
		$mail->Host = 'smtp.gmail.com';
		$mail->SMTPAuth = true;
		$mail->Username = "hoangnlpd09770@fpt.edu.vn";
		$mail->Password = "tttv fmok txsh ivae";
		$mail->SMTPSecure = 'ssl';
		$mail->Port = 465;
		$mail->addAddress($email);
		$mail->CharSet = 'UTF-8';
		$mail->isHTML(true);
		$mail->Subject = $title;
		$mail->Body = $html;
		$mail->send();
	}
}
