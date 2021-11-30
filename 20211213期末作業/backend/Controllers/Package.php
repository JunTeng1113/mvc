<?php
    require_once './DB.php';
    require_once './Controller.php'; //index.php的相對路徑
    class Package extends Controller {
        public function getpackages() {
            DB::connect();
            if (isset($_POST['PackageID'])) {
                $id = $_POST['PackageID'];
                $sql = "SELECT * FROM `packages` WHERE `PackageID`=?";
                $arg = array($id);

            } else {
                $sql = "SELECT * FROM `packages`";
                $arg = NULL;
            }
            return DB::select($sql, $arg);
        }

        public function newPackage() {
            $id = $_POST['RecipientID'];
            $content = $_POST['Content'];
            $note = $_POST['Note'];
            //$confirmTime 取件時間
            //$arriveTime 代收時間
        
            DB::connect();
            $sql = "INSERT INTO `packages` (`RecipientID`, `Content`, `Note`) VALUES (?, ?, ?)";
            return DB::insert($sql, array($id, $content, $note));
        }

        public function removePackage() {
            $id = $_POST['PackageID'];
            DB::connect();
            $sql = "DELETE FROM `packages` WHERE PackageID=?";
            return DB::delete($sql, array($id));
        }

        public function updatePackage() {
            $id = $_POST['PackageID'];
            $content = $_POST['Content'];
            $note = $_POST['Note'];
        
            DB::connect();
            $sql = "UPDATE `packages` SET `Content`=?, `Note`=? WHERE PackageID=?";
            return DB::update($sql, array($content, $note, $id));
        }

        public function confirmPackage() {
            $id = $_POST['PackageID'];
        
            DB::connect();
            $sql = "UPDATE `packages` SET `ConfirmTime`=NOW() WHERE PackageID=?";
            return DB::update($sql, array($id));
        }
        
        public function unconfirmPackage() {
            $id = $_POST['PackageID'];
        
            DB::connect();
            $sql = "UPDATE `packages` SET `ConfirmTime`='' WHERE PackageID=?";
            return DB::update($sql, array($id));
        }
    }
?>