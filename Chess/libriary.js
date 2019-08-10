//==============================================================================
// Функция очищает доску от всех фигур и опционально расставляет начальную расстановку (если start == 1)
//==============================================================================
function initial(start){
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
// Функция пишет что за фигура по Char-коду символа
//==============================================================================
function figure (charcode) {
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
// Функция определяет цвет фигуры по Char-коду символа
//==============================================================================
function color(charcode) {
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
function contains(arr, elem) {                                                      // Функция определяет есть ли в массиве указанный элемент
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === elem) {
            return true;
        }
    }
    return false;                                                                   // в случае не обнаружения элемента функция возвращает Ложь
}

//==============================================================================
// Функция определяет координаты в таблице по адресу
//==============================================================================
function getcoord(addr) {
  var ch = {};
  ch.x = addr.charCodeAt(0) - 64;
  ch.y = 9 - addr[1];
  return ch;
}
//==============================================================================

//==============================================================================
// Функция определяет адрес клетки по координатам
//==============================================================================
function getaddr(coord) {
  var addr = '';
  addr = String.fromCharCode(64 + +coord.x);
  addr += 9 - coord.y;
  return addr;
}
//==============================================================================

//==============================================================================
// Функция получает ссылку на ячейку таблицы по координатам
//==============================================================================
function getcell(addr) {
  var table  = document.getElementsByTagName('table');
  for(var i = 0; i < 10; i++){
    var tr = table[0].getElementsByTagName('tr');                            // Получаем строки
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
// Функция ищет адрес королей
//==============================================================================
function find_king(side) {
  var table  = document.getElementsByTagName('table');
  for(var i = 0; i < 10; i++){
    var tr = table[0].getElementsByTagName('tr');                            // Получаем строки
      for(var j = 0; j < 10; j++){
        var td = tr[i].getElementsByTagName('td');
        if (figure(td[j].textContent) == 'K' && color(td[j].textContent) == side) {
          return td[j].title;
        }
      }
   }
}
//==============================================================================

//==============================================================================
// Функция определяет есть ли угроза взятия поля
//==============================================================================
function Threat(addr, side) {
  var titles = [];
  var threats = [];
  var table  = document.getElementsByTagName('table');

  for(var i = 0; i < 10; i++){
    var tr = table[0].getElementsByTagName('tr');                            // Получаем строки
      for(var j = 0; j < 10; j++){
        var td = tr[i].getElementsByTagName('td');
        if (color(td[j].textContent) == side) {
          titles = titles.concat(td[j].title);
        }
      }
   }

   for (var i = 0; i < titles.length; i++) {
     begin = getcell(titles[i]);

     if (figure(begin.textContent) == '') {
       threats = threats.concat(PawnEat(titles[i]));
     }

     if (figure(begin.textContent) == 'R') {
       threats = threats.concat(RockMove(titles[i]));
     }

     if (figure(begin.textContent) == 'N') {
       threats = threats.concat(KnightMove(titles[i]));
     }

     if (figure(begin.textContent) == 'B') {
       threats = threats.concat(BishopMove(titles[i]));
     }

     if (figure(begin.textContent) == 'Q') {
       threats = threats.concat(RockMove(titles[i]));
       threats = threats.concat(BishopMove(titles[i]));
     }

     if (figure(begin.textContent) == 'K') {
       threats = threats.concat(KingMove(titles[i]));
     }
   }
  return contains(threats,addr);
}
//==============================================================================

//==============================================================================
// Функция определяет возможные ходы
//==============================================================================

function legalmove(addr) {
  var fields = [];
  //var begin = table[0].querySelectorAll('td[title = \'addr\']');                // ? почему всегда undefined ?
  var begin = getcell(addr);

  if (figure(begin.textContent) == '') {
    fields = PawnMove(addr);
    fields = fields.concat(PawnEat(addr));
  }

  if (figure(begin.textContent) == 'R') {
    fields = RockMove(addr);
  }

  if (figure(begin.textContent) == 'N') {
    fields = KnightMove(addr);
  }

  if (figure(begin.textContent) == 'B') {
    fields = BishopMove(addr);
  }

  if (figure(begin.textContent) == 'Q') {
    fields = RockMove(addr);
    fields = fields.concat(BishopMove(addr));
  }

  if (figure(begin.textContent) == 'K') {
    fields = KingMove(addr);
    fields = fields.concat(KingCastle(addr));
  }

  for (var i = 0; i < fields.length; i++) {
    var newcell = getcell(fields[i]);
    var content = newcell.textContent;
    newcell.innerHTML = begin.textContent;
    begin.innerHTML='';
    if (!Threat(find_king(Game.player_color),Game.opposite_player_color)) {
      newcell.classList.add('legal');
    }
    begin.innerHTML = newcell.textContent;
    newcell.innerHTML = content;
  }

     return fields;
}
//==============================================================================

//==============================================================================
// Функция пишет нотацию игры
//==============================================================================

function Notation() {
    var textarea = document.getElementsByTagName('div');
    var castle = '';

    if (Game.side) {
      textarea[0].innerHTML += Game.move + '. '
    }

    if (figure(Game.Eated_one) == 'Free') {
      if (figure(Game.piece) == 'K' && (getcell(Game.from).title == 'E1' && getcell(Game.to).title == 'G1' || getcell(Game.from).title == 'E8' && getcell(Game.to).title == 'G8')) {
        castle = 'O-O';
        textarea[0].innerHTML += castle + ' ';
      }
      if (figure(Game.piece) == 'K' && (getcell(Game.from).title == 'E1' && getcell(Game.to).title == 'C1' || getcell(Game.from).title == 'E8' && getcell(Game.to).title == 'C8')) {
        castle = 'O-O-O';
        textarea[0].innerHTML += castle + ' ';
      }
      if (castle == '') {
        textarea[0].innerHTML += figure(Game.piece) + Game.to + ' ';
      }

    }

    if (color(Game.Eated_one) == Game.opposite_player_color ) {
      if (figure(Game.piece) == '') {
          textarea[0].innerHTML += Game.from[0];
      }
          textarea[0].innerHTML += figure(Game.piece) + 'x' + Game.to + ' ';
    }
  /*
               if (!Game.side) {
                 textarea[0].innerHTML += '\n';
               }
  */

}
//==============================================================================

//==============================================================================
// Функция делает ход
//==============================================================================
function MakeMove() {
  var lastselect = document.getElementsByClassName('legal');
  var status = document.getElementsByTagName('input');
  var textarea = document.getElementsByTagName('div');

  Game.Check = '';


  if (contains(legalmove(Game.from),Game.to)) {

    getcell(Game.to).innerHTML = Game.piece;
    getcell(Game.from).innerHTML = '';

    if (figure(Game.piece) == 'K' && getcell(Game.from).title == 'E1' && getcell(Game.to).title == 'G1') {
      getcell('F1').innerHTML = String.fromCharCode(9814);
      getcell('H1').innerHTML = '';
    }
    if (figure(Game.piece) == 'K' && getcell(Game.from).title == 'E1' && getcell(Game.to).title == 'C1') {
      getcell('D1').innerHTML = String.fromCharCode(9814);
      getcell('A1').innerHTML = '';
    }
    if (figure(Game.piece) == 'K' && getcell(Game.from).title == 'E8' && getcell(Game.to).title == 'G8') {
      getcell('F8').innerHTML = String.fromCharCode(9820);
      getcell('H8').innerHTML = '';
    }
    if (figure(Game.piece) == 'K' && getcell(Game.from).title == 'E8' && getcell(Game.to).title == 'C8') {
      getcell('D8').innerHTML = String.fromCharCode(9820);
      getcell('A8').innerHTML = '';
    }
/*
    if (Threat(Game.to,Game.opposite_player_color)) {
      status[1].value = 'Тебя тут могут сьесть!';
    }
    else {
      status[1].value = 'OK!';
    }
*/
    if (Game.player_color == 'White') {
      var side  = 'Белых';
      var inside = 'Черных';
    }
    if (Game.player_color == 'Black') {
      var side  = 'Черных';
      var inside =  'Белых';
    }
    if (Threat(find_king(Game.player_color),Game.opposite_player_color)) {

        status[1].value = 'Ход невозможен - Королю ' + side + ' будет шах!';
        getcell(Game.to).innerHTML = Game.Eated_one;
        getcell(Game.from).innerHTML = Game.piece;

    }
    else {
      status[1].value = '';
      Notation();
      if (Threat(find_king(Game.opposite_player_color),Game.player_color)) {
          status[1].value = 'Королю ' + inside + ' шах!';
          textarea[0].innerHTML += ' +'
          Game.Check = Game.opposite_player_color;
      }



          if (figure(Game.piece) == 'K' && Game.player_color == 'White') {
            Game.movedking_White = true;
          }
          if (figure(Game.piece) == 'K' && Game.player_color == 'Black') {
            Game.movedking_Black = true;
          }

          getcell(Game.from).classList.remove('click');
          unselect(lastselect,'legal');
          Game_End();
          Game.start = false;
          //Game.side = !Game.side;
          Game.move += 0.5;
          WhoIs(Game.side);
    }
  }
  else {
    status[1].value = 'Некорректный ход';
  }
}
//==============================================================================

//==============================================================================
// Функция проверяет на завершение игры
//==============================================================================
function Game_End() {
  var lastselect = document.getElementsByClassName('legal');
  var status = document.getElementsByTagName('input');
  var textarea = document.getElementsByTagName('div');
  var titles = [];
  var moves = [];
  var table  = document.getElementsByTagName('table');

  for(var i = 0; i < 10; i++){
    var tr = table[0].getElementsByTagName('tr');                            // Получаем строки
      for(var j = 0; j < 10; j++){
        var td = tr[i].getElementsByTagName('td');
        if (color(td[j].textContent) == Game.opposite_player_color) {
          titles.push(td[j].title);
        }
      }
   }
   Game.side = !Game.side;
   if (Game.side) {
      Game.player_color = 'White';
      Game.opposite_player_color = 'Black';
   }
   if (!Game.side) {
      Game.player_color = 'Black';
      Game.opposite_player_color = 'White';
   }
     unselect(lastselect,'legal');
   for (var i = 0; i < titles.length; i++) {
     legalmove(titles[i]);
   }
   for (var i = 0; i < lastselect.length; i++) {
     moves = moves.concat(lastselect[i].title);
     lastselect[i].classList.remove('legal');
     i--;
   }

//console.log(moves);
   if (moves.length == 0 && Game.Check == 'Black') {
     status[1].value = 'Конец игры - Белые победили!!  Мат черному королю!';
     textarea[0].innerHTML += ' # 0-1';
   }
   if (moves.length == 0 && Game.Check == 'White') {
     status[1].value = 'Конец игры - Черные победили!! Мат белому королю!';
     textarea[0].innerHTML += '# 0-1';
   }
   if (moves.length == 0 && Game.Check == '') {
     status[1].value = 'Конец игры - Ничья! На доске - пат!';
     textarea[0].innerHTML += ' 1/2-1/2'
    }
}
//==============================================================================
