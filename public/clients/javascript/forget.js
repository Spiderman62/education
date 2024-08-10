$(function(){
	validate({
		form:'.update-new-password',
		selectors:[
			checkBlank('input[name="password"]'),
			checkLength('input[name="password"]',5),
			checkBlank('input[name="confirm_password"]'),
			checkLength('input[name="confirm_password"]',5),
			checkMatch('input[name="confirm_password"]',()=>$('.update-new-password input[name="password"]').val())
		],
		callback(forms){
			$.post(ROOT+"decentralization/authenticationPasswordStudent",forms,
				function (data, textStatus, jqXHR) {
					if(data){
						swal(`Đổi mật khẩu thành công`,{timer:5000,button:false,icon:'success'});
						$('.profile-card').fadeOut(50);
						$('.turn-back').fadeIn(500);
					}
				},
				"json"
			);
		}
	})
})