<?php
    namespace app\Models;
    require_once __DIR__.'/../../vendor/Autoload.php';
    use vendor\DB;
    class Resident {

        public function getResidents($unitID, $status = 'all') {
            switch ($status) {
                case '0':
                    $sql = "SELECT * FROM `residents` WHERE `UnitID`=?";
                    $arg = array($unitID);
                    break;
                
                default:
                    $sql = "SELECT * FROM `residents`";
                    $arg = NULL;
                    break;
            }
            return DB::select($sql, $arg);
        }
        public function getResident($unitID, $ResName) {
            $sql = "SELECT * FROM `residents` WHERE `UnitID`=? AND `ResName`=?";
            $arg = array($unitID, $ResName);
            return DB::select($sql, $arg);
        }

        public function newResident($name, $phone, $id) {
            $sql = "INSERT INTO `residents` (`ResName`, `Phone`, `UnitID`) VALUES (?, ?, ?)";
            $arg = array($name, $phone, $id);
            return DB::insert($sql, $arg);
        }

        public function removeResident($id, $name) {
            $sql = "DELETE FROM `residents` WHERE UnitID = ? AND ResName = ?";
            $arg = array($id, $name);
            return DB::delete($sql, $arg);
        }

        public function updateResident($id, $name, $phone) {
            $sql = "UPDATE `residents` SET `Phone`=? WHERE ResID IN (SELECT ResID FROM residents WHERE UnitID=? AND ResName=?)";
            $arg = array($phone, $id, $name);
            return DB::update($sql, $arg);
        }
    }
?>
