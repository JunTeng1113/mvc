<?php
    require_once './DB.php';
    require_once './Controller.php'; //index.php的相對路徑
    class RootUnit extends Controller {

        public function rootUnit() {
            DB::connect();
            $area = ['A', 'B', 'D', 'E', 'F'];
            $list = ['1', '2', '3', '5'];
            foreach ($area as $key => $value) {
                for ($_floor = 2; $_floor <= 15; $_floor++) { 
                    foreach ($list as $key2 => $value2) {
                        $id = $value . $value2 . '-' . $_floor;
                        $name = $value . '棟' . $_floor . '樓之' . $value2;
                        $sql = "INSERT INTO `units` (`UnitID`, `UnitName`) VALUES (?, ?)";
                        
                        DB::insert($sql, array($id, $name));
                    }
                }
            }
            return 0;
        }
    }
?>