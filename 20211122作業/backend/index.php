<?php
    require_once './Router.php';

    if(isset($_GET['action']))
        $action = $_GET['action'];
    else
        $action = "no_action";

    $router = new Router();
    $router -> register('getUsers', 'Employee', 'getUsers');
    $router -> register('newUser', 'Employee', 'newUser');
    $router -> register('removeUser', 'Employee', 'removeUser');
    $router -> register('updateUser', 'Employee', 'updateUser');
    
    $router -> register('getProducts', 'Product', 'getProducts');
    $router -> register('newProduct', 'Product', 'newProduct');
    $router -> register('removeProduct', 'Product', 'removeProduct');
    $router -> register('updateProduct', 'Product', 'updateProduct');


    $router -> register('getRoles', 'Role', 'getRoles');
    $router -> register('newRole', 'Role', 'newRole');
    $router -> register('removeRole', 'Role', 'removeRole');
    $router -> register('updateRole', 'Role', 'updateRole');

    $router -> register('getSuppliers', 'Supplier', 'getSuppliers');
    $router -> register('newSupplier', 'Supplier', 'newSupplier');
    $router -> register('removeSupplier', 'Supplier', 'removeSupplier');
    $router -> register('updateSupplier', 'Supplier', 'updateSupplier');
    $response = $router -> run($action);

    echo json_encode($response);
?>