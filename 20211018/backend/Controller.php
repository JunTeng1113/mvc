<?php
    require_once './Rectangle.php';
    class Controller {
        function getTwoArea() {
            $w1 = $_POST['w1'];
            $h1 = $_POST['h1'];
            $w2 = $_POST['w2'];
            $h2 = $_POST['h2'];

            $rect1 = new Rectangle($w1, $h1);
            $rect2 = new Rectangle($w2, $h2);
            $response1 = $rect1->getArea();
            $response2 = $rect2->getArea();
            $area[0] = $response1['result'];
            $area[1] = $response2['result'];
            $response['status'] = 200;
            $response['message'] = '成功';
            $response['result'] = $area;
            return $response;
        }
    }
?>