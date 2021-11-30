<?php
    class Rectangle {
        var $width;
        var $height;

        function __construct($width, $height) {
            $this->width = $width;
            $this->height = $height;
        }

        function getArea() {
            return $this->width * $this->height;
        }

        function getWidth() {
            return $this->width;
        }

        function getHeight() {
            return $this->height;
        }
    }
?>