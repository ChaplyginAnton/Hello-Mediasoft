//alert('Hello Mediasoft!')
let tolerance=['1','2','3','4','5','6','7','8','9','0','.','+','-','*','/','(',')']; // Массив допустимых значений
let numbers=['1','2','3','4','5','6','7','8','9','0'];                               // Массив чисел
let operate=['+','-','*','/',];                                                      // Массив операций
let mistake='';                                                                  // Переменная со значениями ошибочных символов
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
function limit(formula) {                                                           // Функция проверяет каждый элемент строки на соответсвие допустимым значениям
  mistake='Недопустимые символы:'
  for (i = 0; i < formula.length; i++) {
    if (contains(tolerance,formula[i])==false) {
      mistake=mistake+' '+formula[i]                                               // и склеивает все ошибки в строку
    }
}

  if ( mistake.length>21 ) {                                                        // в случае обнаружения ошибок функция возвращает Ложь и выводит список ошибок
    alert(mistake);
    return false;
  }
  else {
    return true;                                                                  // в случае не обнаружения ошибок функция возвращает Истину
  }

}
//==============================================================================
function sintax(formula) {                                                        // Функция проверки на некорректное сочетание символов
  for (i = 0; i < formula.length; i++) {
    if (formula[i]=='.'&&contains(numbers,formula[i+1])==false) {
      alert('Ошибка - пропущена дробная часть: '+formula[i]+formula[i+1]);
      return false;                                                                // в случае обнаружения ошибки функция возвращает Ложь и выводит ошибку
    }
    if (contains(numbers,formula[i])==true&&formula[i+1]=='(') {
      alert('Ошибка - некорректное сочетание символов: '+formula[i]+formula[i+1]);
      return false;                                                                  // в случае обнаружения ошибки функция возвращает Ложь и выводит ошибку
    }
    if (contains(operate,formula[i])==true&&(contains(operate,formula[i+1])==true||formula[i+1]==')')) {
      alert('Ошибка - некорректное сочетание символов: '+formula[i]+formula[i+1]);
      return false;                                                                  // в случае обнаружения ошибки функция возвращает Ложь и выводит ошибку
    }
    if (formula[i]==')'&&(contains(numbers,formula[i+1])==true||formula[i+1]=='('||formula[i+1]=='.')) {
      alert('Ошибка - некорректное сочетание символов: '+formula[i]+formula[i+1]);
      return false;                                                                // в случае обнаружения ошибки функция возвращает Ложь и выводит ошибку
    }
    if (formula[i]=='('&&(contains(operate,formula[i+1])==true||formula[i+1]==')'||formula[i+1]=='.')) {
      alert('Ошибка - некорректное сочетание символов: '+formula[i]+formula[i+1]);
      return false;                                                               // в случае обнаружения ошибки функция возвращает Ложь и выводит ошибку
    }
  }
return true;                                                                                // в случае не обнаружения ошибок функция возвращает Истину
}
//==============================================================================
function hooks(formula) {                                                            // Функция проверки на некорректную расстановку скобок
  let count=0;                                                                     // Счетчик скобок
  for (i = 0; i < formula.length; i++) {
    if (formula[i]=='(') {
      count++;                                                                   // Если открывается скобка, то счетчик увеличивается
    }
    if (formula[i]==')') {                                                         // Если закрывается скобка, то счетчик уменьшается
      count--;
    }
    if (count<0) {                                                                // И ни в один момент количество закрытых не должно превышать!
      alert('Ошибка - некорректная постановка скобки в '+i+' символе');
      return false;                                                                // в случае обнаружения ошибки функция возвращает Ложь и выводит ошибку
    }
  }
  if (count!=0) {                                                                 // Количество открытых и закрытых скобок должно совпадать
    alert('Ошибка - нехватает '+count+' скобки(ок)');
    return false;                                                                  // в случае обнаружения ошибки функция возвращает Ложь и выводит ошибку
  }
  return true;                                                                         // в случае не обнаружения ошибок функция возвращает Истину
}
//==============================================================================
// Начало основной программы:
//==============================================================================
let result='Введите формулу';
let def='';

while (true) {
  let calculate=prompt(result,def);                                                       // Основная функция ввода строки в калькулятор

  if (limit(calculate)&&sintax(calculate)&&hooks(calculate)) {                                                          // Проверка строки на соответсвие условиям формулы
    def=eval(calculate);                                                                 // Вычисление строки
    result=calculate+'='+def;                                                            // Память предыдущей операции
  }
  else {
    def=calculate;                                                                       // Сохранение набранного ошибочного значения для дальнейшего редактирования
  }

}
