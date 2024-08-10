<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title><?php echo !empty($title) ? $title : "AZT"?></title>
	<?php if (!empty($css)) {
	?>
		<link rel="stylesheet" href=<?php echo __ROOT__ . "public/" . $css . ".css?v=" . time(); ?>>
	<?php } ?>
	<?php if (!empty($icon)) {
	?>
		<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css" integrity="sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A==" crossorigin="anonymous" referrerpolicy="no-referrer" />
	<?php } ?>
	<?php if (!empty($jQuery)) {
	?>
		<script src=<?php echo __ROOT__ . "public/jQuery.js?v=" . time(); ?>></script>
	<?php } ?>
	<?php
		if(!empty($sweetAlert)){
	?>
	<script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>
	<?php }?>
</head>
<body>
	<?php
	if(!empty($page)){
		$this->view($page,$content);
	}
	?>
	<?php
		if(!empty($root)){
	?>
	<script src=<?php echo __ROOT__ . "public/root.js?v=" . time(); ?>></script>
	<?php }?>
	<?php
		if(!empty($validate)){
	?>
	<script src=<?php echo __ROOT__ . "public/validate.js?v=" . time(); ?>></script>
	<?php }?>
	<?php if (!empty($gsap)) {
	?>
		<script src=<?php echo __ROOT__ . "public/gsap/umd/gsap.js?v=" . time(); ?>></script>
	<?php } ?>
	<?php if (!empty($js)) {
	?>
		<script src=<?php echo __ROOT__ . "public/" . $js . ".js?v=" . time(); ?>></script>
	<?php } ?>
	<?php if (!empty($js_role)) {
	?>
		<script src=<?php echo __ROOT__ . "public/" . $js_role . ".js?v=" . time(); ?>></script>
	<?php } ?>
</body>
</html>