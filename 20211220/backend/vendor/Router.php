<?php
    namespace vendor;
    use app\Controllers as app;
    class Router {
        private $routeTable;
        public function __construct() {
            $this->routeTable = array();
        }
    
        public function register($action, $class, $method) {
            $arr['class'] = $class;
            $arr['method'] = $method;
            $this->routeTable[$action] = $arr;
        }
    
        public function run($action) {
            $class = $this -> routeTable[$action]['class'];
            $method = $this -> routeTable[$action]['method'];
            // require_once './Controllers/' . $class . '.php';
            $class = 'app\Controllers\\' . $class; 
            $controller = new $class;
            $response = $controller->$method();
            return $response;
        }
    }
?>