<?php
class Ajax extends Controller
{
	private $DecentralizationModel, $data;
	public function __construct()
	{
		$this->DecentralizationModel = $this->model('DecentralizationModel');
	}
	public function getStudyField()
	{
		echo $this->DecentralizationModel->getStudyField();
	}
	public function getLecturerField()
	{
		echo $this->DecentralizationModel->getLecturerField();
	}
	public function studentSignUp()
	{
		$this->data['sendEmail'] = false;
		$this->data['account'] = $_POST['account'];
		$this->data['username'] = $_POST['username'];
		$this->data['id_major'] = $_POST['id_major'];
		$this->data['email'] = $_POST['email'];
		$this->data['password'] = $_POST['password'];

		$this->data['sendEmail'] = $this->DecentralizationModel->studentSignUp($this->data);

		if (!empty($this->data['sendEmail'])) {
			$title = "Chào mừng ".$this->data['username']." đến với EduQuiz";
			$html = "
    			<table cellpadding='0' cellspacing='0' style='max-width:600px;margin:0 auto;background-color:white;box-shadow:0 0 10px rgba(0,0,0,0.1)'>
        		<tr>
            	<td style='padding:40px'>
                <h1 style='text-align:center;color:#1E88E5;font-size:28px;font-weight:bold;margin-top:0'>Chào mừng bạn đến với EduQuiz!</h1>
                <p style='font-size:16px;line-height:1.5;margin-bottom:20px'>
                    Chúng tôi rất vui mừng khi bạn đã quyết định tham gia vào cộng đồng EduQuiz. Nền tảng này được xây dựng với mục tiêu cải thiện và nâng cao chất lượng giáo dục, và chúng tôi tin rằng sự tham gia của bạn sẽ là một phần quan trọng trong hành trình này.
                </p>
                <a href='" . __ROOT__ . "decentralization/activeAccountStudent/" . $this->data['email'] . "' style='font-size:20px;color:#1E88E5;display:block;text-align:center;text-decoration:none;padding:15px 0'>Kích hoạt tài khoản ngay bây giờ</a>
            	</td>
        		</tr>
    			</table>
					";
			$this->sendEmail($title, $html, $this->data['email']);
		}
	}
	public function studentSignIn()
	{
		$this->data['account'] = $_POST['account'];
		$this->data['password'] = $_POST['password'];
		$this->DecentralizationModel->studentSignIn($this->data);
	}
	public function lecturerSignUp(){
		$this->data['sendEmail'] = false;
		$this->data['account'] = $_POST['account'];
		$this->data['username'] = $_POST['username'];
		$this->data['email'] = $_POST['email'];
		$this->data['id_education'] = $_POST['id_education'];
		$this->data['password'] = $_POST['password'];

		$this->data['sendEmail'] = $this->DecentralizationModel->lecturerSignUp($this->data);
		if (!empty($this->data['sendEmail'])) {
			$title = "Congratulate! Lecturer " . $this->data['username'] . " registered to use our EduQuiz";
			$html = "<table cellpadding='0' cellspacing='0' style='border-collapse: collapse; border: none; width: 100%; max-width: 600px; margin: 0 auto;'>
  				<tr>
   				 <td style='border: none; padding: 20px 0; background-color: #f8f8f8; text-align: center;'>
      				<h2 style='margin: 0; color: #333; font-size: 24px; font-weight: bold;'>Chúc mừng!</h2>
    			</td>
  				</tr>
  				<tr>
    			<td style='border: none; padding: 20px; background-color: #fff;'>
      				<p style='margin: 0; color: #555; font-size: 16px;'>Giảng viên <strong>" . $this->data['username'] . "</strong> đã đăng ký sử dụng ứng dụng EduQuiz của chúng tôi.</p>
    			</td>
  				</tr>
  				<tr>
    			<td style='border: none; padding: 20px; background-color: #fff;'>
      			<p style='margin: 0; color: #555; font-size: 16px;'>Chúng tôi rất vui mừng khi được hỗ trợ " . $this->data['username'] . " trong quá trình sử dụng ứng dụng.</p>
    			</td>
  				</tr>
  				<tr>
    			<td style='border: none; padding: 20px; background-color: #fff;'>
      			<p style='margin: 0; color: #555; font-size: 16px;'>Nếu " . $this->data['username'] . " có bất kỳ câu hỏi hoặc đề xuất nào, vui lòng liên hệ với chúng tôi.</p>
    			</td>
  				</tr>
  				<tr>
    			<td style='border: none; padding: 20px; background-color: #fff;'>
      			<p style='margin: 0; color: #555; font-size: 16px;'>Chúc " . $this->data['username'] . " có trải nghiệm tuyệt vời với ứng dụng của chúng tôi!</p>
    			</td>
  				</tr>
				</table>";
				$this->sendEmail($title, $html, $this->data['email']);
		}
	}
	public function lecturerSignIn()
	{
		$this->data['account'] = $_POST['account'];
		$this->data['password'] = $_POST['password'];
		$this->DecentralizationModel->lecturerSignIn($this->data);
	}
}