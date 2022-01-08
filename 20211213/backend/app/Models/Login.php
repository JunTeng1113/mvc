<?php
    namespace app\Models;
    use vendor\DB;
    class Login {
        public function login($id, $password) {
            $sql = "SELECT * FROM user WHERE user.id = ? AND user.password = ?";
            $arg = array($id, $password);
            return DB::select($sql, $arg);
        }
    }
?>