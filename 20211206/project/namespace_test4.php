<?php
    require_once './namespace1/sub1/MyClass1.php';
    require_once './namespace2/sub2/MyClass2.php';
    
    use namespace1\sub1 as ns1;
    use namespace2\sub2 as ns2;
    $c1 = new ns1\MyClass();
    $c2 = new ns2\MyClass();
    $c1 -> hi();
    $c2 -> hi();
?>