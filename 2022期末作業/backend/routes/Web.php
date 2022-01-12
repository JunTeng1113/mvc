<?php

    $router -> register('getAnnouncements', 'Announcement', 'getAnnouncements');
    $router -> register('getAnnouncement', 'Announcement', 'getAnnouncement');
    $router -> register('addAnnouncement', 'Announcement', 'addAnnouncement');
    $router -> register('removeAnnouncement', 'Announcement', 'removeAnnouncement');
    $router -> register('updateAnnouncement', 'Announcement', 'updateAnnouncement');

    $router -> register('getUnits', 'Unit', 'getUnits');
    $router -> register('getBuildings', 'Unit', 'getBuildings');
    $router -> register('getFloor', 'Unit', 'getFloor');
    $router -> register('newUnit', 'Unit', 'newUnit');
    $router -> register('removeUnit', 'Unit', 'removeUnit');
    $router -> register('updateUnit', 'Unit', 'updateUnit');

    $router -> register('getResidents', 'Resident', 'getResidents');
    $router -> register('getResident', 'Resident', 'getResident');
    $router -> register('newResident', 'Resident', 'newResident');
    $router -> register('removeResident', 'Resident', 'removeResident');
    $router -> register('updateResident', 'Resident', 'updateResident');
    
    $router -> register('getRecords', 'Package', 'getRecords');
    $router -> register('getPackages', 'Package', 'getPackages');
    $router -> register('getUnitPackages', 'Package', 'getUnitPackages');
    $router -> register('getAUTO_INCREMENT', 'Package', 'getAUTO_INCREMENT');
    $router -> register('newPackage', 'Package', 'newPackage');
    $router -> register('removePackage', 'Package', 'removePackage');
    $router -> register('updatePackage', 'Package', 'updatePackage');
    $router -> register('confirmPackage', 'Package', 'confirmPackage');
    $router -> register('unconfirmPackage', 'Package', 'unconfirmPackage');
    
    $router -> register('rootUnit', 'RootUnit', 'rootUnit');
    $router -> register('hasPermission', 'User', 'hasPermission');
    $router -> register('getUserInfo', 'User', 'getUserInfo');
?>