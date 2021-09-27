<?php

function check_value($value)
{
  if ($value < -2147483648 || $value > 2147483647) { 
    //errs_log($value, "ERROR_03", "Error 03 — Слишком малое или слишком большое значение числа для int.");
    return "Error 03 — Слишком малое или слишком большое значение числа для int."; 
  }
  return $value;
}

function check_expr($x, $y)
{
  if (strlen($x) + strlen($y) > 65536) {
      errs_log(strlen($x) + strlen($y), "ERROR_04", "Error 04 — Слишком длинное выражение. Максмальная длина — 65536 символов.");
      return "Error 04 — Слишком длинное выражение. Максмальная длина — 65536 символов. ";
  }
  return 0;
}

?>
