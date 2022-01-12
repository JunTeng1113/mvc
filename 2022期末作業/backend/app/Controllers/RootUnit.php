<?php
    namespace app\Controllers;
    require_once __DIR__.'/../../vendor/Autoload.php';
    use vendor\Controller;
    use vendor\DB;
    class RootUnit extends Controller {

        public function rootUnit() {
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