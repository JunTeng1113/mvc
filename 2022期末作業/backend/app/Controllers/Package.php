<?php
    namespace app\Controllers;
    require_once __DIR__.'/../../vendor/Autoload.php';
    use vendor\Controller;
    use vendor\DB;
    class Package extends Controller {
        public function getRecords() {
            DB::connect();
            $sql = "SELECT * 
                    FROM `packages` LEFT JOIN `units` ON `packages`.`UnitID` = `units`.`UnitID`
                    WHERE `packages`.`ConfirmTime` IS NOT NULL
                    ORDER BY `packages`.`ConfirmTime` DESC";
            $arg = NULL;
            return DB::select($sql, $arg);
        }
        public function getpackages() {
            DB::connect();
            if (isset($_POST['PackageID'])) {
                $id = $_POST['PackageID'];
                $sql = "SELECT * 
                        FROM `packages` LEFT JOIN `units` ON `packages`.`UnitID` = `units`.`UnitID`
                        WHERE `PackageID`=?
                        ORDER BY `packages`.`ArriveTime` DESC";
                $arg = array($id);

            } elseif (isset($_POST['FilterValue'])) {
                $filterValue = $_POST['FilterValue'];
                $sql = "SELECT * 
                        FROM `packages` LEFT JOIN `units` ON `packages`.`UnitID` = `units`.`UnitID`
                        WHERE `packages`.`UnitID` = '" . $filterValue . "' AND `packages`.`ConfirmTime` IS NULL
                        ORDER BY `packages`.`ArriveTime` DESC";
                $arg = NULL;
            
            } else {
                $sql = "SELECT * 
                        FROM `packages` LEFT JOIN `units` ON `packages`.`UnitID` = `units`.`UnitID`
                        WHERE 1
                        ORDER BY `packages`.`ArriveTime` DESC";
                $arg = NULL;
            }
            
            return DB::select($sql, $arg);
        }
        

        public function getAUTO_INCREMENT() {
            DB::connect();
            $sql = "SELECT AUTO_INCREMENT AS ai
                    FROM INFORMATION_SCHEMA.TABLES
                    WHERE TABLE_NAME = 'packages'
                    ORDER BY ai DESC
                    LIMIT 0, 1";
            $arg = NULL;
            
            return DB::select($sql, $arg);
        }

        public function newPackage() {
            $id = $_POST['UnitID'];
            $name = $_POST['RecipientName'];
            $type = $_POST['Type'];
            $note = $_POST['Note'];
            //$confirmTime 取件時間
            //$arriveTime 代收時間
        
            DB::connect();
            $sql = "INSERT INTO `packages` (`UnitID`, `RecipientName`, `Type`, `Note`) VALUES (?, ?, ?, ?)";
            return DB::insert($sql, array($id, $name, $type, $note));
        }

        public function removePackage() {
            $id = $_POST['PackageID'];
            DB::connect();
            $sql = "DELETE FROM `packages` WHERE PackageID=?";
            return DB::delete($sql, array($id));
        }

        public function updatePackage() {
            $id = $_POST['PackageID'];
            $type = $_POST['Type'];
            $note = $_POST['Note'];
        
            DB::connect();
            $sql = "UPDATE `packages` SET `Type`=?, `Note`=? WHERE PackageID=?";
            return DB::update($sql, array($type, $note, $id));
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