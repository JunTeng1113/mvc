<?php
    require_once '../vendor/DB.php';
    require_once '../vendor/Controller.php'; //index.php的相對路徑
    class Role extends Controller {
        public function getRoles() {
            DB::connect();
            if (isset($_POST['RoleId'])) {
                $id = $_POST['RoleId'];
                $sql = "SELECT * FROM `Role` WHERE `RoleId`=?";
                $arg = array($id);

            } else {
                $sql = "SELECT * FROM `Role`";
                $arg = NULL;
            }
            return DB::select($sql, $arg);
        }

        public function newRole() {
            $name = $_POST['RoleName'];
        
            DB::connect();
            $sql = "INSERT INTO `role` (`RoleName`) VALUES (?)";
            return DB::insert($sql, array($name));
        }

        public function removeRole() {
            $id = $_POST['RoleId'];
            DB::connect();
            $sql = "DELETE FROM `role` WHERE RoleId=?";
            return DB::delete($sql, array($id));
        }

        public function updateRole() {
            $id = $_POST['RoleId'];
            $name = $_POST['RoleName'];
        
            DB::connect();
            $sql = "UPDATE `role` SET `RoleName`=? WHERE RoleId=?";
            return DB::update($sql, array($name, $id));
        }
    }
?>