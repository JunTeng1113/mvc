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
            $id = $_POST['ResID'];
            DB::connect();
            $sql = "DELETE FROM `residents` WHERE ResID=?";
            return DB::delete($sql, array($id));
        }

        public function updateResident() {
            $id = $_POST['ResID'];
            $name = $_POST['ResName'];
            $phone = $_POST['Phone'];
        
            DB::connect();
            $sql = "UPDATE `residents` SET `ResName`=?, `Phone`=? WHERE ResID=?";
            return DB::update($sql, array($name, $id));
        }
    }
?>