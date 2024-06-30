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
</head>

<body>
	<?php $this->view($header,$content); ?>
	<?php $this->view($page); ?>
	<?php
	//  $this->view($footer) 
	?>
	<?php if ($gsap) {
	?>
		<script src=<?php echo __ROOT__ . "public/" . $gsap . ".js?v=" . time(); ?>></script>
	<?php } ?>
	<?php if ($script) {
	?>
		<script src=<?php echo __ROOT__ . "public/" . $script . ".js?v=" . time(); ?>></script>
	<?php } ?>
</body>

</html>