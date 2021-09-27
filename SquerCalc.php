<?php

function squer_calc($va, $vb, $vc) {
  if (doubleval($va) == 0) { errs_log($D, "ERROR_09", "Уравнение не является квадратным."); return "E2"; }
  if (!is_numeric($va) || !is_numeric($vb) || !is_numeric($vc)) {
    //errs_log($D, "ERROR_01", "Неверная  синтаксическая  конструкция  входного выражения.");
    return "Error 01 - Неверная  синтаксическая  конструкция  входного выражения;";
  }
  $D = doubleval($vb) * doubleval($vb) - 4 * doubleval($vc) * doubleval($va);
  if ($D < 0) return "E1";
  $x = (-1*doubleval($vb) + sqrt($D)) / 2 * doubleval($va);
  if ($D == 0) return "A" . strval($x);
  //if ($D == 0) return "E2";
  $x1 = (-1*doubleval($vb) - sqrt($D)) / 2 / doubleval($va);
  $x2 = (-1*doubleval($vb) + sqrt($D)) / 2 / doubleval($va);
  return "B" . strval($x1) . "&" . strval($x2);
}


/*function searchNumber($str){
  //return (substr($str, 0, strlen($str) - 1));
  $i = strlen($str) - 1;
  if ($str[$i] == "*") {
    do {
    $i --;
    } while (is_numeric($str[$i]));
    //return $str[$i+1];
    if ($str[$i] == "*" && $str[$i-1] == ")" && $i != 0) return -1 * doubleval((substr($str, $i+1, -1))) ;
    else return doubleval((substr($str, $i+1, -1)));
  }
  return 0;
}*/
?>
