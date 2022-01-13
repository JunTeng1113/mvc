<?php
    namespace app\Models;
    require_once __DIR__.'/../../vendor/Autoload.php';
    use vendor\DB;
    class UserRole {
        public function addUserRole($userID) {
            $sql = "INSERT INTO user_role (user_id, role_id) VALUES (?, '1');";
            $arg = array($userID);
            return DB::insert($sql, $arg);
        }
    }
?>
