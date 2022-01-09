<?php
    namespace app\Middleware;
    require_once __DIR__ . "/../../vendor/Autoload.php";
    use \Exception;
    use vendor\JWT\JWT;
    use vendor\JWT\Key;
    use app\Controllers\Login;

    class AuthMiddleware {
        public static function checkToken() {
            $headers = getallheaders();
            $jwt = $headers['Authorization'];
            $secret_key = "hello";
            try {
                $payload = JWT::decode($jwt, $secret_key, array("HS256"));
                $jwt = self::genToken($payload -> data -> id);
                $response['status'] = 200;
                $response['message'] = "Access granted";
                $response['token'] = $jwt;
            } catch (Exception $e) {
                $response['status'] = 403;
                $response['message'] = $e -> getMessage();
            }
            return $response;
        }
        public static function doLogin() {
            $id = $_POST['id'];
            $password = $_POST['password'];
            //驗證登入
            
            $jwt = self::genToken($id);
            $response['status'] = 200;
            $response['message'] = "Access granted";
            $response['token'] = $jwt;
            return $response;
        }
        public static function genToken($id) {
            $secret_key = "hello";
            $issuer_claim = "http://localhost";
            $audience_claim = "http://localhost";
            $issuedat_claim = time(); //issued at
            $expire_claim = $issuedat_claim + 1800;
            $payload = array(
                "iss" => $issuer_claim,
                "aud" => $audience_claim,
                "iat" => $issuedat_claim,
                "exp" => $expire_claim, 
                "data" => array(
                    "id" => $id
                )
            );
            $jwt = JWT::encode($payload, $secret_key);
            return $jwt;
        }
    }
?>