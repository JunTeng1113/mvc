<?php
    class Rectangle {
        private $width;
        private $height;

        public function __construct($width, $height) {
            $this->width = $width;
            $this->height = $height;
        }

        public function getArea() {
            $response['status'] = 200;
            $response['message'] = '成功';
            $response['result'] = $this->width * $this->height;
            return $response;
        }

        public function getWidth() {
            return $this->width;
        }

        public function getHeight() {
            return $this->height;
        }

        public function getLength() {
            return $this->height * 2 + $this->width * 2;
        }
    }
?>