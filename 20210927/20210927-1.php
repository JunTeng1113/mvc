<?php
    require_once './Rectangle.php';
    $rect1 = new Rectangle(1, 1);
    $rect2 = new Rectangle(2, 3);
    $rect3 = new Rectangle(3, 5);

    echo $rect1->getArea();
    echo $rect2->getArea();
    echo $rect3->getArea();
?>