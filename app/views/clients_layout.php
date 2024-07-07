<!DOCTYPE html>
<html lang="en">

<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title><?php echo !empty($title) ? $title : "Education"; ?></title>
	<?php if (!empty($css)) {
	?>
		<link rel="stylesheet" href=<?php echo __ROOT__ . "public/" . $css . ".css?v=" . time(); ?>>
	<?php } ?>
	<?php if (!empty($aside_css)) {
	?>
		<link rel="stylesheet" href=<?php echo __ROOT__ . "public/" . $aside_css . ".css?v=" . time(); ?>>
	<?php } ?>
	<?php if (!empty($header_css)) {
	?>
		<link rel="stylesheet" href=<?php echo __ROOT__ . "public/" . $header_css . ".css?v=" . time(); ?>>
	<?php } ?>
	<?php if (!empty($footer_css)) {
	?>
		<link rel="stylesheet" href=<?php echo __ROOT__ . "public/" . $footer_css . ".css?v=" . time(); ?>>
	<?php } ?>
	<?php
	if (!empty($fonts)) {
	?>
		<link rel="preconnect" href="https://fonts.googleapis.com">
		<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
		<link href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap" rel="stylesheet">
	<?php } ?>
	<?php if (!empty($icon)) {
	?>
		<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css" integrity="sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A==" crossorigin="anonymous" referrerpolicy="no-referrer" />
	<?php } ?>
	<?php
	if (!empty($boxicons)) {
	?>
		<link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>
	<?php } ?>
	<?php if (!empty($jQuery)) {
	?>
		<script src=<?php echo __ROOT__ . "public/jQuery.js?v=" . time(); ?>></script>
	<?php } ?>
</head>

<body>
	<?php
	if (!empty($header) && !empty($content)) {
		$this->view($header, $content);
	}
	?>
	<?php
	if (!empty($page)) {
		$this->view($page);
	}
	?>
	<?php
	if (!empty($footer)) {
		$this->view($footer);
	}
	?>
	<?php if (!empty($lenis)) { ?>
		<script src="https://unpkg.com/lenis@1.0.45/dist/lenis.min.js"></script>
	<?php } ?>
	<?php if (!empty($gsap)) {
	?>
		<script src=<?php echo __ROOT__ . "public/gsap/umd/gsap.js?v=" . time(); ?>></script>
	<?php } ?>
	<?php if (!empty($scrollTrigger)) {
	?>
		<script src=<?php echo __ROOT__ . "public/gsap/umd/ScrollTrigger.js?v=" . time(); ?>></script>
	<?php } ?>
	<?php if (!empty($js)) {
	?>
		<script src=<?php echo __ROOT__ . "public/" . $js . ".js?v=" . time(); ?>></script>
	<?php } ?>
	<?php if (!empty($header_js)) {
	?>
		<script src=<?php echo __ROOT__ . "public/" . $header_js . ".js?v=" . time(); ?>></script>
	<?php } ?>

</body>

</html>