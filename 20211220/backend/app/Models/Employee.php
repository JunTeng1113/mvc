<?php
    namespace app\Models;
    use vendor\DB;

    class Employee {
        public function getUsers() {
            $sql = "SELECT * FROM `user`";
            $arg = NULL;
            return DB::select($sql, $arg);
        }
    }
?>