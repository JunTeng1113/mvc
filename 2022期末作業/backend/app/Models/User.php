<?php
    namespace app\Models;
    require_once __DIR__.'/../../vendor/Autoload.php';
    use vendor\DB;
    class User {
        public function doLogin($id, $password) {
            $sql = "SELECT * 
                    FROM user
                    WHERE user.AccountId = ? AND user.Password = ?";
            $arg = array($id, $password);
            return DB::select($sql, $arg);
        }
        public function hasPermission($userID, $action) {
            $sql = "SELECT *
                    FROM user, user_role, role, action_role, action
                    WHERE user.UserID = user_role.user_id
                        AND user_role.role_id = role.id
                        AND role.id = action_role.role_id
                        AND action_role.action_id = action.id
                        AND user.UserID = ?
                        AND action.name = ?";
            $arg = array($userID, $action);
            return DB::select($sql, $arg);
        }

        public function getUserInfo($userID) {
            $sql = "SELECT *
                    FROM user
                    WHERE user.UserID LIKE ?";
            $arg = array($userID);
            return DB::select($sql, $arg);
        }

        public function registerUser($UnitID, $accountID, $password, $phone) {
            $sql = "INSERT INTO user( UnitID, AccountID, Password, Phone) VALUES (?, ?, ?, ?)";
            $arg = array($UnitID, $accountID, $password, $phone);
            return DB::insert($sql, $arg);
        }
    }
?>
