<?php
    require_once './DB.php';
    require_once './Controller.php'; //index.php的相對路徑
    class Supplier extends Controller {
        public function getSuppliers() {
            DB::connect();
            if (isset($_POST['SupplierId'])) {
                $id = $_POST['SupplierId'];
                $sql = "SELECT * FROM `Supplier` WHERE `SupplierId`=?";
                $arg = array($id);

            } else {
                $sql = "SELECT * FROM `Supplier`";
                $arg = NULL;
            }
            return DB::select($sql, $arg);
        }

        public function newSupplier() {
            $name = $_POST['SupplierName'];
            $contact = $_POST['Contact'];
            $phone = $_POST['Phone'];
            $address = $_POST['Address'];
        
            DB::connect();
            $sql = "INSERT INTO `Supplier` (`SupplierName`, `Contact`, `Phone`, `Address`) VALUES (?, ?, ?, ?)";
            return DB::insert($sql, array($name, $contact, $phone, $address));
        }

        public function removeSupplier() {
            $id = $_POST['SupplierId'];
            DB::connect();
            $sql = "DELETE FROM `Supplier` WHERE SupplierId=?";
            return DB::delete($sql, array($id));
        }

        public function updateSupplier() {
            $id = $_POST['SupplierId'];
            $name = $_POST['SupplierName'];
            $contact = $_POST['Contact'];
            $phone = $_POST['Phone'];
            $address = $_POST['Address'];
        
            DB::connect();
            $sql = "UPDATE `Supplier` SET `SupplierName`=?, `Contact`=?, `Phone`=?, `Address`=? WHERE SupplierId=?";
            return DB::update($sql, array($name, $contact, $phone, $address, $id));
        }
    }
?>