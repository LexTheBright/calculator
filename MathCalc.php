<?php

function errs_log($arg, $error, $text) {
    $log = date('Y-m-d H:i:s') . " " .  $arg . " | " . $error . " | " .  $text;
    file_put_contents(__DIR__ . '/log.txt', $log . PHP_EOL, FILE_APPEND);
}

function searchparam($b){
  $value = sprintf('%f', $b);
  if (!is_numeric($value[strlen($value)-1])) $value = substr($value, 0, -1);
  return check_value($value);
}

function div($a, $b) 
{
  $a_val = searchparam($a);
  $b_val = searchparam($b);
  if ($b_val == "" || $b_val == 0) { 
    //errs_log($b_val, "ERROR_06", "Error 06 – Ошибка деления на 0.");
    return "Error 06 – Ошибка деления на 0."; 
  }
  if ($a_val[0] == "E") return $a_val;
  if ($b_val[0] == "E") return $b_val;
  $reslt = doubleval($a_val) / doubleval($b_val);
  return check_value($reslt);  
}

function mult($a, $b) 
{
  $a_val = searchparam($a);
  $b_val = searchparam($b);

  if ($a_val[0] == "E") return $a_val;
  if ($b_val[0] == "E") return $b_val;

  $reslt = doubleval($a_val) * doubleval($b_val);
  return check_value($reslt);   
}

function sum($a, $b) 
{
  $a_val = searchparam($a);
  $b_val = searchparam($b);

  if ($a_val[0] == "E") return $a_val;
  if ($b_val[0] == "E") return $b_val;

  $reslt = doubleval($a_val) + doubleval($b_val);
  return check_value($reslt);  
}

function sub($a, $b) 
{
  $a_val = searchparam($a);
  $b_val = searchparam($b);

  if ($a_val[0] == "E") return $a_val;
  if ($b_val[0] == "E") return $b_val;

  $reslt = doubleval($a_val) - doubleval($b_val);
  return check_value($reslt);  
}

function mod($a, $b) 
{
  $a_val = searchparam($a);
  $b_val = searchparam($b);

  if ($a_val[0] == "E") return $a_val;
  if ($b_val[0] == "E") return $b_val;
  
  if ($b_val == "" || $b_val[0] == 0) { 
    //errs_log($b_val, "ERROR_06", "Error 06 – Ошибка деления на 0. Для целочисленного деления введите целое число");
    return "Error 06 – Ошибка деления на 0. Для целочисленного деления введите целое число";  
  }
  $reslt = $a_val % $b_val;
  return check_value($reslt);  
}

function math_calc($expression,  $result) {
  $x = strval($expression);
  $y = strval($result);
  $err = check_expr($expression, $result);
  if ($err[0] == "E") return $err;
  switch ($x[strlen($x)-1]) {
    case '+':
      return sum($expression, $result);
    case '-':
      return sub($expression, $result);
    case '*':
      return mult($expression, $result);
    case '/':
      return div($expression, $result);
    case '%':
      return mod($expression, $result);
    default:
      return $x;
  }
}
?>
