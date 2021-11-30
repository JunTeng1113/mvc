<?php
    require_once './mysql.php';
    class Supplier
    {
        public function getSuppliers() {
            $response = openDB();
            if ($response['status'] == 200) {
                $conn = $response['result'];
                if (isset($_POST['SupplierId'])) {
                    $id = $_POST['SupplierId'];
                    $sql = "SELECT * FROM `Supplier` WHERE `SupplierId` = ?";
                    $stmt = $conn -> prepare($sql);
                    $result = $stmt -> execute(array($id));
                } else {
                    $sql = "SELECT * FROM `Supplier`";
                    $stmt = $conn -> prepare($sql);
                    $result = $stmt -> execute();
                }
                if ($result) {
                    $rows = $stmt -> fetchAll(PDO::FETCH_ASSOC);
                    $response['status'] = 200;
                    $response['message'] = '查詢成功';
                    $response['result'] = $rows;
                } else {
                    $response['status'] = 400;
                    $response['message'] = 'SQL錯誤';
                }
            }
            return ($response);
        }

        public function newSupplier() {
            $id = $_POST['SupplierId'];
            $name = $_POST['SupplierName'];
            $contact = $_POST['Contact'];
            $phone = $_POST['Phone'];
            $address = $_POST['Address'];
        
            $response = openDB();
            if ($response['status'] == 200) {
                $conn = $response['result'];
                $sql = "INSERT INTO `Supplier` (`SupplierName`, `Contact`, `Phone`, `Address`) VALUES (?, ?, ?, ?)";
                $stmt = $conn -> prepare($sql);
                $result = $stmt -> execute(array($name, $contact, $phone, $address));
                if ($result) {
                    $count = $stmt -> rowCount();
                    if ($count < 1) {
                        $response['status'] = 204;
                        $response['message'] = '新增失敗';
                    
                    } else {
                        $response['status'] = 200;
                        $response['message'] = '新增成功';
                    }
                    
                } else {
                    $response['status'] = 400;
                    $response['message'] = 'SQL錯誤';
                }
            }
            return ($response);
        }

        public function removeSupplier() {
            $id = $_POST['SupplierId'];
        
            $response = openDB();
            if ($response['status'] = 200) {
                $conn = $response['result'];
                $sql = "DELETE FROM `Supplier` WHERE SupplierId=?";
                $stmt = $conn -> prepare($sql);
                $result = $stmt -> execute(array($id));
                if ($result) {
                    $count = $stmt -> rowCount();
                    if ($count < 1) {
                        $response['status'] = 204;
                        $response['message'] = '刪除失敗';
                    
                    } else {
                        $response['status'] = 200;
                        $response['message'] = '刪除成功';
                    }
                    
                } else {
                    $response['status'] = 400;
                    $response['message'] = 'SQL錯誤';
                }
            }
            return ($response);
        }

        public function updateSupplier() {
            $id = $_POST['SupplierId'];
            $name = $_POST['SupplierName'];
            $contact = $_POST['Contact'];
            $phone = $_POST['Phone'];
            $address = $_POST['Address'];
        
            $response = openDB();
            if ($response['status'] = 200) {
                $conn = $response['result'];
                $sql = "UPDATE `Supplier` SET `SupplierName`=?, `Contact`=?, `Phone`=?, `Address`=? WHERE SupplierId=?";
                $stmt = $conn -> prepare($sql);
                $result = $stmt -> execute(array($name, $contact, $phone, $address, $id));
                if ($result) {
                    $count = $stmt -> rowCount();
                    if ($count < 1) {
                        $response['status'] = 204;
                        $response['message'] = '更新失敗';
        
                    } else {
                        $response['status'] = 200;
                        $response['message'] = '更新成功';
                    }
                    
                } else {
                    $response['status'] = 400;
                    $response['message'] = 'SQL錯誤';
                }
            }
            return ($response);
        }
    }
?>