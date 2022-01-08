<?php
    function myautoload($class_name) {
        $filename = str_replace('\\', '/', $class_name);
        $filename = __DIR__ . '/..//' . $filename . '.php';
        if (file_exists($filename)) {
            include $filename;
        }
    }
    spl_autoload_register('myautoload');
?>