//==============================================================================
// Функция поедания пешкой
//==============================================================================
function PawnEat(addr) {
  var fields = [];
  var candidate = {};
  var coord = getcoord(addr);
  var begin = getcell(addr);
  if (color(begin.textContent) == 'White')  var col_fl = 1;
  if (color(begin.textContent) == 'Black')  var col_fl = -1;
     for (var i = -1; i < 2; i+=2) {
      candidate.y = coord.y - 1 * col_fl;
      candidate.x = coord.x + i;
       if (candidate.x > 0 && candidate.x < 9) {
         var newaddres = getaddr(candidate);
         var newcell = getcell(newaddres);
         if (figure(newcell.textContent) != 'Free' && color(newcell.textContent) != color(begin.textContent)) {
           fields.push(newaddres);
         }
       }
     }
  return fields;
}
//==============================================================================

//==============================================================================
// Функция движения пешки
//==============================================================================
function PawnMove(addr) {
  var fields = [];
  var candidate = {};
  var coord = getcoord(addr);
  var begin = getcell(addr);
  var ch_dop = false;
  if (color(begin.textContent) == 'White')  var col_fl = 1;
  if (color(begin.textContent) == 'Black')  var col_fl = -1;
     candidate.y = coord.y - 1 * col_fl;
     candidate.x = coord.x;
     var newaddres = getaddr(candidate);
     var newcell = getcell(newaddres);
     if (figure(newcell.textContent) == 'Free') {
      fields.push(newaddres);
      ch_dop = true;
     }
     candidate.y = coord.y - 2 * col_fl;
     candidate.x = coord.x;
     var newaddres = getaddr(candidate);
     var newcell = getcell(newaddres);
     if (figure(newcell.textContent) == 'Free' && coord.y == 7 && ch_dop && col_fl == 1) {
      fields.push(newaddres);
     }
     if (figure(newcell.textContent) == 'Free' && coord.y == 2 && ch_dop && col_fl == -1) {
      fields.push(newaddres);
     }
  return fields;
}
//==============================================================================

//==============================================================================
// Функция движения ладьи
//==============================================================================
function RockMove(addr) {
  var fields = [];
  var candidate = {};
  var coord = getcoord(addr);
  var begin = getcell(addr);
  candidate.x = coord.x;
    for (var i = coord.y; i < 8; i++) {
      candidate.y = i + 1;
      var newaddres = getaddr(candidate);
      var newcell = getcell(newaddres);
      if (figure(newcell.textContent) == 'Free') {
       fields.push(newaddres);
      }
      if (figure(newcell.textContent) != 'Free' && color(newcell.textContent) != color(begin.textContent)) {
       fields.push(newaddres);
       break;
      }
      if (color(newcell.textContent) == color(begin.textContent)) break;
    }
    for (var i = coord.y; i > 1; i--) {
      candidate.y = i - 1;
      var newaddres = getaddr(candidate);
      var newcell = getcell(newaddres);
      if (figure(newcell.textContent) == 'Free') {
       fields.push(newaddres);
      }
      if (figure(newcell.textContent) != 'Free' && color(newcell.textContent) != color(begin.textContent)) {
       fields.push(newaddres);
       break;
      }
      if (color(newcell.textContent) == color(begin.textContent)) break;
    }
    candidate.y = coord.y;
      for (var i = coord.x; i < 8; i++) {
        candidate.x = i + 1;
        var newaddres = getaddr(candidate);
        var newcell = getcell(newaddres);
        if (figure(newcell.textContent) == 'Free') {
         fields.push(newaddres);
        }
        if (figure(newcell.textContent) != 'Free' && color(newcell.textContent) != color(begin.textContent)) {
         fields.push(newaddres);
         break;
        }
        if (color(newcell.textContent) == color(begin.textContent)) break;
      }
      for (var i = coord.x; i > 1; i--) {
        candidate.x = i - 1;
        var newaddres = getaddr(candidate);
        var newcell = getcell(newaddres);
        if (figure(newcell.textContent) == 'Free') {
         fields.push(newaddres);
        }
        if (figure(newcell.textContent) != 'Free' && color(newcell.textContent) != color(begin.textContent)) {
         fields.push(newaddres);
         break;
        }
        if (color(newcell.textContent) == color(begin.textContent)) break;
      }
  return fields;
}
//==============================================================================

//==============================================================================
// Функция движения коня
//==============================================================================
function KnightMove(addr) {
  var fields = [];
  var candidate = {};
  var coord = getcoord(addr);
  var begin = getcell(addr);
  var variants = [[2,2,1,1,-2,-2,-1,-1],
                  [1,-1,2,-2,1,-1,2,-2]];
  for (var i = 0; i < 8; i++) {
    candidate.y = coord.y + variants[0][i];
    candidate.x = coord.x + variants[1][i];
    if (candidate.x < 9 && candidate.x > 0 && candidate.y < 9 && candidate.y > 0) {
      var newaddres = getaddr(candidate);
      var newcell = getcell(newaddres);
      if (figure(newcell.textContent) == 'Free' || figure(newcell.textContent) != 'Free' && color(newcell.textContent) != color(begin.textContent)) {
        fields.push(newaddres);
      }
    }
  }
  return fields;
}
//==============================================================================

