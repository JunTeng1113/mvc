<?php
    require_once './mysql.php';
    class Product
    {
        public function getProducts() {
            $response = openDB();
            if ($response['status'] == 200) {
                $conn = $response['result'];
                if (isset($_POST['ProdId'])) {
                    $id = $_POST['ProdId'];
                    $sql = "SELECT * FROM `Product` WHERE `ProdId` = ?";
                    $stmt = $conn -> prepare($sql);
                    $result = $stmt -> execute(array($id));
                } else {
                    $sql = "SELECT * FROM `Product`";
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

        public function newProduct() {
            $id = $_POST['ProdId'];
            $name = $_POST['ProdName'];
            $cost = $_POST['Cost'];
            $unitPrice = $_POST['UnitPrice'];
            $qty = $_POST['Qty'];
        
            $response = openDB();
            if ($response['status'] == 200) {
                $conn = $response['result'];
                $sql = "INSERT INTO `Product` (`ProdId`, `ProdName`, `Cost`, `UnitPrice`, `Qty`) VALUES (?, ?, ?, ?, ?)";
                $stmt = $conn -> prepare($sql);
                $result = $stmt -> execute(array($id, $name, $cost, $unitPrice, $qty));
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

        public function removeProduct() {
            $id = $_POST['ProdId'];
        
            $response = openDB();
            if ($response['status'] = 200) {
                $conn = $response['result'];
                $sql = "DELETE FROM `Product` WHERE ProdId=?";
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

        public function updateProduct() {
            $id = $_POST['ProdId'];
            $name = $_POST['ProdName'];
            $cost = $_POST['Cost'];
            $unitPrice = $_POST['UnitPrice'];
            $qty = $_POST['Qty'];
        
            $response = openDB();
            if ($response['status'] = 200) {
                $conn = $response['result'];
                $sql = "UPDATE `Product` SET `ProdName`=?, `Cost`=?, `UnitPrice`=?, `Qty`=? WHERE ProdId=?";
                $stmt = $conn -> prepare($sql);
                $result = $stmt -> execute(array($name, $cost, $unitPrice, $qty, $id));
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