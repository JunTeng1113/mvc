<?php
    namespace app\Models;
    require_once __DIR__.'/../../vendor/Autoload.php';
    use vendor\DB;
    class Announcement {
        public function getAnnouncements() {
            $sql = "SELECT * FROM announcements ORDER BY announcements.Top DESC, announcements.ReleaseTime DESC";
            $arg = NULL;
            return DB::select($sql, $arg);
        }
        
        public function getAnnouncement($AnnID) {
            $sql = "SELECT * FROM announcements WHERE announcements.AnnID = ?";
            $arg = array($AnnID);
            return DB::select($sql, $arg);
        }

        public function addAnnouncement($Type, $Title, $Content, $StartDate, $EndDate, $Top, $Publish) {
            $sql = "INSERT INTO announcements (Type, Title, Content, StartDate, EndDate, Top, Publish) 
                    VALUES (?, ?, ?, ?, ?, ?, ?)";
            $arg = array($Type, $Title, $Content, $StartDate, $EndDate, $Top, $Publish);
            return DB::insert($sql, $arg);
        }
        public function updateAnnouncement($AnnID, $Type, $Title, $Content, $StartDate, $EndDate, $Top, $Publish) {
            $sql = "UPDATE announcements 
                    SET Type=?, 
                    Title=?, 
                    Content=?, 
                    StartDate=?, 
                    EndDate=?, 
                    Top=?, 
                    Publish=? 
                    WHERE AnnID=?";
            $arg = array($Type, $Title, $Content, $StartDate, $EndDate, $Top, $Publish, $AnnID);
            return DB::update($sql, $arg);
        }

        public function removeAnnouncement($AnnID) {
            $sql = "DELETE FROM announcements WHERE announcements.AnnID = ?";
            $arg = array($AnnID);
            return DB::delete($sql, $arg);
        }
    }
?>
