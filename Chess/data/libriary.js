//===========================================================================================================
// Класс Chess_logic -
// содержит вспомогательные методы и логику взаимодействия игры - Шахматы
//===========================================================================================================
class Chess_logic {

//==============================================================================
// Метод пишет что за фигура по Char-коду символа
//==============================================================================
 figure (charcode) {
  if (charcode == String.fromCharCode(9820) || charcode == String.fromCharCode(9814)) {
    return 'R';
  }
  if (charcode == String.fromCharCode(9822) || charcode == String.fromCharCode(9816)) {
    return 'N';
  }
  if (charcode == String.fromCharCode(9821) || charcode == String.fromCharCode(9815)) {
    return 'B';
  }
  if (charcode == String.fromCharCode(9819) || charcode == String.fromCharCode(9813)) {
    return 'Q';
  }
  if (charcode == String.fromCharCode(9818) || charcode == String.fromCharCode(9812)) {
    return 'K';
  }
  if (charcode == String.fromCharCode(9823) || charcode == String.fromCharCode(9817)) {
    return '';
  }
  if (charcode == undefined || charcode == '') {
    return 'Free';
  }
}
//==============================================================================

//==============================================================================
// Метод определяет цвет фигуры по Char-коду символа
//==============================================================================
 color(charcode) {
  if (charcode == String.fromCharCode(9820) || charcode == String.fromCharCode(9822) || charcode == String.fromCharCode(9821) || charcode == String.fromCharCode(9819)|| charcode == String.fromCharCode(9818) || charcode == String.fromCharCode(9823)) {
    return 'Black';
  }

  if (charcode == String.fromCharCode(9817) || charcode == String.fromCharCode(9814) || charcode == String.fromCharCode(9816) || charcode == String.fromCharCode(9815) || charcode == String.fromCharCode(9813) || charcode == String.fromCharCode(9812)) {
    return 'White';
  }

  if (charcode == undefined || charcode == '') {
    return 'Free';
  }

}
//==============================================================================

//==============================================================================
// Метод определяет есть ли в массиве указанный элемент
//==============================================================================
 contains(arr, elem) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === elem) {
            return true;
        }
    }
    return false;
}
//==============================================================================

//==============================================================================
// Метод определяет координаты в таблице по адресу
// Для промежутных расчетов и преобразований
//==============================================================================
 getcoord(addr) {
  var ch = {};
  ch.x = addr.charCodeAt(0) - 64;
  ch.y = 9 - addr[1];
  return ch;
}
//==============================================================================

//==============================================================================
// Метод определяет адрес клетки по координатам
// Для промежутных расчетов и преобразований
//==============================================================================
 getaddr(coord) {
  var addr = '';
  addr = String.fromCharCode(64 + +coord.x);
  addr += 9 - coord.y;
  return addr;
}
//==============================================================================

//==============================================================================
// Метод получает ссылку на ячейку таблицы по адресу
// Для промежутных расчетов и преобразований
//==============================================================================
 getcell(addr) {
  var table  = document.getElementsByTagName('table');
  for(var i = 0; i < 10; i++){
    var tr = table[0].getElementsByTagName('tr');
      for(var j = 0; j < 10; j++){
        var td = tr[i].getElementsByTagName('td');
        if (td[j].title == addr) {
          return td[j];
        }
      }
   }
}
//==============================================================================

//==============================================================================
// Метод ищет адрес королей
// Для дальнейшей проверки на шах и завершение игры
//==============================================================================
 find_king(side) {
  var table  = document.getElementsByTagName('table');
  for(var i = 0; i < 10; i++){
    var tr = table[0].getElementsByTagName('tr');
      for(var j = 0; j < 10; j++){
        var td = tr[i].getElementsByTagName('td');
        if (Logic.figure(td[j].textContent) == 'K' && Logic.color(td[j].textContent) == side) {
          return td[j].title;
        }
      }
   }
}
//==============================================================================

