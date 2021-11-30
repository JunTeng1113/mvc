<?php
    class Round {
        private $radius;
        private $m;

        public function __construct($radius, $m) {
            $this->radius = $radius;
            $this->m = $m;
        }

        public function getArea() {
            return $this->radius * $this->radius * 3.14 * $this->m * $this->m;
        }

        public function getM() {
            return $this->m;
        }

        public function getRadius() {
            return $this->radius;
        }

        public function getCircumference() {
            return $this->radius * 2 * 3.14;
        }
    }
?>