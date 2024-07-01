<!DOCTYPE html>
<html lang="en">

<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title><?php echo isset($title) ? $title : "Education"; ?></title>
	<?php if ($css) {
	?>
		<link rel="stylesheet" href=<?php echo __ROOT__ . "public/" . $css . ".css?v=" . time(); ?>>
	<?php } ?>
	<?php if ($header_css) {
	?>
		<link rel="stylesheet" href=<?php echo __ROOT__ . "public/" . $header_css . ".css?v=" . time(); ?>>
	<?php } ?>
	<?php if ($icon) {
	?>
		<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css" integrity="sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A==" crossorigin="anonymous" referrerpolicy="no-referrer" />
	<?php } ?>
	<?php if ($jQuery) {
	?>
		<script src=<?php echo __ROOT__ . "public/" . $jQuery . ".js?v=" . time(); ?>></script>
	<?php } ?>
</head>

<body>
	<?php $this->view($header, $content); ?>
	<?php $this->view($page); ?>
	<?php
	//  $this->view($footer) 
	?>
	<?php if ($lenis) { ?>
		<script src="https://unpkg.com/lenis@1.0.45/dist/lenis.min.js"></script>
	<?php } ?>
	<?php if ($gsap) {
	?>
		<script src=<?php echo __ROOT__ . "public/" . $gsap . ".js?v=" . time(); ?>></script>
	<?php } ?>
	<?php if ($script) {
	?>
		<script src=<?php echo __ROOT__ . "public/" . $script . ".js?v=" . time(); ?>></script>
	<?php } ?>
	<?php if ($header_js) {
	?>
		<script src=<?php echo __ROOT__ . "public/" . $header_js . ".js?v=" . time(); ?>></script>
	<?php } ?>

</body>

</html>