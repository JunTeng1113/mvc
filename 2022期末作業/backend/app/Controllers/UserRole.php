<?php
    namespace app\Controllers;
    require_once __DIR__.'/../../vendor/Autoload.php';
    use vendor\Controller;
    use vendor\DB;
    use app\Models\UserRole as UserRoleModel;
    use app\Middleware\AuthMiddleware;
    class UserRole extends Controller {

        private $userRole;
        public function __construct() {
            $this -> userRole = new UserRoleModel();
        }

        public function addUserRole() {
            $userID = $_POST['UserID'];
            return $this -> userRole -> addUserRole($userID);
        }
    }
?>