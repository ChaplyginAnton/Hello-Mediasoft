//===========================================================================================================
// Класс Chess_game -
// Содержит основной движок игры - Шахматы
// Содержит метод создания новой игры
//===========================================================================================================
class Chess_game {
  constructor() {
    this.Game = {                        // Создаем главный объект игры
      side : true,
      flip : true,
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
      Check : '',
      En_passant : '',
      ep_cell : {},
      ep_content : '',
      promote : true,
      promote_flag : false,
      State : [],
      Note : []
    }
    //this.State = [];
  }
//==============================================================================
// Метод создания новой игры
//==============================================================================
 NewGame() {
  var textarea = document.getElementsByTagName('div');
  var lastone = document.getElementsByClassName('click');
  var lastselect = document.getElementsByClassName('legal');
  var status = document.getElementsByTagName('input');
// Default всех значений:
  Chess.Game.side = true;
  Chess.Game.flip = true;
  Chess.Game.start = false;
  Chess.Game.move = 1;
  Chess.Game.movedking_White = false;
  Chess.Game.movedking_Black = false;
  Chess.Game.promote = true;
  Chess.Game.promote_flag = false;
  Chess.Game.State = [];
  Chess.Game.Note = [];
  status[4].value = 'Всем привет! Перед вами шахматы на JS - здесь будут события';
  status[5].value = 'Здесь будет оценка позиции';
  Logic.GetPosition();
   document.body.background = 'pic/dotally.png'
  Field.initial(1);
  Field.WhoIs(true);
  textarea[0].innerHTML = '';
  Field.unselect(lastselect,'legal');
  if (lastone[0] != undefined) {
    lastone[0].classList.remove('click');
  }
}
//==============================================================================

//==============================================================================
// Метод основного движка игры
//==============================================================================
 Core () {
  var table  = document.getElementsByTagName('table');
  var textarea = document.getElementsByTagName('div');
  var lastone = document.getElementsByClassName('click');
  var lastselect = document.getElementsByClassName('legal');
  var status = document.getElementsByTagName('input');
  Logic.GetPosition();
 // Создание глобального события клика
  window.addEventListener('load', () => {
      table[0].addEventListener('click', () => {
                                                      // Проверка что есть адрес - значит это ячейка таблицы
          let target = event.target;
          let tooltipHtml = target.title;
          if (!tooltipHtml) return;

          Field.Player_colors();                 // Установка маркера хода
  //  Второй клик по своей фигуре
          if (Chess.Game.start && Logic.color(target.textContent) == Chess.Game.player_color && Chess.Game.promote) {
            if (lastone[0] != undefined) {
              lastone[0].classList.remove('click');
            }
             target.classList.add('click');
             Chess.Game.piece = target.textContent;
             Chess.Game.start = true;
             Field.unselect(lastselect,'legal');
             Logic.legalmove(target.title);
          }
  // Первый клик по своей фигуре
          if (!Chess.Game.start && Logic.color(target.textContent) == Chess.Game.player_color && Chess.Game.promote) {
             target.classList.add('click');
             Chess.Game.piece = target.textContent;
             Chess.Game.start = true;
             Field.unselect(lastselect,'legal');
             Logic.legalmove(target.title);
          }
  // Второй клик по пустому полю либо фигуре противника
          if (Chess.Game.start && (Logic.figure(target.textContent) == 'Free' || Logic.color(target.textContent) == Chess.Game.opposite_player_color) && Chess.Game.promote) {
              // Запись сьеденной фигуры:
            if (Logic.color(target.textContent) == Chess.Game.opposite_player_color) {
              Chess.Game.Eated_one = target.textContent;
            }
            else {
              Chess.Game.Eated_one = '';
            }
            Chess.Game.from = lastone[0].title; // Запись адресов начала и конца хода
            Chess.Game.to = target.title;
            Logic.MakeMove();                  // Сделать ход, есди возможно
          }
      });
  });
}
//==============================================================================

//===========================================================================================================
// Класс Chess_game - крайняя строчка
//===========================================================================================================
}

//===========================================================================================================
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// Текст основного скрипта - инициализирует все классы Chess_rules, Chess_logic, Chess_graphic, Chess_game
// Рисуем интерфейс
// Создаем "ядро" игры
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//===========================================================================================================
var Rules = new Chess_rules;
var Logic = new Chess_logic;
var Field = new Chess_graphic;
var Chess = new Chess_game;
Field.Draw();
Chess.Core();
