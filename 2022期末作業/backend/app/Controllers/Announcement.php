<?php
    namespace app\Controllers;
    require_once __DIR__.'/../../vendor/Autoload.php';
    use vendor\Controller;
    use vendor\DB;
    use app\Models\Announcement as AnnouncementModel;
    use app\Middleware\AuthMiddleware;
    class Announcement extends Controller {

        private $am;
        public function __construct() {
            $this -> am = new AnnouncementModel();
        }

        public function getAnnouncements() {
            $response = AuthMiddleware::checkToken();
            if ($response['permission'] == true) {
                return $this -> am -> getAnnouncements();
            } else {
                $response['status'] = 403;
                $response['message'] = 'Access denied';
                return $response;
            }
        }
        public function getAnnouncement() {
            $response = AuthMiddleware::checkToken();
            if ($response['permission'] == true) {
                $id = $_POST['AnnID'];
                return $this -> am -> getAnnouncement($id);
            } else {
                $response['status'] = 403;
                $response['message'] = 'Access denied';
                return $response;
            }
        }
        public function addAnnouncement() {
            $response = AuthMiddleware::checkToken();
            if ($response['permission'] == true) {
                $Type = $_POST['type'];
                $Title = $_POST['title'];
                $Content = $_POST['content'];
                $StartDate = $_POST['startDate'];
                $EndDate = $_POST['endDate'];
                $Top = $_POST['top'];
                $Publish = $_POST['publish'];
                return $this -> am -> addAnnouncement($Type, $Title, $Content, $StartDate, $EndDate, $Top, $Publish);
            } else {
                $response['status'] = 403;
                $response['message'] = 'Access denied';
                return $response;
            }
        }
        public function updateAnnouncement() {
            $response = AuthMiddleware::checkToken();
            if ($response['permission'] == true) {
                $id = $_POST['AnnID'];
                $AnnID = $_POST['annID'];
                $Type = $_POST['type'];
                $Title = $_POST['title'];
                $Content = $_POST['content'];
                $StartDate = $_POST['startDate'];
                $EndDate = $_POST['endDate'];
                $Top = $_POST['top'];
                $Publish = $_POST['publish'];
                return $this -> am -> updateAnnouncement($AnnID, $Type, $Title, $Content, $StartDate, $EndDate, $Top, $Publish);
            } else {
                $response['status'] = 403;
                $response['message'] = 'Access denied';
                return $response;
            }
        }

        public function removeAnnouncement() {
            $response = AuthMiddleware::checkToken();
            if ($response['permission'] == true) {
                $AnnID = $_POST['AnnID'];
                return $this -> am -> removeAnnouncement($AnnID);
            } else {
                $response['status'] = 403;
                $response['message'] = 'Access denied';
                return $response;
            }
        }
    }
?>
