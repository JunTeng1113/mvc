<?php
    namespace app\Controllers;
    require_once __DIR__."/../../vendor/Autoload.php";
    use vendor\DB;
    use vendor\Controller;
    use app\Models\Login as LoginModel;

    class Login extends Controller {
        private $login;
        public function __construct() {
            $this -> $login = new LoginModel();
        }
        public function login() {
            $id = $_POST['id'];
            $password = $_POST['password'];
            return $this->$login->login($id, $password);
        }
    }
?>