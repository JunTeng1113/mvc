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

        public function hasPermission() {
            $userID = AuthMiddleware::getUserID();
            $action = $_POST['action'];
            return $this -> user -> hasPermission($userID, $action);
        }
        
        public function getUserInfo() {
            $userID = AuthMiddleware::getUserID();
            return $this -> user -> getUserInfo($userID);
        }
    }
?>