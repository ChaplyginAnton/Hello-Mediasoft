
//==============================================================================
// Функция рисует шахматную доску с помощью таблицы
//==============================================================================
function tableCreate(){
    var body = document.body,
        tbl  = document.createElement('table'),                                  // Создаем таблицу
        caption = tbl.createCaption(),                                           // Создаем имя таблицы
        col = 1;                                                                 // Счетчик для шахматного порядка цвета клеток
        caption.textContent = 'Шахматная доска';                                 // Имя таблицы
        tbl.className = 'table-main';                                            // Цвет фона таблицы

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
// Функция добавляет кнопки меню
//==============================================================================
function addmenu() {
    var element = document.createElement('input');
    element.setAttribute('type', 'button');
    element.setAttribute('value', 'Новая игра');
    element.setAttribute('name', 'button1');
    element.setAttribute('onclick', 'NewGame()');
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
    element.setAttribute('size', '100');
    element.setAttribute('name', 'Status');
    document.body.appendChild(element);
}
//==============================================================================
//==============================================================================
// Функция добавляет тесктовое поле
//==============================================================================
function addtext(text) {
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
// Функция рисует подсказки с очередностью хода
//==============================================================================
function WhoIs(side) {
  if (side) {
     side_color = 'Белых';
     var left = 400;
     var top = 440;
  }
  if (!side) {
     side_color = 'Черных';
     var left = 400;
     var top = 30;
  }

  var tooltipElem = document.getElementsByTagName('div');
  if (tooltipElem[1]) {
    tooltipElem[1].remove();
    tooltipElem[1] = null;
  }
  tooltipElem = document.createElement('div');
  tooltipElem.className = 'tooltip';
  tooltipElem.innerHTML = 'Ход ' + side_color;
  document.body.append(tooltipElem);
  tooltipElem.style.left = left + 'px';
  tooltipElem.style.top = top + 'px';
}

//==============================================================================
// Функция убирает все классы именем clas у коллекции объектов
//==============================================================================

function unselect(object,clas) {
  for (var i = 0; i < object.length; i++) {
    object[i].classList.remove(clas);
    i--;
  }
}
//==============================================================================

//==============================================================================
// Функция рисует всплывающие подсказки (пока не используется)
//==============================================================================
function tooltip() {
  let tooltipElem;
      document.onmouseover = function(event) {
        let target = event.target;
       // если у нас есть подсказка...
        let tooltipHtml = target.title;
        if (!tooltipHtml) return;
        // ...создадим элемент для подсказки
        tooltipElem = document.createElement('div');
        tooltipElem.className = 'tooltip';
        tooltipElem.innerHTML = 'Адрес поля - ' + tooltipHtml;
        document.body.append(tooltipElem);
        // спозиционируем его сверху от аннотируемого элемента (top-center)
        let coords = target.getBoundingClientRect();
        let left = coords.left + (target.offsetWidth - tooltipElem.offsetWidth) / 2;
        if (left < 0) left = 0; // не заезжать за левый край окна
        let top = coords.top - tooltipElem.offsetHeight - 5;
        if (top < 0) { // если подсказка не помещается сверху, то отображать её снизу
          top = coords.top + target.offsetHeight + 5;
        }
        tooltipElem.style.left = left + 'px';
        tooltipElem.style.top = top + 'px';
      };
      document.onmouseout = function(e) {
        if (tooltipElem) {
          tooltipElem.remove();
          tooltipElem = null;
        }
      };
}
//==============================================================================
