<?php
    namespace app\Controllers;
    require_once __DIR__.'/../../vendor/Autoload.php';
    use vendor\Controller;
    use vendor\DB;
    use app\Models\Resident as ResidentModel;
    use app\Middleware\AuthMiddleware;
    class Resident extends Controller {

        private $rm;
        public function __construct() {
            $this -> rm = new ResidentModel();
        }

        public function getResidents() {
            $unitID = $_POST['UnitID'];
            $status = isset($_POST['status']) ?  $_POST['status'] : 'all';
            return $this -> rm -> getResidents($unitID, $status);
        }

        public function getResident() {
            $id = $_POST['UnitID'];
            $name = $_POST['ResName'];
            return $this -> rm -> getResident($id, $name);
        }

        public function newResident() {
            $name = $_POST['ResName'];
            $phone = $_POST['Phone'];
            $id = $_POST['UnitID'];
            return $this -> rm -> newResident($name, $phone, $id);
        }

        public function removeResident() {
            $id = $_POST['UnitID'];
            $name = $_POST['ResName'];
            return $this -> rm -> removeResident($id, $name);
        }

        //給戶別及姓名，修改手機號碼
        public function updateResident() {
            $id = $_POST['UnitID'];
            $name = $_POST['ResName'];
            $phone = $_POST['Phone'];
            return $this -> rm -> updateResident($id, $name, $phone);
        }
    }
?>