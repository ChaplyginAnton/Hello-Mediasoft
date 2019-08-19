//===========================================================================================================
// Класс Chess_rules -
// содержит правила для передвижения фигур игры - Шахматы
//===========================================================================================================
class Chess_rules {

//==============================================================================
// Метод поедания пешкой
//==============================================================================
 PawnEat(addr) {
  var fields = [];
  var candidate = {};
  var coord = Logic.getcoord(addr);
  var begin = Logic.getcell(addr);
  if (Logic.color(begin.textContent) == 'White')  var col_fl = 1;                // Флаги для сокращения строчек кода
  if (Logic.color(begin.textContent) == 'Black')  var col_fl = -1;
     for (var i = -1; i < 2; i+=2) {                                             // Обычное взятие
      candidate.y = coord.y - 1 * col_fl;
      candidate.x = coord.x + i;
       if (candidate.x > 0 && candidate.x < 9 && candidate.y > 0 && candidate.y < 9) { // Границы поля
         var newaddres = Logic.getaddr(candidate);
         var newcell = Logic.getcell(newaddres);
         if (Logic.figure(newcell.textContent) != 'Free' && Logic.color(newcell.textContent) != Logic.color(begin.textContent)) {
           fields.push(newaddres);                                               // пуш элемента в массив
         }
       }
       candidate.y = coord.y;                                                    // взятие на проходе
       candidate.x = coord.x + i;
       if (candidate.x > 0 && candidate.x < 9) {                                 // Границы поля
         var newaddres = Logic.getaddr(candidate);
         var newcell = Logic.getcell(newaddres);
         if (newaddres == Chess.Game.En_passant) {                               // проверка если предыдущий ход был двойной пешечный и соседний
           candidate.y = coord.y - 1 * col_fl;
           newaddres = Logic.getaddr(candidate);
           fields.push(newaddres);                                               // пуш элемента в массив
         }
       }
     }
  return fields;
}
//==============================================================================

//==============================================================================
// Метод движения пешки
//==============================================================================
 PawnMove(addr) {
  var fields = [];
  var candidate = {};
  var coord = Logic.getcoord(addr);
  var begin = Logic.getcell(addr);
  var ch_dop = false;
  if (Logic.color(begin.textContent) == 'White')  var col_fl = 1;                 // Флаги для сокращения строчек кода
  if (Logic.color(begin.textContent) == 'Black')  var col_fl = -1;
     candidate.y = coord.y - 1 * col_fl;
     candidate.x = coord.x;
     var newaddres = Logic.getaddr(candidate);                                   // Обычный ход
     var newcell = Logic.getcell(newaddres);
     if (Logic.figure(newcell.textContent) == 'Free') {
      fields.push(newaddres);                                                       // пуш элемента в массив
      ch_dop = true;
     }
     candidate.y = coord.y - 2 * col_fl;                                         // Двойной ход
     candidate.x = coord.x;                                                      // Отличается для белых и для черных
     var newaddres = Logic.getaddr(candidate);
     var newcell = Logic.getcell(newaddres);
     if (Logic.color(begin.textContent) == 'White' && candidate.y > 0) {
       if (Logic.figure(newcell.textContent) == 'Free' && coord.y == 7 && ch_dop && col_fl == 1) {
        fields.push(newaddres);                                                   // пуш элемента в массив
       }
     }
     if (Logic.color(begin.textContent) == 'Black' && candidate.y < 9) {
       if (Logic.figure(newcell.textContent) == 'Free' && coord.y == 2 && ch_dop && col_fl == -1) {
        fields.push(newaddres);                                                  // пуш элемента в массив
       }
    }
  return fields;
}
//==============================================================================

//==============================================================================
// Метод движения ладьи
// Проверка по 4 сторонам - если встречает препятствие или край доски - останавливает проверку
//==============================================================================
 RockMove(addr) {
  var fields = [];
  var candidate = {};
  var coord = Logic.getcoord(addr);
  var begin = Logic.getcell(addr);
  candidate.x = coord.x;
    for (var i = coord.y; i < 8; i++) {
      candidate.y = i + 1;
      var newaddres = Logic.getaddr(candidate);
      var newcell = Logic.getcell(newaddres);
      if (Logic.figure(newcell.textContent) == 'Free') {
       fields.push(newaddres);
      }
      if (Logic.figure(newcell.textContent) != 'Free' && Logic.color(newcell.textContent) != Logic.color(begin.textContent)) {
       fields.push(newaddres);
       break;
      }
      if (Logic.color(newcell.textContent) == Logic.color(begin.textContent)) break;
    }
    for (var i = coord.y; i > 1; i--) {
      candidate.y = i - 1;
      var newaddres = Logic.getaddr(candidate);
      var newcell = Logic.getcell(newaddres);
      if (Logic.figure(newcell.textContent) == 'Free') {
       fields.push(newaddres);
      }
      if (Logic.figure(newcell.textContent) != 'Free' && Logic.color(newcell.textContent) != Logic.color(begin.textContent)) {
       fields.push(newaddres);
       break;
      }
      if (Logic.color(newcell.textContent) == Logic.color(begin.textContent)) break;
    }
    candidate.y = coord.y;
      for (var i = coord.x; i < 8; i++) {
        candidate.x = i + 1;
        var newaddres = Logic.getaddr(candidate);
        var newcell = Logic.getcell(newaddres);
        if (Logic.figure(newcell.textContent) == 'Free') {
         fields.push(newaddres);
        }
        if (Logic.figure(newcell.textContent) != 'Free' && Logic.color(newcell.textContent) != Logic.color(begin.textContent)) {
         fields.push(newaddres);
         break;
        }
        if (Logic.color(newcell.textContent) == Logic.color(begin.textContent)) break;
      }
      for (var i = coord.x; i > 1; i--) {
        candidate.x = i - 1;
        var newaddres = Logic.getaddr(candidate);
        var newcell = Logic.getcell(newaddres);
        if (Logic.figure(newcell.textContent) == 'Free') {
         fields.push(newaddres);
        }
        if (Logic.figure(newcell.textContent) != 'Free' && Logic.color(newcell.textContent) != Logic.color(begin.textContent)) {
         fields.push(newaddres);
         break;
        }
        if (Logic.color(newcell.textContent) == Logic.color(begin.textContent)) break;
      }
  return fields;
}
//==============================================================================

//==============================================================================
// Метод движения коня
// Самая простая фигура
//==============================================================================
 KnightMove(addr) {
  var fields = [];
  var candidate = {};
  var coord = Logic.getcoord(addr);
  var begin = Logic.getcell(addr);
  var variants = [[2,2,1,1,-2,-2,-1,-1],                                         // Массив возможных ходов
                  [1,-1,2,-2,1,-1,2,-2]];
  for (var i = 0; i < 8; i++) {
    candidate.y = coord.y + variants[0][i];
    candidate.x = coord.x + variants[1][i];
    if (candidate.x < 9 && candidate.x > 0 && candidate.y < 9 && candidate.y > 0) { // Проверка на край доски
      var newaddres = Logic.getaddr(candidate);
      var newcell = Logic.getcell(newaddres);
      if (Logic.figure(newcell.textContent) == 'Free' || Logic.figure(newcell.textContent) != 'Free' && Logic.color(newcell.textContent) != Logic.color(begin.textContent)) {
        fields.push(newaddres);
      }
    }
  }
  return fields;
}
//==============================================================================

//==============================================================================
// Метод движения Слона
// Проверка по 4 диагоналям - если встречает препятствие или край доски - останавливает проверку
//==============================================================================
 BishopMove(addr) {
  var fields = [];
  var candidate = {};
  var coord = Logic.getcoord(addr);
  var begin = Logic.getcell(addr);
  candidate.x = coord.x + 1;
    for (var i = coord.y; i < 8; i++) {
      if (candidate.x > 8) break;
      candidate.y = i + 1;
      var newaddres = Logic.getaddr(candidate);
      var newcell = Logic.getcell(newaddres);
      if (Logic.figure(newcell.textContent) == 'Free') {
       fields.push(newaddres);
      }
      if (Logic.figure(newcell.textContent) != 'Free' && Logic.color(newcell.textContent) != Logic.color(begin.textContent)) {
       fields.push(newaddres);
       break;
      }
      if (Logic.color(newcell.textContent) == Logic.color(begin.textContent)) break;
      candidate.x++;
    }
    candidate.x = coord.x + 1;
    for (var i = coord.y; i > 1; i--) {
      if (candidate.x > 8) break;
      candidate.y = i - 1;
      var newaddres = Logic.getaddr(candidate);
      var newcell = Logic.getcell(newaddres);
      if (Logic.figure(newcell.textContent) == 'Free') {
       fields.push(newaddres);
      }
      if (Logic.figure(newcell.textContent) != 'Free' && Logic.color(newcell.textContent) != Logic.color(begin.textContent)) {
       fields.push(newaddres);
       break;
      }
      if (Logic.color(newcell.textContent) == Logic.color(begin.textContent)) break;
      candidate.x++;
    }
    candidate.x = coord.x - 1;
      for (var i = coord.y; i < 8; i++) {
       if (candidate.x < 1) break;
        candidate.y = i + 1;
        var newaddres = Logic.getaddr(candidate);
        var newcell = Logic.getcell(newaddres);
        if (Logic.figure(newcell.textContent) == 'Free') {
         fields.push(newaddres);
        }
        if (Logic.figure(newcell.textContent) != 'Free' && Logic.color(newcell.textContent) != Logic.color(begin.textContent)) {
         fields.push(newaddres);
         break;
        }
        if (Logic.color(newcell.textContent) == Logic.color(begin.textContent)) break;
        candidate.x--;
      }

    candidate.x = coord.x - 1;
      for (var i = coord.y; i > 1; i--) {
        if (candidate.x < 1) break;
        candidate.y = i - 1;
        var newaddres = Logic.getaddr(candidate);
        var newcell = Logic.getcell(newaddres);
        if (Logic.figure(newcell.textContent) == 'Free') {
         fields.push(newaddres);
        }
        if (Logic.figure(newcell.textContent) != 'Free' && Logic.color(newcell.textContent) != Logic.color(begin.textContent)) {
         fields.push(newaddres);
         break;
        }
        if (Logic.color(newcell.textContent) == Logic.color(begin.textContent)) break;
        candidate.x--;
      }
  return fields;
}
//==============================================================================

//==============================================================================
// Метод движения Короля
//==============================================================================
 KingMove(addr) {
  var fields = [];
  var candidate = {};
  var coord = Logic.getcoord(addr);
  var begin = Logic.getcell(addr);
  var variants = [[0,0,1,-1,1,1,-1,-1],                                          // Массив возможных ходов
                  [1,-1,0,0,1,-1,1,-1]];
    for (var i = 0; i < 8; i++) {
      candidate.y = coord.y + variants[0][i];
      candidate.x = coord.x + variants[1][i];
      if (candidate.x < 9 && candidate.x > 0 && candidate.y < 9 && candidate.y > 0) { // проверка на край доски
        var newaddres = Logic.getaddr(candidate);
        var newcell = Logic.getcell(newaddres);
        if (Logic.figure(newcell.textContent) == 'Free' || Logic.figure(newcell.textContent) != 'Free' && Logic.color(newcell.textContent) != Logic.color(begin.textContent)) {
          fields.push(newaddres);
        }
      }
    }
  return fields;
}
//==============================================================================

//==============================================================================
// Метод возможной рокировки Короля
// Перебор 4 вариантов и проверка полей на наличие фигур и угрозы противника
//==============================================================================
 KingCastle(addr) {
  var fields = [];
  var coord = Logic.getcoord(addr);
  var begin = Logic.getcell(addr);
  if (Logic.color(begin.textContent) == 'White' && addr == 'E1' && Logic.figure(Logic.getcell('F1').textContent) == 'Free' && Logic.figure(Logic.getcell('G1').textContent) == 'Free' && !Logic.Threat('E1','Black') && !Logic.Threat('F1','Black') && !Logic.Threat('G1','Black') && !Chess.Game.movedking_White) {
    fields.push('G1');
  }
  if (Logic.color(begin.textContent) == 'White' && addr == 'E1' && Logic.figure(Logic.getcell('D1').textContent) == 'Free' && Logic.figure(Logic.getcell('C1').textContent) == 'Free' && Logic.figure(Logic.getcell('B1').textContent) == 'Free' && !Logic.Threat('E1','Black') && !Logic.Threat('D1','Black') && !Logic.Threat('C1','Black') && !Chess.Game.movedking_White) {
    fields.push('C1');
  }
  if (Logic.color(begin.textContent) == 'Black' && addr == 'E8' && Logic.figure(Logic.getcell('F8').textContent) == 'Free' && Logic.figure(Logic.getcell('G8').textContent) == 'Free' && !Logic.Threat('E8','White') && !Logic.Threat('F8','White') && !Logic.Threat('G8','White') && !Chess.Game.movedking_Black) {
    fields.push('G8');
  }
  if (Logic.color(begin.textContent) == 'Black' && addr == 'E8' && Logic.figure(Logic.getcell('D8').textContent) == 'Free' && Logic.figure(Logic.getcell('C8').textContent) == 'Free' && Logic.figure(Logic.getcell('B8').textContent) == 'Free' && !Logic.Threat('E8','White') && !Logic.Threat('D8','White') && !Logic.Threat('C8','White') && !Chess.Game.movedking_Black) {
    fields.push('C8');
  }
  return fields;
}
//==============================================================================

//==============================================================================
// Метод выполнения рокировки Короля
// При рокировке надо переставить еще и ладью
//==============================================================================
 CastleMake() {
  if (Logic.figure(Chess.Game.piece) == 'K' && Logic.getcell(Chess.Game.from).title == 'E1' && Logic.getcell(Chess.Game.to).title == 'G1') {
    Logic.getcell('F1').innerHTML = String.fromCharCode(9814);
    Logic.getcell('H1').innerHTML = '';
  }
  if (Logic.figure(Chess.Game.piece) == 'K' && Logic.getcell(Chess.Game.from).title == 'E1' && Logic.getcell(Chess.Game.to).title == 'C1') {
    Logic.getcell('D1').innerHTML = String.fromCharCode(9814);
    Logic.getcell('A1').innerHTML = '';
  }
  if (Logic.figure(Chess.Game.piece) == 'K' && Logic.getcell(Chess.Game.from).title == 'E8' && Logic.getcell(Chess.Game.to).title == 'G8') {
    Logic.getcell('F8').innerHTML = String.fromCharCode(9820);
    Logic.getcell('H8').innerHTML = '';
  }
  if (Logic.figure(Chess.Game.piece) == 'K' && Logic.getcell(Chess.Game.from).title == 'E8' && Logic.getcell(Chess.Game.to).title == 'C8') {
    Logic.getcell('D8').innerHTML = String.fromCharCode(9820);
    Logic.getcell('A8').innerHTML = '';
  }
}
//==============================================================================

//==============================================================================
// Метод проверок на условия двигавшегося короля и двойного хода пешкой
// После движения короля нельзя рокироваться
// После двойного хода - можно следующим взять на проходе
//==============================================================================
 CheckOptions() {
  if (Logic.figure(Chess.Game.piece) == 'K' && Chess.Game.player_color == 'White') {
    Chess.Game.movedking_White = true;
  }
  if (Logic.figure(Chess.Game.piece) == 'K' && Chess.Game.player_color == 'Black') {
    Chess.Game.movedking_Black = true;
  }
  Chess.Game.En_passant = '';
  if (Logic.figure(Chess.Game.piece) == '' && Chess.Game.player_color == 'White' && Chess.Game.from[1] == '2' && Chess.Game.to[1] == '4') {
    Chess.Game.En_passant = Chess.Game.to;
  }
  if (Logic.figure(Chess.Game.piece) == '' && Chess.Game.player_color == 'Black' && Chess.Game.from[1] == '7' && Chess.Game.to[1] == '5') {
    Chess.Game.En_passant = Chess.Game.to;
  }
}
//==============================================================================


//==============================================================================
// Метод реализации взятия на проходе
//==============================================================================
 EnPassant(from,to) {
  var begin = Logic.getcell(from);
  var newcell = Logic.getcell(to);
  var coord = Logic.getcoord(from);
  var candidate = Logic.getcoord(to);
  if (Logic.color(begin.textContent) == 'White')  var col_fl = 1;                // Флаг для сокращения кода
  if (Logic.color(begin.textContent) == 'Black')  var col_fl = -1;
  var EP = false;                                                                // флаг совершения взятия на проходе
  if (Logic.figure(begin.textContent) == '' && Logic.figure(newcell.textContent) == 'Free' && candidate.y == coord.y - 1 * col_fl && (candidate.x == coord.x - 1 || candidate.x == coord.x + 1)) {
    if (Logic.color(begin.textContent) == 'White') {
      candidate.y += 1;
    }
    if (Logic.color(begin.textContent) == 'Black') {
      candidate.y -= 1;
    }
    var ep_addr = Logic.getaddr(candidate);
    Chess.Game.ep_cell = Logic.getcell(ep_addr);
    Chess.Game.ep_content = Chess.Game.ep_cell.textContent;                       // Допонительные переменные если ход будет невозможен
    Chess.Game.Eated_one = Chess.Game.ep_content;                                // для дальнейшей проверки на шах
    Chess.Game.ep_cell.innerHTML = '';                                           // и отмены хода
    EP = true;
  }
  return EP;

}
//==============================================================================

//===========================================================================================================
// Класс Chess_rules - крайняя строчка
//===========================================================================================================
}