//==============================================================================
// Метод определяет есть ли угроза взятия поля стороной side
//==============================================================================
 Threat(addr, side) {
  var titles = [];
  var threats = [];
  var table  = document.getElementsByTagName('table');

  for(var i = 0; i < 10; i++){
    var tr = table[0].getElementsByTagName('tr');
      for(var j = 0; j < 10; j++){
        var td = tr[i].getElementsByTagName('td');
        if (Logic.color(td[j].textContent) == side) {
          titles = titles.concat(td[j].title);                                    // Адреса всех фигур стороны
        }
      }
   }

   for (var i = 0; i < titles.length; i++) {                                     // Проверка на возможные ходы
     var begin = Logic.getcell(titles[i]);                                       // зависит от типа фигуры

     if (Logic.figure(begin.textContent) == '') {
       threats = threats.concat(Rules.PawnEat(titles[i]));
     }

     if (Logic.figure(begin.textContent) == 'R') {
       threats = threats.concat(Rules.RockMove(titles[i]));
     }

     if (Logic.figure(begin.textContent) == 'N') {
       threats = threats.concat(Rules.KnightMove(titles[i]));
     }

     if (Logic.figure(begin.textContent) == 'B') {
       threats = threats.concat(Rules.BishopMove(titles[i]));
     }

     if (Logic.figure(begin.textContent) == 'Q') {
       threats = threats.concat(Rules.RockMove(titles[i]));
       threats = threats.concat(Rules.BishopMove(titles[i]));
     }

     if (Logic.figure(begin.textContent) == 'K') {
       threats = threats.concat(Rules.KingMove(titles[i]));
     }
   }
  return Logic.contains(threats,addr);                                           // Есть ли поле среди ходов стороны?
}
//==============================================================================

//==============================================================================
// Метод определяет возможные ходы
//==============================================================================

 legalmove(addr) {
  var fields = [];
  //var begin = table[0].querySelectorAll('td[title = \'addr\']');                // ? почему всегда undefined ?
  var begin = Logic.getcell(addr);

  if (Logic.figure(begin.textContent) == '') {                                     // Проверка на возможные ходы
    fields = Rules.PawnMove(addr);                                                // зависит от типа фигуры
    fields = fields.concat(Rules.PawnEat(addr));
  }

  if (Logic.figure(begin.textContent) == 'R') {
    fields = Rules.RockMove(addr);
  }

  if (Logic.figure(begin.textContent) == 'N') {
    fields = Rules.KnightMove(addr);
  }

  if (Logic.figure(begin.textContent) == 'B') {
    fields = Rules.BishopMove(addr);
  }

  if (Logic.figure(begin.textContent) == 'Q') {
    fields = Rules.RockMove(addr);
    fields = fields.concat(Rules.BishopMove(addr));
  }

  if (Logic.figure(begin.textContent) == 'K') {
    fields = Rules.KingMove(addr);
    fields = fields.concat(Rules.KingCastle(addr));
  }

  for (var i = 0; i < fields.length; i++) {
    var newcell = Logic.getcell(fields[i]);
    var content = newcell.textContent;
    var EP = false;                                                              // Проверка на взятие на проходе
    if (Rules.EnPassant(addr,fields[i])) EP = true;

    newcell.innerHTML = begin.textContent;                                        // Имитаця хода
    begin.innerHTML = '';
                                                                                  // проверка на шах после хода
    if (!Logic.Threat(Logic.find_king(Chess.Game.player_color),Chess.Game.opposite_player_color)) {
      newcell.classList.add('legal');
    }
    begin.innerHTML = newcell.textContent;                                       // Возвращение хода назад
    newcell.innerHTML = content;
    if (EP) {
      Chess.Game.ep_cell.innerHTML = Chess.Game.ep_content;                      // и фигуры взятой на проходе
    }
  }
     return fields;
}
//==============================================================================

