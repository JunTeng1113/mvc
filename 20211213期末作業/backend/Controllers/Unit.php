<?php
    require_once './DB.php';
    require_once './Controller.php'; //index.php的相對路徑
    class Unit extends Controller {
        public function getUnits() {
            DB::connect();
            if (isset($_POST['UnitID'])) {
                $id = $_POST['UnitID'];
                $sql = "SELECT * FROM `units` WHERE `UnitID`=?";
                $arg = array($id);

            } else {
                $sql = "SELECT * FROM `units`";
                $arg = NULL;
            }
            return DB::select($sql, $arg);
        }

        public function newUnit() {
            $id = $_POST['UnitID'];
            $name = $_POST['UnitName'];
        
            DB::connect();
            $sql = "INSERT INTO `units` (`UnitID`, `UnitName`) VALUES (?, ?)";
            return DB::insert($sql, array($id, $name));
        }

        public function removeUnit() {
            $id = $_POST['UnitID'];
            DB::connect();
            $sql = "DELETE FROM `units` WHERE UnitID=?";
            return DB::delete($sql, array($id));
        }

        public function updateUnit() {
            $id = $_POST['UnitID'];
            $name = $_POST['UnitName'];
        
            DB::connect();
            $sql = "UPDATE `units` SET `UnitName`=? WHERE UnitID=?";
            return DB::update($sql, array($name, $id));
        }
    }
?>