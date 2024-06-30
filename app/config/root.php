<?php
$countPath = explode("\\",dirname(dirname(dirname(__FILE__))));
$root = $countPath[count($countPath) - 1];
$root = "http://" .$_SERVER['HTTP_HOST'] ."/". $root. "/";
define("__ROOT__",$root);
?>