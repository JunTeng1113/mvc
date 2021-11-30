<?php
    class Rectangle {
        private $width;
        private $height;

        public function __construct($width, $height) {
            $this->width = $width;
            $this->height = $height;
        }

        public function getArea() {
            return $this->width * $this->height;
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