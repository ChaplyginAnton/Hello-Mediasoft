
//==============================================================================
// Функция рисует шахматную доску с помощью таблицы
//==============================================================================
function tableCreate(){
    var body = document.body,
        tbl  = document.createElement('table'),                                  // Создаем таблицу
        caption = tbl.createCaption(),                                           // Создаем имя таблицы
        col = 1;                                                                 // Счетчик для шахматного порядка цвета клеток
        caption.textContent = 'Шахматная доска';                                 // Имя таблицы
        tbl.bgColor = 'chocolate';                                               // Цвет фона таблицы

    for(var i = 0; i < 10; i++){
        var tr = tbl.insertRow();                                                // Создаем стобец
        for(var j = 0; j < 10; j++){
          var td = tr.insertCell();                                              // Создаем ячейку
          td.style.border = '1px solid black';
          td.height = '40';
          td.width = '40';                                                       // Устанавливаем стиль и размер ячейки
            if (i == 9 && j != 9 && i != 0 && j != 0) {
              var str = String.fromCharCode(64+j);
              td.height = '20';
              td.appendChild(document.createTextNode(str));                      // Вставляем буквенные обозначения координат по краю таблицы
              td.style.border = '1px black';
              td.align = 'center';
            }
            if (i == 0 && i != 9 && j != 9 && j != 0) {
              var str = String.fromCharCode(64+j);
              td.height = '20';
              td.appendChild(document.createTextNode(str));                      // Вставляем буквенные обозначения координат по краю таблицы с другой стороны
              td.style.border = '1px black';
              td.align = 'center';
              td.style = 'transform: rotate(180deg)';
            }
            if (j == 9 && i != 9 && i != 0 && j != 0) {
              td.width = '20';
              var str = 9-i;
              td.appendChild(document.createTextNode(str));                      // Вставляем цифровые обозначения координат по краю таблицы
              td.style.border = '1px black';
              td.align = 'center';
              td.style = 'transform: rotate(180deg)';
            }
            if (j == 0 && j != 9 && i != 9 && i != 0) {
              td.width = '20';
              var str = 9-i;
              td.appendChild(document.createTextNode(str));                      // Вставляем цифровые обозначения координат по краю таблицы с другой стороны
              td.style.border = '1px black';
              td.align = 'center';
            }
            if ((i == 9 && j == 9) || (i == 9 && j == 0) || (i == 0 && j == 9) || (i == 0 && j == 0) ) {
              td.style.border = '1px black';
              td.height = '20';
              td.width = '20';                                                   // Стилизуем пустые углы по размеру и границам
            }
            if (col%2 == 0 && i != 9 && j != 9 && i != 0 && j != 0) {
              td.bgColor = 'black';                                              // Красим в церный в шахматном порядке
            }
            col++;                                                               // Счетчик для шахматного порядка цвета клеток
        }
        col--;
    }
    body.appendChild(tbl);                                                       // Вставляем таблицу в документ;
}

tableCreate();