//==============================================================================
// Метод пишет нотацию игры
//==============================================================================

 Notation() {
    var textarea = document.getElementsByTagName('div');
    var castle = '';
    Chess.Game.Note[Chess.Game.move*2] = '';

    if (Chess.Game.side) {                                                        // Запись номера хода
    Chess.Game.Note[Chess.Game.move*2] += `${Chess.Game.move}. `
    }

    if (Logic.figure(Chess.Game.Eated_one) == 'Free') {                           // запись Рокировки
      if (Logic.figure(Chess.Game.piece) == 'K' && (Logic.getcell(Chess.Game.from).title == 'E1' && Logic.getcell(Chess.Game.to).title == 'G1' || Logic.getcell(Chess.Game.from).title == 'E8' && Logic.getcell(Chess.Game.to).title == 'G8')) {
        castle = 'O-O';
        Chess.Game.Note[Chess.Game.move*2] += `${castle} `;
      }
      if (Logic.figure(Chess.Game.piece) == 'K' && (Logic.getcell(Chess.Game.from).title == 'E1' && Logic.getcell(Chess.Game.to).title == 'C1' || Logic.getcell(Chess.Game.from).title == 'E8' && Logic.getcell(Chess.Game.to).title == 'C8')) {
        castle = 'O-O-O';
        Chess.Game.Note[Chess.Game.move*2] += `${castle} `;
      }

      if (castle == '') {                                                          // Запись обычного хода
        Chess.Game.Note[Chess.Game.move*2] += `${Logic.figure(Chess.Game.piece)}${Chess.Game.to} `;
      }

    }
                                                                                 // Запись взятия фигуры
    if (Logic.color(Chess.Game.Eated_one) == Chess.Game.opposite_player_color) {
      if (Logic.figure(Chess.Game.piece) == '') {
          Chess.Game.Note[Chess.Game.move*2] += `${Chess.Game.from[0]}x${Chess.Game.to[0]} `;
      }
      else {
          Chess.Game.Note[Chess.Game.move*2] += `${Logic.figure(Chess.Game.piece)}${Chess.Game.to} `;
      }
    }
               // Сначала была запись в массив, потом в поле на странице
    textarea[0].innerHTML += Chess.Game.Note[Chess.Game.move*2];
}
//==============================================================================

//==============================================================================
// Метод сохраняет позицию
//==============================================================================
 GetPosition() {
   var table  = document.getElementsByTagName('table');
   Chess.Game.State[Chess.Game.move*2] = {};                                      // Создание объекта
   for(var i = 0; i < 10; i++){
     var tr = table[0].getElementsByTagName('tr');
       for(var j = 0; j < 10; j++){
         var td = tr[i].getElementsByTagName('td');
           if (td[j].title != undefined && td[j].title != '') {
             Chess.Game.State[Chess.Game.move*2][td[j].title] = td[j].textContent; // Сохранение нового свойства в обьект
          }
       }
    }
 }
//==============================================================================

 //==============================================================================
 // Метод расставляет позицию
 //==============================================================================
  SetPosition(position) {
    var table  = document.getElementsByTagName('table');
    var textarea = document.getElementsByTagName('div');
    var lastselect = document.getElementsByClassName('legal');
    var lastone = document.getElementsByClassName('click');
    if (Chess.Game.State[Chess.Game.move*2 + +position] != undefined && Chess.Game.move > 0.5) {  // условия возврата хода
     for(var i = 0; i < 10; i++){
      var tr = table[0].getElementsByTagName('tr');
        for(var j = 0; j < 10; j++){
          var td = tr[i].getElementsByTagName('td');
            if (td[j].title != undefined && td[j].title != '') {
               td[j].innerHTML = Chess.Game.State[Chess.Game.move*2 + +position][td[j].title]; // Расстановка из массива
           }
        }
      }
      if (position != 0) {
        Chess.Game.promote = true;                                                  // Разрешение ходить если вдруг было завершение игры
        Chess.Game.side = !Chess.Game.side;                                         // Смена стороны
        Field.Player_colors();
        Field.WhoIs(Chess.Game.side);

        Chess.Game.move += 0.5 * position;
                                           // Смена номера хода
                                               // Снятие выделений:
        Field.unselect(lastselect,'legal');
        if (lastone[0] != undefined) {
         lastone[0].classList.remove('click');
        }

        textarea[0].innerHTML = '';
        for (var i = 2; i < Chess.Game.move*2; i++) {
          textarea[0].innerHTML += Chess.Game.Note[i];                              // Запись нотации до промотки
        }

        for (var i = Chess.Game.move*2; i < Chess.Game.Note.length; i++) {
          if (i == Chess.Game.move*2) textarea[0].innerHTML += '<em> ( <em>';       // Запись нотации после промотки
          textarea[0].innerHTML += `<em>${Chess.Game.Note[i]}<em>`;
          if (i == Chess.Game.Note.length-1)  textarea[0].innerHTML += '<em>) <em>';
          }
      }
    }
  }
