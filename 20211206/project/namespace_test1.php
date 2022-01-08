<?php
    require_once './namespace1/sub1/MyClass1.php';
    require_once './namespace2/sub2/MyClass2.php';
    
    $c1 = new namespace1\sub1\MyClass();
    $c2 = new namespace2\sub2\MyClass();
    $c1 -> hi();
    $c2 -> hi();
?>