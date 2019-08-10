
var Game = {
  side : true,
  player_color : '',
  opposite_player_color : '',
  start : false,
  piece : '',
  move : 1,
  movedking_White : false,
  movedking_Black : false,
  Eated_one : '',
  from : '',
  to : '',
  Check : ''
}

addmenu();
tableCreate();
addtext('Всем привет! Перед вами шахматы на JS');

core();
//==============================================================================
// Функция создания новой игры
//==============================================================================
function NewGame() {
  var textarea = document.getElementsByTagName('div');
  var lastone = document.getElementsByClassName('click');
  var lastselect = document.getElementsByClassName('legal');

  Game.side = true;
  Game.player_color='';
  Game.opposite_player_color='';
  Game.start = false;
  Game.piece = '';
  Game.move = 1;
  Game.movedking_White = false;
  Game.movedking_Black = false;
  Game.Check = '';

  initial(1);
  WhoIs(true);
  textarea[0].innerHTML = '';
  unselect(lastselect,'legal');
  if (lastone[0] != undefined) {
    lastone[0].classList.remove('click');
  }
}
//==============================================================================

//==============================================================================
// Функция основного движка игры
//==============================================================================
function core () {

  var table  = document.getElementsByTagName('table');
  var textarea = document.getElementsByTagName('div');
  var lastone = document.getElementsByClassName('click');
  var lastselect = document.getElementsByClassName('legal');
  var status = document.getElementsByTagName('input');

  initial(1);
  WhoIs(true);

  window.addEventListener('load', function(){
      table[0].addEventListener('click', function(e){

          let target = event.target;
          let tooltipHtml = target.title;
          if (!tooltipHtml) return;

          if (Game.side) {
             Game.player_color = 'White';
             Game.opposite_player_color = 'Black';
          }
          if (!Game.side) {
             Game.player_color = 'Black';
             Game.opposite_player_color = 'White';
          }

          if (Game.start && color(target.textContent) == Game.player_color) {
             lastone[0].classList.remove('click');
             target.classList.add('click');
             Game.piece = target.textContent;
             Game.start = true;
             unselect(lastselect,'legal');
             legalmove(target.title);
          }

          if (!Game.start && color(target.textContent) == Game.player_color) {
             target.classList.add('click');
             Game.piece = target.textContent;
             Game.start = true;
             unselect(lastselect,'legal');
             legalmove(target.title);
          }

          if (Game.start && (figure(target.textContent) == 'Free' || color(target.textContent) == Game.opposite_player_color)) {

            if (color(target.textContent) == Game.opposite_player_color) {
              Game.Eated_one = target.textContent;
            }
            else {
              Game.Eated_one = '';
            }

            Game.from = lastone[0].title;
            Game.to = target.title;

            MakeMove();

          }
      });
  });
}
//==============================================================================
