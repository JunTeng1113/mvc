<?php
    require_once './DB.php';
    require_once './Controller.php'; //index.php的相對路徑
    class RootUnit extends Controller {

        public function rootUnit() {
            DB::connect();
            $area = ['A', 'B', 'D', 'E', 'F'];
            $list = ['1', '2', '3', '5'];
            $index = 0;
            foreach ($area as $key => $value) {
                for ($_floor = 2; $_floor <= 15; $_floor++) { 
                    foreach ($list as $key2 => $value2) {
                        $building = $value;
                        $floor = $_floor;
                        $room = $value2;
                        $id = $building . $room . '-' . $floor;
                        $sql = "INSERT INTO `units` (`Index_`, `UnitID`, `Building`, `Room`, `Floor`) VALUES (?, ?, ?, ?, ?)";
                        
                        DB::insert($sql, array($index, $id, $building, $room, $floor));
                        $index += 1;
                    }
                }
            }
            return 0;
        }
    }
?>