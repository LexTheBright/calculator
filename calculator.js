/*$(document).one("keypress", function (e) {
    e.preventDefault();
});*/

$(document).ready(function() {
  $(document).on('keypress', function(event){
          //$(this).keypress(function(e)
          //{
              //e.preventDefault();
              let rise = event.target.id;
              var key = event.charCode || event.keyCode || 0;
              //console.log(key);            
              // allow backspace, tab, delete, enter, arrows, numbers and keypad numbers ONLY
              // home, end, period, and numpad decimal
              return (
                //backspace
                  key == 8 || 
                //TAB
                  key == 9 ||
                //enter
                // key == 13 ||
                //comma
                  searchComma(rise, key) == 46 ||
                //minus
                  searchComma(rise, key) == 45 ||
                //point
                //  searchComma(event.target.id, key) == 46 ||
                //
                  key == 190 ||
                //  (key >= 35 && key <= 40) ||
                  (key >= 48 && key <= 57));
                //  (key >= 96 && key <= 105));
          //});
  });
});


$(document).ready(function() {
    $(document).keyup(function(event) {
        if (event.which === 13) {
            event.preventDefault();
            $('#calculate').click();
        }
    });
    $(document).bind("paste",function(e) {
      e.preventDefault();
    });
    $(document).bind("drop",function(e) {
      e.preventDefault();
    });
});

function searchComma(id, key){
  let some1 = $('#aa').val();
  let some2 = $('#bb').val();
  let some3 = $('#cc').val();
  if (key == 46) {
    if (id == "aa" && some1 != "" && some1[some1.length-1] != "-") {
      for (let i = 0; i < some1.length; i++) {
        if (some1[i] == ".") return false;
      }
      return key;
    }
    if (id == "bb" && some2 != "" && some2[some2.length-1] != "-") {
      for (let i = 0; i < some2.length; i++) {
        if (some2[i] == ".") return false;
      } 
      return key;
    }
    if (id == "cc" && some3 != "" && some3[some3.length-1] != "-") {
      for (let i = 0; i < some3.length; i++) {
        if (some3[i] == ".") return false;
      }
      return key;
    }
  }
  if (key == 45) {
    if (id == "aa") {
      if (some1[0] == "-" || some1 != "") return false;
      return key;
    }
    if (id == "bb") {
      if (some2[0] == "-" || some2 != "") return false;
      return key;
    }
    if (id == "cc") {
      if (some3[0] == "-" || some3 != "") return false;
      return key;
    }
  }
}


/*$(document).ready(function(){
  $( '.dot' ).one( "click", function(e) {
    alert( "This will be displayed only once." );
  });
});*/

var flag = 0; // Какое по счету действие? 0 - действие не выбрано 1 - выбрана операция 2 - введен второй атрибут
var flag_eq = 0; // Какой по счету проблел подряд? 0 - первый, 1 - не первый 
var flag_rev = 0; // Какой по счету реверс? 0 - нечетный, 1 - четный
var temp_out = ""; //буфер для запоминания последнего действия для обработки равно
var out_v2; //на всякий случай для реверса
var isComa = 0; // есть ли в встроке точка? 0 - нету, 1 - есть