//==============================================================================

//==============================================================================
// Метод делает ход
//==============================================================================
 MakeMove() {
  var lastselect = document.getElementsByClassName('legal');
  var status = document.getElementsByTagName('input');
  var textarea = document.getElementsByTagName('div');

  Chess.Game.Check = '';                                                         // Флаг наличия короля под шахом

  if (Logic.contains(Logic.legalmove(Chess.Game.from),Chess.Game.to)) {          // Проверка легальности хода
    var EP = false;
    if (Rules.EnPassant(Chess.Game.from,Chess.Game.to)) EP = true;
    Logic.getcell(Chess.Game.to).innerHTML = Chess.Game.piece;                   // Выполнение хода
    Logic.getcell(Chess.Game.from).innerHTML = '';

    Rules.CastleMake();

    if (Logic.Threat(Logic.find_king(Chess.Game.player_color),Chess.Game.opposite_player_color)) {
        status[4].value = `Ход невозможен - Королю ${Field.Player_colors().side} будет шах!`;
        Logic.getcell(Chess.Game.to).innerHTML = Chess.Game.Eated_one;           // Проверка на дальнейший шах
        Logic.getcell(Chess.Game.from).innerHTML = Chess.Game.piece;             // возвращение хода
        if (EP) {
          Chess.Game.ep_cell.innerHTML = Chess.Game.ep_content;
        }
    }
    else {
      status[4].value = '';
      Logic.Notation();
      Chess.Game.promote_flag = false;           // Условие превращения пешки на крайней горизонтали
      if (Logic.figure(Chess.Game.piece) == '' && Chess.Game.player_color == 'White' && Chess.Game.to[1] == '8') {
        Field.Pawn_promote();
        Chess.Game.promote_flag = true;  // Флаг что превращение идет
      }
      if (Logic.figure(Chess.Game.piece) == '' && Chess.Game.player_color == 'Black' && Chess.Game.to[1] == '1') {
        Field.Pawn_promote();
        Chess.Game.promote_flag = true;
      }
      Rules.CheckOptions();  // Доп. условия хода
      Logic.getcell(Chess.Game.from).classList.remove('click'); // Снятие выделений
      Field.unselect(lastselect,'legal');

      if (!Chess.Game.promote_flag) {             // Если нет превращения проверка на завершение хода/игры
        Logic.Game_End();
      }
    }
  }
  else {
    status[4].value = 'Некорректный ход';          // Если ход вообще не по правилам
  }
}
//==============================================================================

