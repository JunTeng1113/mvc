<?php
    $router -> register('getUnits', 'Unit', 'getUnits');
    $router -> register('newUnit', 'Unit', 'newUnit');
    $router -> register('removeUnit', 'Unit', 'removeUnit');
    $router -> register('updateUnit', 'Unit', 'updateUnit');

    $router -> register('getResidents', 'Resident', 'getResidents');
    $router -> register('newResident', 'Resident', 'newResident');
    $router -> register('removeResident', 'Resident', 'removeResident');
    $router -> register('updateResident', 'Resident', 'updateResident');
    
    $router -> register('getPackages', 'Package', 'getPackages');
    $router -> register('newPackage', 'Package', 'newPackage');
    $router -> register('removePackage', 'Package', 'removePackage');
    $router -> register('updatePackage', 'Package', 'updatePackage');
    $router -> register('confirmPackage', 'Package', 'confirmPackage');
    $router -> register('unconfirmPackage', 'Package', 'unconfirmPackage');

    $router -> register('rootUnit', 'RootUnit', 'rootUnit');
?>