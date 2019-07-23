function initial(start){
  var bod = document.body,
      table  = document.getElementsByTagName('table');                            // Получаем таблицу

      for(var i = 0; i < 10; i++){
        var tr = table[0].getElementsByTagName('tr');                            // Получаем строки

          for(var j = 0; j < 10; j++){
            var td = tr[i].getElementsByTagName('td');                           // Получаем ячейки

            if ((i == 1 || i == 2 || i == 7 || i == 8) && j != 0 && j != 9 && start) {
              if (i == 1 && (j == 1 || j == 8)) { var str = String.fromCharCode(9820) }
              if (i == 1 && (j == 2 || j == 7)) { var str = String.fromCharCode(9822) }
              if (i == 1 && (j == 3 || j == 6)) { var str = String.fromCharCode(9821) }
              if (i == 1 && j == 4 ) { var str = String.fromCharCode(9819) }
              if (i == 1 && j == 5 ) { var str = String.fromCharCode(9818) }
              if (i == 2) { var str = String.fromCharCode(9823) }
              if (i == 7) { var str = String.fromCharCode(9817) }
              if (i == 8 && (j == 1 || j == 8)) { var str = String.fromCharCode(9814) }
              if (i == 8 && (j == 2 || j == 7)) { var str = String.fromCharCode(9816) }
              if (i == 8 && (j == 3 || j == 6)) { var str = String.fromCharCode(9815) }
              if (i == 8 && j == 4 ) { var str = String.fromCharCode(9813) }
              if (i == 8 && j == 5 ) { var str = String.fromCharCode(9812) }
                                                                                           // Вставляем фигуры - следующий этап

              td[j].style = 'font-size: 200%; font-weight: bold; text-shadow: whitesmoke 1px 1px 0, whitesmoke -1px -1px 0, whitesmoke -1px 1px 0, whitesmoke 1px -1px 0';
              td[j].align = 'center';
              td[j].style.border = '1px solid black';
              td[j].innerHTML = str;
           }
           if (start == 0 && i != 9 && j != 9 && i != 0 && j != 0) {               // Очищаем доску от фигур
             td[j].innerHTML = '';
           }

        }

     }
        //body.appendChild(tbl);
}

var init = confirm('Вставить фигуры на начальную позицию?');
initial(init);
