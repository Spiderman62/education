const form = {
	main(){
		$('#sign-up-btn').on('click',function(){
			$('.container').addClass('sign-up-mode');
		});
		$('#sign-in-btn').on('click',function(){
			$('.container').removeClass('sign-up-mode');
		});
	}
}
form.main();
