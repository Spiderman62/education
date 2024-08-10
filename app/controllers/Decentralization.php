<?php
class Decentralization extends Controller
{
	private $DecentralizationModel, $data;
	public function __construct()
	{
		$this->DecentralizationModel = $this->model('DecentralizationModel');
	}
	public function lecturer()
	{
		$this->data['title'] = "Lecturer";
		$this->data['css'] = "decentralization/style";
		$this->data['js'] = "decentralization/script";
		$this->data['js_role'] = "decentralization/lecturers/javascript/lecturers";
		$this->data['page'] = "pages/decentralization/decentralization_role";
		$this->data['gsap'] = true;
		$this->data['content']['role'] = "lecturer";
		$this->data['icon'] = true;
		$this->data['root'] = true;
		$this->data['jQuery'] = true;
		$this->data['sweetAlert'] = true;
		$this->data['validate'] = true;
		$this->view('decentralization_layout', $this->data);
	}
	public function student()
	{
		$this->data['title'] = "Student";
		$this->data['css'] = "decentralization/style";
		$this->data['js'] = "decentralization/script";
		$this->data['js_role'] = "decentralization/clients/javascript/clients";
		$this->data['page'] = "pages/decentralization/decentralization_role";
		$this->data['gsap'] = true;
		$this->data['content']['role'] = "student";
		$this->data['icon'] = true;
		$this->data['jQuery'] = true;
		$this->data['root'] = true;
		$this->data['sweetAlert'] = true;
		$this->data['validate'] = true;
		$this->view('decentralization_layout', $this->data);
	}
	public function activeAccountStudent($email = [])
	{
		$this->DecentralizationModel->activeAccountStudent($email);
		$this->data['page'] = 'pages/decentralization/turnBack';
		$this->data['css'] = 'decentralization/clients/css/turnBack';
		$this->data['content']['check'] = true;
		$this->data['sweetAlert'] = true;
		$this->data['js'] = 'decentralization/clients/javascript/turnBack';
		$this->view('decentralization_layout', $this->data);
	}
	public function forget_student()
	{
		$email = $_POST['email'];
		echo json_encode(true);
		$title = "Quên mật khẩu - EduQuiz";
		$html = "
		<table table cellpadding='0' cellspacing='0' style='max-width:600px;margin:0 auto;background-color:white;box-shadow:0 0 10px rgba(0,0,0,0.1)'>
 	   <tr>
        <td style='padding:40px'>
            <h1 style='text-align:center;color:#1E88E5;font-size:28px;font-weight:bold;margin-top:0'>Quên mật khẩu</h1>
            <p style='font-size:16px;line-height:1.5;margin-bottom:20px'>
                Chúng tôi nhận được yêu cầu đặt lại mật khẩu của bạn. Vui lòng nhấp vào liên kết bên dưới để thiết lập mật khẩu mới.
            </p>
            <a href='" . __ROOT__ . "decentralization/formChangePasswordStudent/" . $email . "' style='font-size:20px;color:#1E88E5;display:block;text-align:center;text-decoration:none;padding:15px 0'>Đặt lại mật khẩu</a>
        </td>
   		 </tr>
		</table>
		";
			$this->sendEmail($title, $html, $email);
	}
	public function formChangePasswordStudent($email = []) {
		$information = $this->DecentralizationModel->getInformationStudent($email);
		$this->data['page'] = 'pages/clients/forget';
		$this->data['css'] = 'clients/css/forget';
		$this->data['content']['information'] = $information;
		$this->data['sweetAlert'] = true;
		$this->data['js'] = 'clients/javascript/forget';
		$this->data['validate'] = true;
		$this->data['jQuery'] = true;
		$this->data['root'] = true;
		$this->view('decentralization_layout', $this->data);
	}
	public function authenticationPasswordStudent() {
		$this->DecentralizationModel->authenticationPasswordStudent();
	}
	public function forget_lecturer()
	{
		$email = $_POST['email'];
		echo json_encode(true);
		$title = "Quên mật khẩu - EduQuiz";
		$html = "
		<table table cellpadding='0' cellspacing='0' style='max-width:600px;margin:0 auto;background-color:white;box-shadow:0 0 10px rgba(0,0,0,0.1)'>
 	   <tr>
        <td style='padding:40px'>
            <h1 style='text-align:center;color:#1E88E5;font-size:28px;font-weight:bold;margin-top:0'>Quên mật khẩu</h1>
            <p style='font-size:16px;line-height:1.5;margin-bottom:20px'>
                Chúng tôi nhận được yêu cầu đặt lại mật khẩu của bạn. Vui lòng nhấp vào liên kết bên dưới để thiết lập mật khẩu mới.
            </p>
            <a href='" . __ROOT__ . "decentralization/formChangePasswordLecturer/" . $email . "' style='font-size:20px;color:#1E88E5;display:block;text-align:center;text-decoration:none;padding:15px 0'>Đặt lại mật khẩu</a>
        </td>
   		 </tr>
		</table>
		";
			$this->sendEmail($title, $html, $email);
	}
	public function formChangePasswordLecturer($email = []) {
		$information = $this->DecentralizationModel->getInformationLecturer($email);
		$this->data['page'] = 'pages/lecturer/forget';
		$this->data['css'] = 'lecturer/css/forget';
		$this->data['content']['information'] = $information;
		$this->data['sweetAlert'] = true;
		$this->data['js'] = 'lecturer/javascript/forget';
		$this->data['validate'] = true;
		$this->data['jQuery'] = true;
		$this->data['root'] = true;
		$this->view('decentralization_layout', $this->data);
	}
	public function authenticationPasswordLecturer() {
		$this->DecentralizationModel->authenticationPasswordLecturer();
	}
}
