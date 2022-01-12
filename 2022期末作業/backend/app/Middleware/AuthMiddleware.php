<?php
    namespace app\Middleware;
    require_once __DIR__ . "/../../vendor/Autoload.php";
    use \Exception;
    use vendor\JWT\JWT;
    use vendor\JWT\Key;
    use vendor\DB;
    use app\Models\User;
    class AuthMiddleware {
        public static function getUserID() {
            $headers = getallheaders();
            $jwt = $headers['Authorization'];
            $secret_key = "hello";
            $payload = JWT::decode($jwt, $secret_key, array("HS256"));
            $userID = $payload -> data -> UserID;
            return $userID;
        }
        public static function checkToken() {
            $headers = getallheaders();
            $jwt = $headers['Authorization'];
            $secret_key = "hello";
            try {
                $payload = JWT::decode($jwt, $secret_key, array("HS256"));
                
                $response['permission'] = true;
                if (isset($_POST['action'])) {
                    $userID = $payload -> data -> UserID;
                    $action = $_POST['action'];
                    
                    $res = User::hasPermission($userID, $action);
                    $result = $res['result'];
                    $response['action'] = $action;
                    $response['permission'] = count($result) > 0 ? true : false;
                }

                $jwt = self::genToken($payload -> data -> id, $payload -> data -> UserID);
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
            
            $response = User::doLogin($id, $password);
            $result = $response['result'];
            $userID = $result[0]['UserID'];

            $jwt = self::genToken($id, $userID);
            $response['token'] = $jwt;
            return $response;
        }
        public static function genToken($id, $userID) {
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
                    "id" => $id, 
                    "UserID" => $userID
                )
            );
            $jwt = JWT::encode($payload, $secret_key);
            return $jwt;
        }
    }
?>