<?php
    require_once './DB.php';
    require_once './Controller.php'; //index.php的相對路徑
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