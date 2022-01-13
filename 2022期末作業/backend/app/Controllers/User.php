<?php
    namespace app\Controllers;
    require_once __DIR__.'/../../vendor/Autoload.php';
    use vendor\Controller;
    use vendor\DB;
    use app\Models\User as UserModel;
    use app\Middleware\AuthMiddleware;
    class User extends Controller {

        private $user;
        public function __construct() {
            $this -> user = new UserModel();
        }
        public function doLogin() {
            $id = $_POST['id'];
            $password = $_POST['password'];
            return $this -> user -> doLogin($id, $password);
        }

        public function hasPermission() {
            $userID = AuthMiddleware::getUserID();
            $action = $_POST['action'];
            return $this -> user -> hasPermission($userID, $action);
        }
        
        public function getUserInfo() {
            $userID = AuthMiddleware::getUserID();
            return $this -> user -> getUserInfo($userID);
        }
        
        public function registerUser() {
            $unitID = $_POST['UnitID'];
            $accountID = $_POST['AccountID'];
            $password = $_POST['Password'];
            $phone = $_POST['Phone'];
            return $this -> user -> registerUser($unitID, $accountID, $password, $phone);
        }
    }
?>