<?php
    namespace app\Models;
    require_once __DIR__.'/../../vendor/Autoload.php';
    use vendor\DB;
    class Package {
        public function getRecords() {
            $sql = "SELECT * 
                    FROM `packages` LEFT JOIN `units` ON `packages`.`UnitID` = `units`.`UnitID`
                    WHERE `packages`.`ConfirmTime` IS NOT NULL
                    ORDER BY `packages`.`ConfirmTime` DESC";
            $arg = NULL;
            return DB::select($sql, $arg);
        }
        
        public function getUnitPackages($unitID, $status='all') {
            switch ($status) {
                case '0': // 查詢未領取的包裹
                    $sql = "SELECT * 
                            FROM packages
                            WHERE packages.UnitID LIKE '" . $unitID . "'
                            AND packages.ConfirmTime IS NULL
                            ORDER BY packages.ArriveTime DESC";
                    $arg = array($unitID);
                    break;
                
                case '1': // 查詢已領取的包裹
                    $sql = "SELECT * 
                            FROM packages
                            WHERE packages.UnitID LIKE '" . $unitID . "'
                            AND packages.ConfirmTime IS NOT NULL
                            ORDER BY packages.ArriveTime DESC";
                    $arg = array($unitID);
                    break;

                default: // 查詢所有的包裹
                    $sql = "SELECT * 
                            FROM packages
                            WHERE packages.UnitID LIKE '" . $unitID . "'
                            ORDER BY packages.ArriveTime DESC";
                    $arg = array($unitID);
                    break;
            }
            return DB::select($sql, $arg);
        }
        
        public function getAUTO_INCREMENT() {
            $sql = "SELECT AUTO_INCREMENT AS ai
                    FROM INFORMATION_SCHEMA.TABLES
                    WHERE TABLE_NAME = 'packages'
                    ORDER BY ai DESC
                    LIMIT 0, 1";
            $arg = NULL;
            
            return DB::select($sql, $arg);
        }
        
        public function newPackage($id, $name, $type, $note) {
            $sql = "INSERT INTO `packages` (`UnitID`, `RecipientName`, `Type`, `Note`) VALUES (?, ?, ?, ?)";
            $arg = array($id, $name, $type, $note);
            return DB::insert($sql, $arg);
        }

        public function removePackage($id) {
            $sql = "DELETE FROM `packages` WHERE PackageID=?";
            $arg = array($id);
            return DB::delete($sql, $arg);
        }

        public function updatePackage($id, $type, $note) {
            $sql = "UPDATE `packages` SET `Type`=?, `Note`=? WHERE PackageID=?";
            $arg = array($type, $note, $id);
            return DB::update($sql, $arg);
        }

        public function confirmPackage($id) {
            $sql = "UPDATE `packages` SET `ConfirmTime`=NOW() WHERE PackageID=?";
            $arg = array($id);
            return DB::update($sql, $arg);
        }
        
        public function unconfirmPackage($id) {
            $sql = "UPDATE `packages` SET `ConfirmTime`='' WHERE PackageID=?";
            $arg = array($id);
            return DB::update($sql, $arg);
        }
        
        //未完成
    }
?>
