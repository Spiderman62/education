$(function(){
	$('#account').on("blur",function(){
	 	let accountValue = $(this).val();
		$.post("http://localhost/education/Ajax/checkUserExist", {account:accountValue},
			function (data, textStatus, jqXHR) {
				console.log(data);
			},"json"
		);
		//  $('.message').text(accountValue);
	});
});