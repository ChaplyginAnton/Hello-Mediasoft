//===========================================================================================================
// Класс Chess_graphic -
// Делает все что связано с графическим отображением игры - Шахматы
//===========================================================================================================
class Chess_graphic {

//==============================================================================
// Метод добавляет интерфейс
//==============================================================================
 Draw() {
   this.addmenu();
   this.tableCreate();
   this.addtext('Всем привет! Перед вами шахматы на JS');
   this.addEngine();
   this.initial(1);
   this.WhoIs(true);
   document.body.background = 'pic/dotally.png'
 }
//==============================================================================
//==============================================================================
// Метод рисует шахматную доску с помощью таблицы
//==============================================================================
 tableCreate() {
    var body = document.body,
        tbl  = document.createElement('table'),                                  // Создаем таблицу
        caption = tbl.createCaption(),                                           // Создаем имя таблицы
        col = 1;                                                                 // Счетчик для шахматного порядка цвета клеток
        caption.textContent = 'Шахматная доска';                                 // Имя таблицы
        tbl.className = 'table-main';
        tbl.id = 'chess_board';                                            // Цвет фона таблицы

    for(var i = 0; i < 10; i++){
        var tr = tbl.insertRow();                                                // Создаем стобец
        for(var j = 0; j < 10; j++){
          var td = tr.insertCell();                                              // Создаем ячейку
          td.className = 'cell';
          if (i != 9 && j != 9 && i != 0 && j != 0) {
            var Char = String.fromCharCode(64+j);
            var Numb = 9-i;
            var str = Char + Numb;
            td.title = str;                                                      // Вставляем свойство с координатами
          }
            if (i == 9 && j != 9 && i != 0 && j != 0) {
              var str = String.fromCharCode(64+j);;
              td.className = 'cell-nav-down';
              td.appendChild(document.createTextNode(str));                      // Вставляем буквенные обозначения координат по краю таблицы
            }
            if (i == 0 && i != 9 && j != 9 && j != 0) {
              var str = String.fromCharCode(64+j);
              td.className = 'cell-nav-up';
              td.appendChild(document.createTextNode(str));                      // Вставляем буквенные обозначения координат по краю таблицы с другой стороны
            }
            if (j == 0 && j != 9 && i != 9 && i != 0) {
              td.className = 'cell-nav-left';
              var str = 9-i;
              td.appendChild(document.createTextNode(str));                      // Вставляем цифровые обозначения координат по краю таблицы с другой стороны
            }
            if (j == 9 && i != 9 && i != 0 && j != 0) {
              var str = 9-i;
              td.appendChild(document.createTextNode(str));                      // Вставляем цифровые обозначения координат по краю таблицы
              td.className = 'cell-nav-right';
            }
            if ((i == 9 && j == 9) || (i == 9 && j == 0) || (i == 0 && j == 9) || (i == 0 && j == 0) ) {
              td.className = 'cell-nav-corner';                                   // Стилизуем пустые углы по размеру и границам
            }
            if (col%2 == 0 && i != 9 && j != 9 && i != 0 && j != 0) {
              td.classList.add('black');                                              // Красим в церный в шахматном порядке
            }
            col++;                                                               // Счетчик для шахматного порядка цвета клеток
        }
        col--;
    }
    body.appendChild(tbl);                                                       // Вставляем таблицу в документ;
}
//==============================================================================

//==============================================================================
// Метод очищает доску от всех фигур и опционально расставляет начальную расстановку (если start == 1)
//==============================================================================
 initial(start) {
  var bod = document.body,
      table  = document.getElementsByTagName('table');                            // Получаем таблицу

      for(var i = 0; i < 10; i++){
        var tr = table[0].getElementsByTagName('tr');                            // Получаем строки
          for(var j = 0; j < 10; j++){
            var td = tr[i].getElementsByTagName('td');                           // Получаем ячейки
            if ((i == 1 || i == 2 || i == 7 || i == 8) && j != 0 && j != 9 && start) {                  // Вставляем фигуры - следующий этап:
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

            td[j].innerHTML = str;
           }
           if (i > 2 && i < 7 && j != 0 && j != 9 && start) {                    // Очищаем доску от фигур кроме стартовых
             td[j].innerHTML = '';
           }
           if (start == 0 && i != 9 && j != 9 && i != 0 && j != 0) {               // Очищаем доску от всех фигур
             td[j].innerHTML = '';
           }
        }
     }
}
//==============================================================================

//==============================================================================
// Метод добавляет кнопки меню
//==============================================================================
 addmenu() {
    var element = document.createElement('input');
    element.setAttribute('type', 'button');
    element.setAttribute('value', 'Новая игра');
    element.setAttribute('name', 'button1');
    element.setAttribute('onclick', 'Chess.NewGame()');
    element.className = 'button';
    document.body.appendChild(element);

    var element = document.createElement('input');
    element.setAttribute('type', 'button');
    element.setAttribute('value', ' << Ход назад <<');
    element.setAttribute('name', 'button2');
    element.setAttribute('onclick', 'Logic.SetPosition(-1)');
    element.className = 'button';
    document.body.appendChild(element);

    var element = document.createElement('input');
    element.setAttribute('type', 'button');
    element.setAttribute('value', ' >> Ход вперед >>');
    element.setAttribute('name', 'button3');
    element.setAttribute('onclick', 'Logic.SetPosition(1)');
    element.className = 'button';
    document.body.appendChild(element);

    var element = document.createElement('input');
    element.setAttribute('type', 'button');
    element.setAttribute('value', 'Flip');
    element.setAttribute('name', 'button4');
    element.setAttribute('onclick', 'Field.FlipBoard()');
    element.className = 'button';
    document.body.appendChild(element);

/*
    var element = document.createElement('input');
    element.setAttribute('type', 'button');
    element.setAttribute('value', 'Очистить доску');
    element.setAttribute('name', 'button2');
    element.setAttribute('onclick', 'initial(0)');
    document.body.appendChild(element);
    */
    var element = document.createElement('input');
    element.setAttribute('type', 'textarea');
    element.setAttribute('value', 'Здесь будут события');
    element.setAttribute('size', '200');
    element.setAttribute('rows', '2');
    element.setAttribute('name', 'Status');
    document.body.appendChild(element);
}
//==============================================================================
//==============================================================================
// Метод добавляет тесктовое поле
//==============================================================================
 addtext(text) {
  /*  var element = document.createElement('textarea');
    element.setAttribute('value', text);
    element.setAttribute('position', 'fixed');
    element.setAttribute('name', 'Status');
    element.setAttribute('cols', '50');
    element.setAttribute('rows', '5');
    document.body.appendChild(element);
    element.style.left = '450px';
    element.style.top = '3000px';
*/
    var element = document.createElement('div');
    element.setAttribute('id', 'textarea');
    element.setAttribute('contenteditable', 'true');
    document.body.appendChild(element);
    element.style.left = '450px';
    element.style.top = '100px';
}

//==============================================================================

//==============================================================================
// Метод добавляет строку Engine
//==============================================================================
 addEngine() {
    var element = document.createElement('input');
    element.setAttribute('type', 'textarea');
    element.setAttribute('value', 'Здесь будет оценка позиции');
    element.setAttribute('size', '55');
    element.setAttribute('name', 'Engine');
    element.id = 'EngineCalc';
    document.body.appendChild(element);
}
//==============================================================================

//==============================================================================
// Метод рисует подсказки с очередностью хода
//==============================================================================
 WhoIs(side) {
  if (side) {
     var side_color = '<b>Белых<b>';
     if (Chess.Game.flip) {
       var left = 400;                                                             // Устанавливаем координаты
       var top = 454;
     }
     else {
       var left = 400;                                                             // Устанавливаем координаты
       var top = 50;
     }

  }
  if (!side) {
    var side_color = '<b>Черных<b>';
     if (Chess.Game.flip) {
       var left = 400;                                                             // Устанавливаем координаты
       var top = 50;
     }
     else {
       var left = 400;                                                             // Устанавливаем координаты
       var top = 454;
     }
  }

  var tooltipElem = document.getElementsByTagName('div');                        // Удаляем элемент предыдущий
  if (tooltipElem[1]) {
    tooltipElem[1].remove();
    //tooltipElem[1] = null;
  }
  tooltipElem = document.createElement('div');                                    // Создаем новый
  tooltipElem.className = 'tooltip';                                              // Да, можно было просто скрывать
  tooltipElem.innerHTML = `Ход ${side_color}`;
  document.body.append(tooltipElem);                                             // Сделал изначально для эксперимента
  tooltipElem.style.left = left + 'px';                                           // Решил не переделывать
  tooltipElem.style.top = top + 'px';
}

//==============================================================================
// Метод убирает все классы именем clas у коллекции объектов
//==============================================================================
 unselect(object,clas) {
  for (var i = 0; i < object.length; i++) {
    object[i].classList.remove(clas);
    i--;                                                                          // Интересный момент: getElementsByClassName
  }                                                                               // Динамический и несмотря на i++ надо еще и i--
}
//==============================================================================

//==============================================================================
// Метод решает цвет игроков
//==============================================================================
 Player_colors() {
  var color_rus = {};                                                             // Тут все просто
  if (Chess.Game.side) {
     Chess.Game.player_color = 'White';                                          // для сокращения кода
     Chess.Game.opposite_player_color = 'Black';
     color_rus.side  = 'Белых';
     color_rus.inside = 'Черных';
  }
  if (!Chess.Game.side) {
     Chess.Game.player_color = 'Black';
     Chess.Game.opposite_player_color = 'White';
     color_rus.side  = 'Черных';
     color_rus.inside =  'Белых';
  }
  return color_rus;
}
//==============================================================================

//==============================================================================
// Метод превращения пешки
//==============================================================================
 Pawn_promote() {
  var element = document.createElement('div');
  var cells = element.getElementsByTagName('td');
  var textarea = document.getElementsByTagName('div');
  var main_table = document.getElementById('chess_board');
  var status = document.getElementsByTagName('input');

  element.id = 'Promote';
  element.className = 'tooltip';
  document.body.append(element);
  var table = document.createElement('table');                                    // Создаем таблицу с фигурами на выбор
  table.id = 'Choise';
  var tr = table.insertRow();
  for(var i = 0; i < 4; i++){
    var td = tr.insertCell();
      if (Chess.Game.player_color == 'White') {
        if (i == 0) var str = String.fromCharCode(9816);
        if (i == 1) var str = String.fromCharCode(9815);
        if (i == 2) var str = String.fromCharCode(9813);
        if (i == 3) var str = String.fromCharCode(9814);
      }
      if (Chess.Game.player_color == 'Black') {
        if (i == 0) var str = String.fromCharCode(9822);
        if (i == 1) var str = String.fromCharCode(9821);
        if (i == 2) var str = String.fromCharCode(9819);
        if (i == 3) var str = String.fromCharCode(9820);
      }
        td.title = i;
        td.className = 'cell';
        td.appendChild(document.createTextNode(str));
  }
  table.className = 'table-main';
  document.getElementById('Promote').appendChild(table);
  var promotion = '';                                                            // Флаг для ловли события
  Chess.Game.promote = false;                                                    // Флаг для деактивации основной доски
  main_table.style.opacity = '0.7';
  Logic.getcell(Chess.Game.to).classList.add('promote');                         // Стили
  status[1].disabled = true;                                                     // Деактивация кнопок
  status[2].disabled = true;
  status[3].disabled = true;
    for (var i = 0; i < 4; i++) {
      cells[i].onclick = () => {                                                 // создание событий выбора фигуры
        var target = event.target;
        promotion = target.textContent;
        if (promotion != '') {
          Logic.getcell(Chess.Game.to).innerHTML = promotion;                    // Выбор фигуры
          Chess.Game.promote = true;                                             // Флаг для активации основной доски
          element.remove();                                                      // Удаление таблицы с фигурами
          element = null;
          Chess.Game.Note[Chess.Game.move*2] += `=${Logic.figure(promotion)} `;
          textarea[0].innerHTML += `=${Logic.figure(promotion)} `;               // Запись нотации
          main_table.style.opacity = '1';
          Logic.getcell(Chess.Game.to).classList.remove('promote');
          Logic.Game_End();                                                      // проверка завершения хода/игры
          status[1].disabled = false;                                            // Активация кнопок
          status[2].disabled = false;
          status[3].disabled = false;
        }
      }
    }
}
//==============================================================================

//==============================================================================
// Метод переворачивает доску
//==============================================================================
 FlipBoard() {
    var main_table = document.getElementById('chess_board');
    var lastselect = document.getElementsByClassName('legal');
    var lastone = document.getElementsByClassName('click');
    Logic.GetPosition();

    if (!Chess.Game.flip) {
      for(var i = 0; i < 10; i++){
        var tr = main_table.getElementsByTagName('tr');
          for(var j = 0; j < 10; j++){
            var td = tr[i].getElementsByTagName('td');
            if (i != 9 && j != 9 && i != 0 && j != 0) {
              var Char = String.fromCharCode(64+j);
              var Numb = 9-i;
              var str = Char + Numb;
              td[j].title = str;                                                      // Вставляем свойство с координатами
            }
              if ((i == 0 || i == 9) && j != 9 && j != 0) {
                var str = String.fromCharCode(64+j);
                td[j].innerHTML = str;                                                // Вставляем буквенные обозначения координат по краю таблицы с другой стороны
              }
              if ((j == 0 || j == 9) && i != 9 && i != 0) {
                var str = 9-i;
                td[j].innerHTML = str;                                                // Вставляем цифровые обозначения координат по краю таблицы с другой стороны
              }
          }
      }
    }
    if (Chess.Game.flip) {
      for(var i = 0; i < 10; i++){
        var tr = main_table.getElementsByTagName('tr');
          for(var j = 0; j < 10; j++){
            var td = tr[i].getElementsByTagName('td');
            if (i != 9 && j != 9 && i != 0 && j != 0) {
              var Char = String.fromCharCode(73-j);
              var Numb = i;
              var str = Char + Numb;
              td[j].title = str;                                                  // Вставляем свойство с координатами
            }
              if ((i == 0 || i == 9) && j != 9 && j != 0) {
                var str = String.fromCharCode(73-j);
                td[j].innerHTML = str;                                                // Вставляем буквенные обозначения координат по краю таблицы с другой стороны
              }
              if ((j == 0 || j == 9) && i != 9 && i != 0) {
                var str = i;
                td[j].innerHTML = str;                                                // Вставляем цифровые обозначения координат по краю таблицы с другой стороны
              }
          }
      }
    }
   Logic.SetPosition(0);
   Chess.Game.flip = !Chess.Game.flip;
   // Снятие выделений:
   Field.unselect(lastselect,'legal');
   if (lastone[0] != undefined) lastone[0].classList.remove('click');
   Field.WhoIs(Chess.Game.side);
 }
//==============================================================================

//===========================================================================================================
// Класс Chess_graphic - крайняя строчка
//===========================================================================================================
}
