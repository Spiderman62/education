<?php
class App{
	private $controller = "Home", $action = "index", $params = [];
	private function urlProcess(){
		if (isset($_GET['url'])) {
			return array_values(array_filter(explode("/", $_GET['url'])));
		}
	}
	private function showError($type = 404){
		if(file_exists("./app/errors/".$type.".php")){
			require_once "./app/errors/".$type.".php";
		}
	}
	public function __construct(){
		$url = $this->urlProcess();
		// Handle controller
		if (isset($url[0])) {
			if (file_exists("./app/controllers/" . ucfirst($url[0]) . ".php")) {
				$this->controller = ucfirst($url[0]);
				unset($url[0]);
			}
		}
		// Found error if that file not exist class !!!
		require_once "./app/controllers/" . $this->controller . ".php";
		$this->controller = new $this->controller();
		// Handle action
		if (isset($url[1])) {
			if (method_exists($this->controller, $url[1])) {
				$this->action = $url[1];
			}
			unset($url[1]);
		}
		// Handle Params
		$this->params = $url ? array_values($url) : [];
		// Main core
		call_user_func_array([$this->controller, $this->action], $this->params);
	}
}