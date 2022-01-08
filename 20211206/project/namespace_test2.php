<?php
    require_once './namespace1/sub1/MyClass1.php';
    require_once './namespace2/sub2/MyClass2.php';
    
    use namespace1\sub1\MyClass;
    //use namespace2\sub2\MyClass; 不可重複
    $c1 = new MyClass();
    $c2 = new MyClass();
    $c1 -> hi();
    $c2 -> hi();
?>