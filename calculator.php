<?php

include 'modTrue.php';
include 'MathCalc.php';
include 'SquerCalc.php';



if (isset($_POST["expression"]) && isset($_POST["result"])) {
  $expression = $_POST["expression"];
  $result = $_POST["result"];
  $placeholder = $_POST["placeholder"];
  //assert(var_dump($_POST));

  if ($result == "" && $placeholder != "" && is_numeric($placeholder)) $result = $placeholder;

  $calced = math_calc($expression, $result);
  //echo $expression; /////////////////////////////////////////////
  echo $calced;

  $errs = substr($calced, 0, 5);

  $opera = $expression[strlen($expression)-1];
  $first = substr($expression, 0, -1);
  $log = date('Y-m-d H:i:s') . " " .  titleOpera($opera) . " " . $first . " " .  $result . " " .  $calced;
  //if ($errs == "Error") $log .= $calced;
  //$log .= " gogo " . $errs;
  file_put_contents(__DIR__ . '/log.txt', $log . PHP_EOL, FILE_APPEND);
  //return $calsed;
}

if (isset($_POST["a_val"]) && isset($_POST["b_val"]) && isset($_POST["c_val"])) {
  $va = $_POST["a_val"];
  $vb = $_POST["b_val"];
  $vc = $_POST["c_val"];
  //assert(var_dump($_POST));

  if ($va == "") $va = 1;
  if ($vb == "") $vb = 1;
  if ($vc == "") $vc = 0;
  
  $data = squer_calc($va, $vb, $vc);
  //echo "A" . $va; /////////////////////////////////////////////////
  echo $data;

  $log = date('Y-m-d H:i:s') . " Вычисление корней уравнения " . $va . " " . $vb . " " . $vc . " | " ;

  if ($data == "E1") $log .= "Уравнение не имеет действительных решений.";
  if ($data == "E2") $log .= "Уравнение не является квадратным.";
  if ($data[0] == "A") {
    $A_data = substr($data, 1);
    $log .= $A_data;
  }
  if ($data[0] == "B") {
    $Pre_data = substr($data, 1);
    $B_data = explode("&", $Pre_data);
    $log .= $B_data[0] . " " . $B_data[1];
  }
  file_put_contents(__DIR__ . '/log.txt', $log . PHP_EOL, FILE_APPEND);
}

function titleOpera($sym){
  switch ($sym) {
    case '+':
      return "Плюс";
    case '-':
      return "Минус";
    case '*':
      return "Умножить";
    case '/':
      return "Разделить";
    case '%':
      return "Остаток от целочесиленного деления";
    default:
      return "Результат становится операндом";
  }
  return 0;
}

?>
