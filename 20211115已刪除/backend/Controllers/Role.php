<?php
    require_once './mysql.php';
    class Role
    {
        public function getRoles() {
            $response = openDB();
            if ($response['status'] == 200) {
                $conn = $response['result'];
                if (isset($_POST['RoleId'])) {
                    $id = $_POST['RoleId'];
                    $sql = "SELECT * FROM `role` WHERE `RoleId` = ?";
                    $stmt = $conn -> prepare($sql);
                    $result = $stmt -> execute(array($id));
                } else {
                    $sql = "SELECT * FROM `role`";
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

        public function newRole() {
            $name = $_POST['RoleName'];
        
            $response = openDB();
            if ($response['status'] == 200) {
                $conn = $response['result'];
                $sql = "INSERT INTO `role` (`RoleName`) VALUES (?)";
                $stmt = $conn -> prepare($sql);
                $result = $stmt -> execute(array($name));
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

        public function removeRole() {
            $id = $_POST['RoleId'];
        
            $response = openDB();
            if ($response['status'] = 200) {
                $conn = $response['result'];
                $sql = "DELETE FROM `role` WHERE RoleId=?";
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

        public function updateRole() {
            $id = $_POST['RoleId'];
            $name = $_POST['RoleName'];
        
            $response = openDB();
            if ($response['status'] = 200) {
                $conn = $response['result'];
                $sql = "UPDATE `role` SET `RoleName`=? WHERE RoleId=?";
                $stmt = $conn -> prepare($sql);
                $result = $stmt -> execute(array($name, $id));
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