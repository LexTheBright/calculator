<?php
include 'PHPUnit/Framework.php';
include '../MathCalc.php';
use PHPUnit\Framework\TestCase;

class operandTest extends PHPUnit_Framework_TestCase {
    public function testDiv()
    {
        $this->assertEquals(1, div(5,5));
    }
}