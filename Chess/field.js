
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
              td.className = 'black';                                              // Красим в церный в шахматном порядке
            }
            col++;                                                               // Счетчик для шахматного порядка цвета клеток
        }
        col--;
    }
    body.appendChild(tbl);                                                       // Вставляем таблицу в документ;
}
//==============================================================================

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

                                         // Стилизуем с окантовкой чтобы было видно на любом фоне
            td[j].classList.add('figure');
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
// Функция добавляет кнопки меню
//==============================================================================
function addmenu() {
    var element = document.createElement("input");
    element.setAttribute("type", "button");
    element.setAttribute("value", "Начальная расстановка");
    element.setAttribute("name", "button1");
    element.setAttribute("onclick", "initial(1)");
    document.body.appendChild(element);
    var element = document.createElement("input");
    element.setAttribute("type", "button");
    element.setAttribute("value", "Очистить доску");
    element.setAttribute("name", "button2");
    element.setAttribute("onclick", "initial(0)");
    document.body.appendChild(element);
}

//==============================================================================

//==============================================================================
// Функция рисует всплывающие подсказки
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

//==============================================================================
// Функция выделяет ячейку по клику - пока сырая((
//==============================================================================
function select () {

  var table = document.getElementsByTagName('table');
  window.addEventListener("load", function(){
      table[0].addEventListener("click", function(e){
          //e.target.innerHTML  = "";
                for(var i = 0; i < 10; i++){
                  var tr = table[0].getElementsByTagName('tr');                            // Получаем строки
                    for(var j = 0; j < 10; j++){
                      var td = tr[i].getElementsByTagName('td');                           // Получаем ячейки
                        td[j].classList.remove('click');
                    }
                }
          e.target.classList.add('click');
      });
  });

}
//==============================================================================
