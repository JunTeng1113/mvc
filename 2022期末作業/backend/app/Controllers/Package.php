<?php
    namespace app\Controllers;
    require_once __DIR__.'/../../vendor/Autoload.php';
    use vendor\Controller;
    use vendor\DB;
    use app\Models\Package as PackageModel;
    use app\Middleware\AuthMiddleware;
    class Package extends Controller {

        private $pm;
        public function __construct() {
            $this -> pm = new PackageModel();
        }
        public function getRecords() {
            $response = AuthMiddleware::checkToken();
            if ($response['permission'] == true) {
                return $this -> pm -> getRecords();
            } else {
                $response['status'] = 403;
                $response['message'] = 'Access denied';
                return $response;
            }
        }
        public function getpackages() {
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
        public function getUnitPackages() {
            $response = AuthMiddleware::checkToken();
            if ($response['permission'] == true) {
                $unitID = $_POST['UnitID'];
                $status = isset($_POST['status']) ?  $_POST['status'] : 'all';
                return $this -> pm -> getUnitPackages($unitID, $status);
            } else {
                $response['status'] = 403;
                $response['message'] = 'Access denied';
                return $response;
            }
        }

        public function getAUTO_INCREMENT() {
            return $this -> pm -> getAUTO_INCREMENT();
        }

        public function newPackage() {
            $id = $_POST['UnitID'];
            $name = $_POST['RecipientName'];
            $type = $_POST['Type'];
            $note = $_POST['Note'];
            return $this -> pm -> newPackage($id, $name, $type, $note);
        }

        public function removePackage() {
            $id = $_POST['PackageID'];
            return $this -> pm -> removePackage($id);
        }

        public function updatePackage() {
            $id = $_POST['PackageID'];
            $type = $_POST['Type'];
            $note = $_POST['Note'];
            return $this -> pm -> updatePackage($id, $type, $note);
        }

        public function confirmPackage() {
            $id = $_POST['PackageID'];
            return $this -> pm -> confirmPackage($id);
        }
        
        public function unconfirmPackage() {
            $id = $_POST['PackageID'];
            return $this -> pm -> unconfirmPackage($id);
        }
    }
?>