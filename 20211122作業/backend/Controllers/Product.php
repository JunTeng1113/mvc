<?php
    require_once './DB.php';
    require_once './Controller.php'; //index.php的相對路徑
    class Product extends Controller {
        public function getProducts() {
            DB::connect();
            if (isset($_POST['id'])) {
                $id = $_POST['id'];
                $sql = "SELECT * FROM `Product` WHERE `ProdId`=?";
                $arg = array($id);

            } else {
                $sql = "SELECT * FROM `Product`";
                $arg = NULL;
            }
            return DB::select($sql, $arg);
        }

        public function newProduct() {
            $id = $_POST['ProdId'];
            $name = $_POST['ProdName'];
            $cost = $_POST['Cost'];
            $unitPrice = $_POST['UnitPrice'];
            $qty = $_POST['Qty'];
        
            DB::connect();
            $sql = "INSERT INTO `Product` (`ProdId`, `ProdName`, `Cost`, `UnitPrice`, `Qty`) VALUES (?, ?, ?, ?, ?)";
            return DB::insert($sql, array($id, $name, $cost, $unitPrice, $qty));
        }

        public function removeProduct() {
            $id = $_POST['ProdId'];
            DB::connect();
            $sql = "DELETE FROM `Product` WHERE ProdId=?";
            return DB::delete($sql, array($id));
        }

        public function updateProduct() {
            $id = $_POST['ProdId'];
            $name = $_POST['ProdName'];
            $cost = $_POST['Cost'];
            $unitPrice = $_POST['UnitPrice'];
            $qty = $_POST['Qty'];
        
            DB::connect();
            $sql = "UPDATE `Product` SET `ProdName`=?, `Cost`=?, `UnitPrice`=?, `Qty`=? WHERE ProdId=?";
            return DB::update($sql, array($name, $cost, $unitPrice, $qty, $id));
        }
    }
?>