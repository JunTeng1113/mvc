<?php
    namespace app\Controllers;
    require_once __DIR__.'/../../vendor/Autoload.php';
    use vendor\Controller;
    use vendor\DB;
    class Unit extends Controller {
        public function getUnits() {
            DB::connect();
            if (isset($_POST['UnitID'])) {
                $id = $_POST['UnitID'];
                $sql = "SELECT units.UnitID, ifnull(t1.ResNumber, 0) AS ResNumber
                        FROM units
                            LEFT JOIN 
                                (SELECT residents.UnitID AS UnitID,
                                    COUNT(residents.ResID) AS ResNumber
                                FROM residents
                                GROUP BY residents.UnitID) AS t1 ON units.UnitID = t1.UnitID
                                WHERE `units`.`UnitID`=?";
                $arg = array($id);

            } elseif (isset($_POST['FilterValue']) && $_POST['FilterValue'] != '') {
                $filterValue = $_POST['FilterValue'];

                $sql = "SELECT units.UnitID, ifnull(t1.ResNumber, 0) AS ResNumber
                        FROM units
                            JOIN 
                                (SELECT residents.UnitID AS UnitID,
                                    COUNT(residents.ResID) AS ResNumber
                                FROM residents
                                WHERE residents.ResName LIKE '%" . $filterValue . "%'
                                    OR residents.UnitID LIKE '%" . $filterValue . "%'
                                GROUP BY residents.UnitID) AS t1 ON units.UnitID = t1.UnitID";
                $arg = NULL;

            // 以棟別與樓層查詢該棟該樓層所有的戶別
            } elseif (isset($_POST['Building']) && isset($_POST['Floor'])) {
                $building = $_POST['Building'];
                $floor = $_POST['Floor'];

                $sql = "SELECT units.UnitID AS unitid
                        FROM units
                        WHERE units.Building = ?
                            AND units.Floor = ?";
                $arg = array($building, $floor);

            } else {
                $sql = "SELECT units.UnitID, ifnull(t1.ResNumber, 0) AS ResNumber
                        FROM units
                            LEFT JOIN 
                                (SELECT residents.UnitID AS UnitID,
                                    COUNT(residents.ResID) AS ResNumber
                                FROM residents
                                GROUP BY residents.UnitID) AS t1 ON units.UnitID = t1.UnitID
                        ORDER BY units.Building, units.Floor, units.Room";
                $arg = NULL;
            }
            return DB::select($sql, $arg);
        }

        public function getBuildings() {
            DB::connect();
            $sql = "SELECT DISTINCT units.Building AS building
                    FROM units";
            $arg = NULL;
            return DB::select($sql, $arg);
        }
        
        public function getFloor() {
            $building = $_POST['Building'];

            DB::connect();
            $sql = "SELECT DISTINCT units.Floor AS floor
                    FROM `units` 
                    WHERE units.Building = ?
                    ORDER BY units.Floor";
            $arg = array($building);
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