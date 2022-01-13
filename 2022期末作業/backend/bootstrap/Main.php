<?php
    namespace bootstrap;
    require_once __DIR__."/../vendor/Autoload.php";
    use app\Middleware\AuthMiddleware;
    use vendor\DB;
    use vendor\Router;

    class Main {
        static function run() {
            //讀取.env 設定相關config
            $conf = parse_ini_file(__DIR__.'/../vendor/.env');
            DB::$dbHost = $conf['dbHost'];
            DB::$dbName = $conf['dbName'];
            DB::$dbUser = $conf['dbUser'];
            DB::$dbPassword = $conf['dbPassword'];

            //讀取action的值
            if (isset($_POST['action'])) {
                $action = $_POST['action'];
            } else {
                $action = "no_action";
            }

            if (isset($_POST['postman'])) {
                $router = new Router();
                require_once __DIR__."/../routes/web.php";
                $response = $router -> run($action);
                echo json_encode($response);
                return;
            }

            $router = new Router();
            require_once __DIR__."/../routes/web.php";
            $response = $responseToken = AuthMiddleware::checkToken();
            if ($responseToken['status'] == 200) {
                if ($action != "no_action") {
                    $response = $router -> run($action);
                    $response['token'] = $responseToken['token'];
                }
            } else {
                switch ($action) {
                    case 'doLogin':
                        $response = AuthMiddleware::doLogin();
                        break;
                    
                    case 'getResidentPhone':
                        $response = $router -> run($action);
                        break;

                    
                    case 'registerUser':
                        $response = $router -> run($action);
                        break;

                    
                    case 'addUserRole':
                        $response = $router -> run($action);
                        break;
                        
                    default:
                        # code...
                        break;
                }
            }
            echo json_encode($response);
            
        }
    }
?>



