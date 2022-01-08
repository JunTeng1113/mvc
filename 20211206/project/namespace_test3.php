<?php
    require_once './namespace1/sub1/MyClass1.php';
    require_once './namespace2/sub2/MyClass2.php';
    
    use namespace1\sub1\MyClass as mc1;
    use namespace2\sub2\MyClass as mc2;
    $c1 = new mc1();
    $c2 = new mc2();
    $c1 -> hi();
    $c2 -> hi();
?>