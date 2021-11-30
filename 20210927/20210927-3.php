<?php
    require_once './Rectangle.php';
    $w1 = $_POST['width1']; 
    $h1 = $_POST['height1']; 
    $w2 = $_POST['width2']; 
    $h2 = $_POST['height2']; 
    $rect1 = new Rectangle($w1, $h1);
    $rect2 = new Rectangle($w2, $h2);

    echo $rect1->getArea();
    echo $rect2->getArea();
?>