//==============================================================================
// Функция движения Слона
//==============================================================================
function BishopMove(addr) {
  var fields = [];
  var candidate = {};
  var coord = getcoord(addr);
  var begin = getcell(addr);
  candidate.x = coord.x + 1;
    for (var i = coord.y; i < 8; i++) {
      //alert(i + ' ' + coord.x);
      if (candidate.x > 8) break;
      candidate.y = i + 1;
      var newaddres = getaddr(candidate);
      var newcell = getcell(newaddres);
      if (figure(newcell.textContent) == 'Free') {
       fields.push(newaddres);
      }
      if (figure(newcell.textContent) != 'Free' && color(newcell.textContent) != color(begin.textContent)) {
       fields.push(newaddres);
       break;
      }
      if (color(newcell.textContent) == color(begin.textContent)) break;
      candidate.x++;
    }
    candidate.x = coord.x + 1;
    for (var i = coord.y; i > 1; i--) {
      if (candidate.x > 8) break;
      candidate.y = i - 1;
      var newaddres = getaddr(candidate);
      var newcell = getcell(newaddres);
      if (figure(newcell.textContent) == 'Free') {
       fields.push(newaddres);
      }
      if (figure(newcell.textContent) != 'Free' && color(newcell.textContent) != color(begin.textContent)) {
       fields.push(newaddres);
       break;
      }
      if (color(newcell.textContent) == color(begin.textContent)) break;
      candidate.x++;
    }
    candidate.x = coord.x - 1;
      for (var i = coord.y; i < 8; i++) {
       if (candidate.x < 1) break;
        candidate.y = i + 1;
        var newaddres = getaddr(candidate);
        var newcell = getcell(newaddres);
        if (figure(newcell.textContent) == 'Free') {
         fields.push(newaddres);
        }
        if (figure(newcell.textContent) != 'Free' && color(newcell.textContent) != color(begin.textContent)) {
         fields.push(newaddres);
         break;
        }
        if (color(newcell.textContent) == color(begin.textContent)) break;
        candidate.x--;
      }

    candidate.x = coord.x - 1;
      for (var i = coord.y; i > 1; i--) {
        if (candidate.x < 1) break;
        candidate.y = i - 1;
        var newaddres = getaddr(candidate);
        var newcell = getcell(newaddres);
        if (figure(newcell.textContent) == 'Free') {
         fields.push(newaddres);
        }
        if (figure(newcell.textContent) != 'Free' && color(newcell.textContent) != color(begin.textContent)) {
         fields.push(newaddres);
         break;
        }
        if (color(newcell.textContent) == color(begin.textContent)) break;
        candidate.x--;
      }
  return fields;
}
//==============================================================================

//==============================================================================
// Функция движения Короля
//==============================================================================
function KingMove(addr) {
  var fields = [];
  var candidate = {};
  var coord = getcoord(addr);
  var begin = getcell(addr);
  var variants = [[0,0,1,-1,1,1,-1,-1],
                  [1,-1,0,0,1,-1,1,-1]];
    for (var i = 0; i < 8; i++) {
      candidate.y = coord.y + variants[0][i];
      candidate.x = coord.x + variants[1][i];
      if (candidate.x < 9 && candidate.x > 0 && candidate.y < 9 && candidate.y > 0) {
        var newaddres = getaddr(candidate);
        var newcell = getcell(newaddres);
        if (figure(newcell.textContent) == 'Free' || figure(newcell.textContent) != 'Free' && color(newcell.textContent) != color(begin.textContent)) {
          fields.push(newaddres);
        }
      }
    }
  return fields;
}
//==============================================================================

//==============================================================================
// Функция рокировки Короля
//==============================================================================
function KingCastle(addr) {
  var fields = [];
  var coord = getcoord(addr);
  var begin = getcell(addr);
  if (color(begin.textContent) == 'White' && addr == 'E1' && figure(getcell('F1').textContent) == 'Free' && figure(getcell('G1').textContent) == 'Free' && !Threat('E1','Black') && !Threat('F1','Black') && !Threat('G1','Black') && !Game.movedking_White) {
    fields.push('G1');
  }
  if (color(begin.textContent) == 'White' && addr == 'E1' && figure(getcell('D1').textContent) == 'Free' && figure(getcell('C1').textContent) == 'Free' && figure(getcell('B1').textContent) == 'Free' && !Threat('E1','Black') && !Threat('D1','Black') && !Threat('C1','Black') && !Game.movedking_White) {
    fields.push('C1');
  }
  if (color(begin.textContent) == 'Black' && addr == 'E8' && figure(getcell('F8').textContent) == 'Free' && figure(getcell('G8').textContent) == 'Free' && !Threat('E8','White') && !Threat('F8','White') && !Threat('G8','White') && !Game.movedking_Black) {
    fields.push('G8');
  }
  if (color(begin.textContent) == 'Black' && addr == 'E8' && figure(getcell('D8').textContent) == 'Free' && figure(getcell('C8').textContent) == 'Free' && figure(getcell('B8').textContent) == 'Free' && !Threat('E8','White') && !Threat('D8','White') && !Threat('C8','White') && !Game.movedking_Black) {
    fields.push('C8');
  }
  return fields;
}
//==============================================================================