//==============================================================================
// Метод проверяет на завершение игры
//==============================================================================
 Game_End() {
  var lastselect = document.getElementsByClassName('legal');
  var status = document.getElementsByTagName('input');
  var textarea = document.getElementsByTagName('div');
  var titles = [];
  var moves = [];
  var table  = document.getElementsByTagName('table');

  for(var i = 0; i < 10; i++){
    var tr = table[0].getElementsByTagName('tr');                            // Получаем адреса фигур оппонента
      for(var j = 0; j < 10; j++){
        var td = tr[i].getElementsByTagName('td');
        if (Logic.color(td[j].textContent) == Chess.Game.opposite_player_color) {
          titles.push(td[j].title);
        }
      }
   }
   // Проверка на шах после хода:
   if (Logic.Threat(Logic.find_king(Chess.Game.opposite_player_color),Chess.Game.player_color)) {
       status[4].value = `Королю ${Field.Player_colors().inside} шах!`;
       Chess.Game.Note[Chess.Game.move*2] += ' + ';
       textarea[0].innerHTML += ' + ';
       Chess.Game.Check = Chess.Game.opposite_player_color;
   }

   Chess.Game.side = !Chess.Game.side;          // Перемена цвета
   Field.Player_colors();
   Field.unselect(lastselect,'legal');           // Проверка есть ли у оппонента легальные ходы
   for (var i = 0; i < titles.length; i++) {
     Logic.legalmove(titles[i]);                // Дает селект легальных ходов
   }
   for (var i = 0; i < lastselect.length; i++) {
     moves = moves.concat(lastselect[i].title); // Проверяет все селекты
     lastselect[i].classList.remove('legal');
     i--;
   }
// Поверка условий завершения игры:
   if (moves.length == 0 && Chess.Game.Check == 'Black') {
     status[4].value = 'Конец игры - Белые победили!!  Мат черному королю!';
     Chess.Game.Note[Chess.Game.move*2] += ' # 0-1';
     textarea[0].innerHTML += ' # 0-1';
     Chess.Game.promote = false;
     document.body.background = 'pic/salut.jpg';
   }
   if (moves.length == 0 && Chess.Game.Check == 'White') {
     status[4].value = 'Конец игры - Черные победили!! Мат белому королю!';
     Chess.Game.Note[Chess.Game.move*2] += '# 0-1';
     textarea[0].innerHTML += '# 0-1';
     Chess.Game.promote = false;
     document.body.background = 'pic/salut.jpg';
   }
   if (moves.length == 0 && Chess.Game.Check == '') {
     status[4].value = 'Конец игры - Ничья! На доске - пат!';
     Chess.Game.Note[Chess.Game.move*2] += ' 1/2-1/2';
     textarea[0].innerHTML += ' 1/2-1/2';
     Chess.Game.promote = false;
    }
  // Передача хода:
    Chess.Game.start = false;
    Chess.Game.move += 0.5;
    Field.WhoIs(Chess.Game.side);
    Logic.material();                                                            // Оценка позиции
    Logic.GetPosition();                                                         // Сохранение позиции в массив
    console.log(moves[Math.floor(Math.random()*moves.length)]);                  // Начало ИИ - пока Рандом
}
//==============================================================================


//==============================================================================
// Метод оценки материала
//==============================================================================
 material() {
  var table  = document.getElementById('chess_board');
  var status = document.getElementById('EngineCalc');
  var extra = '';
  var calc = 0;

  for(var i = 0; i < 10; i++){
    var tr = table.getElementsByTagName('tr');                                    // Получаем фигуры и ставим им оценки
      for(var j = 0; j < 10; j++){
        var td = tr[i].getElementsByTagName('td');
        if (Logic.color(td[j].textContent) == 'White') {
          if (Logic.figure(td[j].textContent) == 'Q') {
            calc += 9;
          }
          if (Logic.figure(td[j].textContent) == 'R') {
            calc += 4;
          }
          if (Logic.figure(td[j].textContent) == 'B') {
            calc += 3;
          }
          if (Logic.figure(td[j].textContent) == 'N') {
            calc += 2.5;
          }
          if (Logic.figure(td[j].textContent) == '') {
            calc += 1;
          }
        }
        if (Logic.color(td[j].textContent) == 'Black') {
          if (Logic.figure(td[j].textContent) == 'Q') {
            calc -= 9;
          }
          if (Logic.figure(td[j].textContent) == 'R') {
            calc -= 4;
          }
          if (Logic.figure(td[j].textContent) == 'B') {
            calc -= 3;
          }
          if (Logic.figure(td[j].textContent) == 'N') {
            calc -= 2.5;
          }
          if (Logic.figure(td[j].textContent) == '') {
            calc -= 1;
          }
        }
      }
   }
   // Реузльтат итоговой оценки материала:
 if (calc > 0) {
   status.value = ` Оценка позиции +${calc} : в пользу белых!`;
 }
 if (calc < 0) {
   status.value = ` Оценка позиции ${calc} : в пользу черных!`;
 }
 if (calc == 0) {
   status.value = ` Оценка позиции ${calc} : равенство`;
 }
}
//==============================================================================

//===========================================================================================================
// Класс Chess_logic - крайняя строчка
//===========================================================================================================
}