$(document).ready(function(){
  $('#calculator').submit(function (e) {
    if (flag == 0) return false;
    if (flag == 1) flag = 2;
    flag_rev = 0;
    e.preventDefault();

    var out_v = document.getElementById("output").getAttribute("value");
    var out_p = document.getElementById("output").getAttribute("placeholder");
    var in_v = document.getElementById("input").getAttribute("value");

    //если последний символ точка, то удалить его
    if (out_v != null && out_v[out_v.length - 1] == ".") {
      document.getElementById("output").setAttribute("value", document.getElementById("output").getAttribute("value").substring(0, document.getElementById("output").getAttribute("value").length - 1));  
      out_v = document.getElementById("output").getAttribute("value");
      //if (out_v[out_v.length-3] == "E") out_v = parseFloat(out_v).toFixed(20).replace(/\.?0+$/,'');
    }
    //if (!(out_v % 1 === 0)) out_v = parseFloat(out_v).toFixed(20).replace(/\.?0+$/,'');
    try {if (out_v[out_v.length-3] == "E" || out_v[out_v.length-4] == "E") out_v = parseFloat(out_v).toFixed(20).replace(/\.?0+$/,'');} catch {}
    //if (out_v[out_v.length-1])
    //console.log(in_v);100100099991
    //console.log(out_p);

    let j = 0;
    var temp_in = in_v;
    var old_in = "";
    //какой индекс имеет первый справа знак +-/*?
    for (let i = in_v.length - 1; i > 0; i--) { if (in_v[i] == "+" || in_v[i] == "-" || in_v[i] == "/" || in_v[i] == "*" || in_v[i] == "%") j=i; }
    //редактируем данные во входной строке, если в ней "="  
    //if (in_v[in_v.length - 1] == "=") {   
    if (flag_eq == 1) {
      //в верхнюю строчку записываем значение нижней + первый знак
      //temp_in = parseFloat(out_v).toFixed(20).replace(/\.?0+$/,'') + in_v.substr(j, 1);     
      temp_in = out_v + in_v.substr(j, 1); 
      document.getElementById("input").setAttribute("value", temp_in);
      //в нижнюю строчку записываем прошлое значение нижней 
      if (temp_out[temp_out.length-3] == "E" || temp_out[temp_out.length-4] == "E") temp_out = parseFloat(temp_out).toFixed(20).replace(/\.?0+$/,'');
      document.getElementById("output").setAttribute("value", temp_out);
      //запомним изначальное значение верхней строчки до знака
      old_in = in_v.substr(j);

      /*console.log("in_v " + in_v);  
      console.log("j " + j);  
      console.log("old_in " + old_in);  
      console.log("temp_in " + temp_in);    
      console.log("temp_out " + temp_out);  */
      j = 0;
    }

    /*console.log(document.getElementById("input").getAttribute("value"));
    console.log(document.getElementById("output").getAttribute("value"));
    console.log(document.getElementById("output").getAttribute("placeholder"));*/
    let form_data = $('#calculator').serialize() + "&placeholder=" + document.getElementById("output").getAttribute("placeholder");
    //alert(form_data);

    //console.log("in: " + form_data);
    $.ajax({
      type: "POST",
      url: "calculator.php",
      data: form_data,
      success: function (data) {
        //$('#outputline').html(data + " flag - " + flag + " flag_eq - " + flag_eq + " flag_rev - " + flag_rev);
        //console.log("out: " + data);

        //if (data[0] != "E") data = parseFloat(data).toFixed(20).replace(/\.?0+$/,'');

        document.getElementById("output").setAttribute("value", data);
        //есть ли что считать?
        if (flag == 2) {
          //было ли уже "=" ? Нет - будет, Да - заменим нужные элементы
          if (flag_eq == 0) {
            //если был передан плейсхолдер, то поместить его в значение
            if (out_v == null) out_v = out_p;
            document.getElementById("input").setAttribute("value", in_v + out_v + "=");
            temp_out = out_v;
            flag_eq = 1;
          } 
          else document.getElementById("input").setAttribute("value", out_v + old_in);
        }
        $('#outputline').html(data + " flag - " + flag + " flag_eq - " + flag_eq + " flag_rev - " + flag_rev);
      }
    });
  });
});

