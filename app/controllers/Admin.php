<?php
	class Admin extends Controller{
		private $data,$AdminModel;
		public function __construct(){
			$this->AdminModel = $this->model('AdminModel');
		}
		public function index() {
			$this->data['page'] = 'pages/admin/admin';
			$this->data['title'] = 'Admin';
			$this->data['css'] = 'admin/css/admin';
			$this->data['js'] = 'admin/javascript/admin';
			$this->data['jQuery'] = true;
			$this->data['fonts'] = true;
			$this->data['boxicons'] = true;
			$this->data['icon'] = true;
			$this->data['lenis'] = true;
			$this->data['root'] = true;
			$this->data['gsap'] = true;
			$this->data['sweetAlert'] = true;
			$this->data['scrollTrigger'] = true;
			$this->view('admin_layout',$this->data);
		}
		public function getInforStudent() {
			$this->AdminModel->getInforStudent();
		}
		public function getInforLecturer() {
			$this->AdminModel->getInforLecturer();
		}
		public function countAllUsers(){
			$this->AdminModel->countAllUsers();
		}
		public function updateStudent(){
			$array = [];
			$array['id'] = $_POST['id'];
			$array['id_major'] = $_POST['id_major'];
			$array['account'] = $_POST['account'];
			$array['user_name'] = $_POST['user_name'];
			$array['email'] = $_POST['email'];
			$array['password'] = $_POST['password'];
			$array['phone'] = $_POST['phone'];
			$array['status'] = $_POST['status'];
			$this->AdminModel->updateStudent($array);
		}
		public function updateLecturer(){
			$array = [];
			$array['id'] = $_POST['id'];
			$array['account'] = $_POST['account'];
			$array['user_name'] = $_POST['user_name'];
			$array['email'] = $_POST['email'];
			$array['id_education'] = $_POST['id_education'];
			$array['phone'] = $_POST['phone'];
			$array['password'] = $_POST['password'];
			$array['status'] = $_POST['status'];
			$this->AdminModel->updateLecturer($array);
		}
		public function deleteStudent() {
			$this->AdminModel->deleteStudent();
		}
		public function deleteLecturer() {
			$this->AdminModel->deleteLecturer();
		}
		public function activeAccountLecturer(){
			$title = "Congratulation";
			$html = '<!DOCTYPE html>
			<html lang="en">
			<head>
  			<meta charset="UTF-8">
  			<meta name="viewport" content="width=device-width, initial-scale=1.0">
  			<title>Tài khoản giảng viên đã được kích hoạt</title>
  			<style>
    		/* CSS reset */
   			 body, h1, p { margin: 0; padding: 0; }
    		body { font-family: Arial, sans-serif; }

    		/* Container styles */
    		.container {
    		  max-width: 600px;
    		  margin: 0 auto;
    		  background-color: #f4f4f4;
    		  padding: 40px;
    		  border-radius: 8px;
    		  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    		}

    		/* Header styles */
    		.header {
    		  text-align: center;
    		  margin-bottom: 30px;
    		}

    		.header h1 {
    		  color: #0077b6;
    		  font-size: 32px;
    		  font-weight: bold;
    		}

    		/* Content styles */
    		.content p {
    		  color: #333;
    		  font-size: 16px;
    		  line-height: 1.5;
    		  margin-bottom: 20px;
    		}

    		.content a {
    		  color: #0077b6;
    		  text-decoration: none;
    		}

    		.content a:hover {
    		  text-decoration: underline;
    		}

    		/* Footer styles */
    		.footer {
    		  text-align: center;
    		  color: #777;
    		  font-size: 14px;
    		  margin-top: 30px;
    		}
  			</style>
			</head>
			<body>
			  <div class="container">
			    <div class="header">
			      <h1>Chúc mừng!</h1>
			    </div>
			    <div class="content">
			      <p>Tài khoản giảng viên của bạn đã được kích hoạt thành công.</p>
			      <p>Bạn có thể đăng nhập vào hệ thống và bắt đầu sử dụng các tính năng dành cho giảng viên.</p>
			      <p>Nếu bạn có bất kỳ câu hỏi hoặc cần hỗ trợ, vui lòng liên hệ với chúng tôi theo địa chỉ email <a href="hoangnlpd09770@fpt.edu.vn</a>.</p>
			    </div>
			    <div class="footer">
			      <p>Xin cảm ơn và chúc bạn có một ngày tốt lành!</p>
			    </div>
			  </div>
			</body>
			</html>';
			$email = $_POST['email'];
			$id = $_POST['id'];
			$this->AdminModel->activeAccountLecturer($id);
			$this->sendEmail($title,$html,$email);
		}
		public function getCourses() {
			$this->AdminModel->getCourses();
		}
		public function addCourse() {
			$course = $_POST['course'];
			$admin = $_POST['admin'];
			$this->AdminModel->addCourse($course,$admin);
		}
		public function editCourse(){
			$ID = (INT)$_POST['ID'];
			$edit = $_POST['edit'];
			$this->AdminModel->editCourse($ID,$edit);
		}
		public function deleteCourse() {
			$ID = (INT)$_POST['ID'];
			$this->AdminModel->deleteCourse($ID);
		}
		public function selectLecturerEducation() {
			$id_course = $_POST['id_course'];
			$this->AdminModel->selectLecturerEducation($id_course);
		}
		public function addSubject() {
			$this->AdminModel->addSubject();
		}
	}
?>