<?php
    require_once './DB.php';
    require_once './Controller.php'; //index.php的相對路徑
    class Resident extends Controller {
        public function getResidents() {
            DB::connect();
            if (isset($_POST['UnitID'])) {
                $id = $_POST['UnitID'];
                $sql = "SELECT * FROM `residents` WHERE `UnitID`=?";
                $arg = array($id);

            } else {
                $sql = "SELECT * FROM `residents`";
                $arg = NULL;
            }
            return DB::select($sql, $arg);
        }

        public function newResident() {
            $name = $_POST['ResName'];
            $phone = $_POST['Phone'];
            $id = $_POST['UnitID'];
        
            DB::connect();
            $sql = "INSERT INTO `residents` (`ResName`, `Phone`, `UnitID`) VALUES (?, ?, ?)";
            return DB::insert($sql, array($name, $phone, $id));
        }

        public function removeResident() {
            $id = $_POST['UnitID'];
            $name = $_POST['ResName'];
            DB::connect();
            $sql = "DELETE FROM `residents` WHERE UnitID = ? AND ResName = ?";
            return DB::delete($sql, array($id, $name));
        }

        //給戶別及姓名，修改手機號碼
        public function updateResident() {
            $id = $_POST['UnitID'];
            $name = $_POST['ResName'];
            $phone = $_POST['Phone'];
        
            DB::connect();
            $sql = "UPDATE `residents` SET `Phone`=? WHERE ResID IN (SELECT ResID FROM residents WHERE UnitID=? AND ResName=?)";
            return DB::update($sql, array($phone, $id, $name));
        }
    }
?>