$(document).on('click','#calculator', function (event){
  if (event.target.id == "calculator") return false;
  let exp = document.getElementById("input");
  let exp2 = document.getElementById("output");
  let id = event.target.id;
  let text = exp.getAttribute("value");
  let text2 = exp2.getAttribute("value");

  if (text2 != null && text2[0] == "E") {
      exp.removeAttribute("value");
      exp2.removeAttribute("value");
      exp2.setAttribute("placeholder", "0");
      flag = 0;
      flag_eq = 0;
      flag_rev = 0;
      isComa = 0;
  }

  switch (id) {
    case "1": case "2": case "3": case "4": case "5":
    case "6": case "7": case "8": case "9": case "0":
      //id++; //////////////////////////////////
      //if (id == "." && exp.getAttribute("value") == null) { exp.setAttribute("value", "0" + id); exp2.setAttribute("value", "0" + id); }

      if (!exp.hasAttribute("value") || text[text.length-1] == '=') 
        { 
          exp.setAttribute("value", id); 
          exp2.setAttribute("value", id); 
          flag = 0;
          flag_eq = 0;
          break;
        }

      if (flag == 1) flag = 2;   
      flag_rev = 0;

      if (!exp2.hasAttribute("value")) {exp2.setAttribute("value", id); break;}
      exp2.setAttribute("value", exp2.getAttribute("value")+id); 

      if (text[text.length-1] == '-' ||
          text[text.length-1] == '+' || 
          text[text.length-1] == '*' ||
          text[text.length-1] == '%' ||
          text[text.length-1] == '/')  break;


      exp.setAttribute("value", exp.getAttribute("value")+id); 
      break;

    case "-": case "+": case "*": case "/" : case "%" :
      //$('#outputline').html(data + " flag - " + flag + " flag_eq - " + flag_eq + " flag_rev - " + flag_rev);
      if (exp.hasAttribute("value") && text[text.length-1] == '=') {
        exp.setAttribute("value", exp2.getAttribute("value"));  
        flag_eq = 0;
      }

      if (text != null && text[text.length - 1] == ".") {
        exp.setAttribute("value", exp.getAttribute("value").substring(0, text.length - 1));   
      }

      //alert(form_data);
      if (flag == 2) {
        var form_data = $('#calculator').serialize() + "&placeholder=" + document.getElementById("output").getAttribute("placeholder");
        console.log(document.getElementById("input").getAttribute("value"));
        console.log(document.getElementById("output").getAttribute("value"));
        $.ajax({
            type: "POST",
            url: "calculator.php",
            data: form_data,
            success: function (data) {
              //$('#outputline').html(data + " flag - " + flag + " flag_eq - " + flag_eq + " flag_rev - " + flag_rev);
              if (data[0] != "E" && (data[data.length-3] == "E" || data[data.length-4] == "E")) data = parseFloat(data).toFixed(20).replace(/\.?0+$/,'');
              //console.log("out: " + data);
              //if (text[text.length-1] == '=') 
              exp2.removeAttribute("value");
              document.getElementById("output").setAttribute("placeholder", data);
              document.getElementById("input").setAttribute("value", data + id);
              flag = 1;
              isComa = 0;

              $('#outputline').html(data + " flag - " + flag + " flag_eq - " + flag_eq + " flag_rev - " + flag_rev);
            }
        });
        break;
      }

      flag = 1;
      flag_rev = 0;
      isComa = 0;
      

      exp2.removeAttribute("value");
      if (!exp.hasAttribute("value") || exp.getAttribute("value") == "") { exp.setAttribute("value", exp2.getAttribute("placeholder") + id); break; }
      //if (exp2.hasAttribute("value") || exp2.getAttribute("value") == "") { exp.setAttribute("value", exp2.getAttribute("placeholder") + id); break; }
      text = exp.getAttribute("value");
      if (text[text.length-1] == '-' || 
         text[text.length-1] == '+' || 
         text[text.length-1] == '*' ||
         text[text.length-1] == '%' ||
         text[text.length-1] == '/')
        { 
          exp.setAttribute("value", exp.getAttribute("value").substring(0, exp.getAttribute("value").length - 1));
        }

      exp.setAttribute("value", exp.getAttribute("value")+id);
      exp2.setAttribute("placeholder", exp.getAttribute("value").substring(0, exp.getAttribute("value").length - 1));
      break;
    //удаляет последний символ результата +
    case "dltnum":
      //ничего не делаем, если сверху нет значения 
      if (!exp.hasAttribute("value") || exp.getAttribute("value") == "") break;
      //если последний символ сверху =, то делаем тоже что и в dltentry
      if (flag_eq == 1) {
        exp2.setAttribute("placeholder", exp2.getAttribute("value"));
        exp.removeAttribute("value");
        exp2.removeAttribute("value");
        flag_eq = 0;
        flag = 0;
        flag_rev = 0;
        isComa = 0;
        break;
      }

      if (text2[text2.length-1] == ".") {
        isComa = 0;
      }
      //удаляем предыдущий символ
      exp2.setAttribute("value", exp2.getAttribute("value").substring(0, exp2.getAttribute("value").length - 1));
      if (flag == 0) { exp.setAttribute("value", exp.getAttribute("value").substring(0, exp.getAttribute("value").length - 1));}
      // если удаляемый символ был последним, то флаг к выбору операции 
      if (exp2.getAttribute("value") == "") {
        exp2.setAttribute("placeholder", 0);
        if (flag == 2) flag = 1;
        isComa = 0;
      }
      break;
    //удаляет поле результата +
    case "dltdigit":
      exp2.removeAttribute("value");
      if ((flag == 0) || text[text.length-1] == '=') {exp.removeAttribute("value"); exp2.setAttribute("placeholder", 0); flag_eq = 0;}
      if (flag == 2) flag = 1;
      flag_rev = 0;
      isComa = 0;
      break;
    //Чистит оба поля +
    case "dltentry":
      if (!exp.hasAttribute("value") || exp.getAttribute("value") == "") break;
      exp.removeAttribute("value");
      exp2.removeAttribute("value");
      exp2.setAttribute("placeholder", "0");
      flag = 0;
      flag_eq = 0;
      flag_rev = 0;
      isComa = 0;
      break;
    case "reverse":
      //чтобы не выполнять лишние действия
      /*if(exp2.getAttribute("value") == null && exp2.getAttribute("placeholder") == 0) break;
      //запомним выражение 
      var in_v = document.getElementById("input").getAttribute("value");
      //изменим выражение на делимое для реверса
      exp.setAttribute("value", "1/");
      //
      var form_data = $('#calculator').serialize() + "&placeholder=" + document.getElementById("output").getAttribute("placeholder");
      $.ajax({
          type: "POST",
          url: "calculator.php",
          data: form_data,
          success: function (data) {
            $('#outputline').html(data);
            //присвоим результат туды-сюды
            document.getElementById("input").setAttribute("value", data);
            document.getElementById("output").setAttribute("value", data);
            if (flag != 0) {
              //вспомним прошлое, если надо 
              document.getElementById("input").setAttribute("value", in_v);
              flag = 2;
            }
            //не обязательно, но аутентично
            if (flag_eq == 1) document.getElementById("input").setAttribute("value", data);
          }
      })
      //let $rev = 1 / exp2.getAttribute("value");
      //exp.setAttribute("value", exp.getAttribute("value") + $rev);
      break;*/
    case "powerTwo":
      //чтобы не выполнять лишние действия
      if(exp2.getAttribute("value") == null && exp2.getAttribute("placeholder") == 0) break;
      //запомним выражение 
      var in_v2 = document.getElementById("input").getAttribute("value");
      //изменим выражение на умножение
      if (id == "powerTwo") {
        exp.setAttribute("value", exp2.getAttribute("value") + "*");
        if (exp2.getAttribute("value") == null) exp.setAttribute("value", exp2.getAttribute("placeholder") + "*");
        flag_rev = 0;
      } else {
        exp.setAttribute("value", "1/");

        //Какой реверс по счету
        if (flag_rev == 1) {
          flag_rev = 0;
          //out_v = document.getElementById("output").getAttribute("value");
        } else {
          flag_rev = 1;
          out_v = document.getElementById("output").getAttribute("value");
          if (exp2.getAttribute("value") == null) out_v = exp2.getAttribute("placeholder");
        }
      }
      //
      var form_data = $('#calculator').serialize() + "&placeholder=" + document.getElementById("output").getAttribute("placeholder");
      $.ajax({
          type: "POST",
          url: "calculator.php",
          data: form_data,
          success: function (data) {
            $('#outputline').html(data + " flag - " + flag + " flag_eq - " + flag_eq + " flag_rev - " + flag_rev);
            //присвоим результат туды-сюды
            if (data[0] != "E") data = parseFloat(data).toFixed(20).replace(/\.?0+$/,'');

            document.getElementById("input").setAttribute("value", data);
            document.getElementById("output").setAttribute("value", data);

            if (id == "reverse" && flag_rev == 0) { //кринж вертим обратные числа{
              document.getElementById("input").setAttribute("value", out_v);
              document.getElementById("output").setAttribute("value", out_v);
            }  //кринж }

            if (flag != 0 && flag_eq == 0) {
              //вспомним прошлое, если надо 
              document.getElementById("input").setAttribute("value", in_v2);
              flag = 2;
            }

            if (flag_eq == 1) {
              flag = 0;
              flag_eq = 0;
            }
          }
      });
      break;
    case ".":
      //
      if (flag_eq == 1) {
        exp.setAttribute("value", "0" + id);
        exp2.setAttribute("value", "0" + id);
        flag_eq = 0;
      }

      if (exp2.getAttribute("value") == null) exp2.setAttribute("value", "0" + id);
      if (exp.getAttribute("value") == null) exp.setAttribute("value", "0" + id);

      if (exp2.getAttribute("value") != null) {
        for (let i = 0; i < exp2.getAttribute("value").length; i++) { 
          //console.log(i + " - " + text2[i]); 
          if (exp2.getAttribute("value")[i] == ".") {
            isComa = 1;
            break; 
          }
        }
      }

      //if (flag == 1) flag = 2;

      if (isComa == 0 && flag_eq == 0) {
        if (flag == 0) exp.setAttribute("value", exp.getAttribute("value") + id);
        exp2.setAttribute("value", exp2.getAttribute("value") + id);
        isComa = 1;
      }
      break;
    case "plusmn":
      //чтобы не выполнять лишние действия
      if(exp2.getAttribute("value") == null && exp2.getAttribute("placeholder") == 0) break;
      //запомним выражение 
      var in_v3 = document.getElementById("input").getAttribute("value");
      //изменим выражение на умножение
      if (flag == 0) {
        exp.setAttribute("value", -exp.getAttribute("value"));
      } 
      if (exp2.getAttribute("value") == null) exp2.setAttribute("value", exp2.getAttribute("placeholder"));
      exp2.setAttribute("value", -exp2.getAttribute("value"));

      if (flag_eq == 1) {
        exp.setAttribute("value", exp2.getAttribute("value"));
        flag = 0;
        flag_eq = 0;
      }
      break;
      default: break;
  }
});


