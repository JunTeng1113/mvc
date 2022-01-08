<?php
    // require_once '../vendor/Router.php';
    // require_once '../vendor/DB.php';
    require_once __DIR__.'/../vendor/Autoload.php';
    
    use vendor\Router;
    use vendor\DB;
    class Main {
        static function run() {
            $conf = parse_ini_file(__DIR__.'/../vendor/.env');
            DB::$dbHost = $conf['dbHost'];
            DB::$dbName = $conf['dbName'];
            DB::$dbUser = $conf['dbUser'];
            DB::$dbPassword = $conf['dbPassword'];
        
            if(isset($_GET['action']))
                $action = $_GET['action'];
            else
                $action = "no_action";
        
            $router = new Router();
            require_once __DIR__.'/../routes/Web.php';
            $response = $router -> run($action);
        
            echo json_encode($response);
        }
    }
?>