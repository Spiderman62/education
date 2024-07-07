const aside = {
	main() {
		$('aside .information .mode-switch .wrapper_mode-switch').on('click', function () {
			$('body').toggleClass('dark');
			if($('body').hasClass('dark')){
				$('aside .information .mode-switch .type').text('Light mode');
			}else{
				$('aside .information .mode-switch .type').text('Dark mode');
			}
		});
		$('aside header .toggle').on('click',function(){
			$('aside').toggleClass('close');
		});
		$('aside .menu .search-box .icon').on('click',function(){
			$('aside').removeClass('close');
		});
	}
}
aside.main();