$(document).on('click','#equat', function (event){
  if (event.target.id == "equat") return false;
  let ids = event.target.id;
  let x_1 = document.getElementById("x1");
  let x_2 = document.getElementById("x2");
  let x_0 = document.getElementById("xx");
  let roots = document.getElementById("roots");
  let root = document.getElementById("root");
  let mesa = document.getElementById("mesa");
  let mesa2 = document.getElementById("mesa2");
  //alert("dqiowhd");
  switch (ids) {
    case "calculate":
      //console.log("WTF " + document.getElementById("aa").value);

      mesa.setAttribute("hidden", true);
      mesa2.setAttribute("hidden", true);
      root.setAttribute("hidden", true);
      roots.setAttribute("hidden", true);
      document.getElementById("clear").setAttribute("value", "⬆");

      var form_data = $('#equat').serialize();
      console.log("in - " + form_data);
      //console.log("not");

      $.ajax({
          type: "POST",
          url: "calculator.php",
          data: form_data,
          success: function (data) {
            console.log("out - " + data);
            if (data == "E1") mesa.removeAttribute("hidden");
            if (data == "E2") mesa2.removeAttribute("hidden");
            if (data[0] == "A") {
              root.removeAttribute("hidden");
              document.getElementById("xx").setAttribute("value", data.substring(1));
            }
            if (data[0] == "B") {
              let data_temp = data.substring(1);
              let data_split = data_temp.split("&");
              roots.removeAttribute("hidden");
              document.getElementById("x1").setAttribute("value", data_split[0]);
              document.getElementById("x2").setAttribute("value", data_split[1]);
            }
          }
      });
      break;
      case "clear":
        mesa.setAttribute("hidden", true);
        mesa2.setAttribute("hidden", true);
        root.setAttribute("hidden", true);
        roots.setAttribute("hidden", true);
        x_1.setAttribute("value", 0);
        x_2.setAttribute("value", 0);
        x_0.setAttribute("value", 0);
        $('#aa').attr( 'value', '' );
        $('#bb').attr( 'value', '' );
        $('#cc').attr( 'value', '' );
        document.getElementById("clear").setAttribute("value", "✖");
      break;
  }
});