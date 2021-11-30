<?php
    if (isset($_GET['action'])) {
        $action = $_GET['action'];
    } else {
        $action = '_no_action';
    }
    require_once './Router.php';
    $router = new Router();
    $router->register('TwoRectArea', 'Controller', 'getTwoArea');
    $response = $router->run($action);
    echo json_encode($response);
?>