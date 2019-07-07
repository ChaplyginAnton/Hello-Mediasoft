//alert('Hello Mediasoft!')
let tolerance=['1','2','3','4','5','6','7','8','9','0','.','+','-','*','/','(',')']; // Массив допустимых значений
let mistake=''                                                                      // Переменная со значениями ошибочных символов

function contains(arr, elem) {                                                      // Функция определяет есть ли в массиве указанный элемент
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === elem) {
            return true;
        }
    }
    return false;                                                                   // в случае не обнаружения элемента функция возвращает Ложь
}

function limit(formula) {                                                           // Функция проверяет каждый элемент строки на соответсвие допустимым значениям
  mistake='Недопустимые символы:'
  for (i = 0; i < formula.length; i++) {
    if (contains(tolerance,formula[i])===false) {
      mistake=mistake+' '+formula[i]                                               // и склеивает все ошибки в строку
  }
}

if ( mistake.length>21 ) {                                                        // в случае обнаружения ошибок функция возвращает Ложь и выводит список ошибок
  alert(mistake);
  return(false);
}
else {
  return(true);
}

}

function double(formula) {                                                        // Функция проверки на двойной символ
  for (i = 0; i < formula.length; i++) {
    if (formula[i]==formula[i+1]&&(formula[i]=='+'||formula[i]=='-'||formula[i]=='*'||formula[i]=='/'||formula[i]=='('||formula[i]==')')) {
      alert('Ошибка - двойной символ'+formula[i]);
      return(false);
  }
}
return(true);
}

let result='Введите формулу';
let def=''
while (true) {
  let f=prompt(result,def);                                                       // Основная функция ввода строки в калькулятор

  if (limit(f)&&double(f)) {                                                          // Проверка строки на соответсвие условиям формулы
    def=eval(f);                                                                 // Вычисление строки
    result=f+'='+def;                                                            // Память предыдущей операции
  }

}
