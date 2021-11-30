<?php
    if (isset($_POST['w'])) {
        $w = floatval($_POST['w']); 
        $h = floatval($_POST['h']); 
        require_once './Rectangle.php';
        $rect = new Rectangle($w, $h);
        $response['rectHeight'] = $rect->getHeight();
        $response['rectWidth'] = $rect->getWidth();
        $response['rectArea'] = $rect->getArea();
        $response['rectLength'] = $rect->getLength();
    }
    if (isset($_POST['r'])) {
        $r = floatval($_POST['r']); 
        $m = floatval($_POST['m']); 
        require_once './Round.php';
        $round = new Round($r, $m);
        $response['roundRadius'] = $round->getRadius();
        $response['roundM'] = $round->getM();
        $response['roundArea'] = $round->getArea();
        $response['roundCircumference'] = $round->getCircumference();
    }
    echo json_encode($response);
?>