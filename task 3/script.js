//==============================================================================
// Первая часть: Средний возраст (age) актеров, которые снимались в фильмах режиссера(director), которые не получили оскар (oscarCount)
//==============================================================================
let avage = 0;                                                                   // Начальное значение суммы возрастов
let actCount = 0;
                                                                                 // Начальное значение количества актеров

  films.forEach(function(film) {                                                 // Необходима проверка каждого фильма в массиве
    if (film.director.oscarsCount == 0) {                                        // на количество оскаров у режиссера
      avage = film.actors.reduce(function(age,actor) {                             // Необходима информация о возрасте каждого актера в массиве
        actCount++;                                                              // Количество "таких" актеров
        return age + actor.age;                                                  // Сумма возрастов каждого такого актера
      },avage);
    }
  });

avage=avage/actCount;                                                            // Вычисление среднего возраста
avage=Math.round(avage);                                                         // Округление результата
alert('Средний возраст (age) актеров, которые снимались в фильмах режиссера(director), которые не получили оскар (oscarCount) = ' + avage);
//==============================================================================
// Вторая часть: Имена всех актеров, которые играли с Томом Хэнксом, в фильмах после 1995 года
//==============================================================================
let names = [];                                                                  // Создание пустого массива с именами
let find = '';                                                                   // Создание пустой строки с именами

function Tom(actor) {                                                            // Функция для нахождения Тома Хенкса)
  return actor.name == 'Tom Hanks';
}

 films.forEach(function(film) {                                                  // Необходима проверка каждого фильма в массиве
   if (film.creationYear > 1995 && film.actors.some(Tom)) {                      // на условие после 1995 года и если среди актеров есть Том
       names = names.concat(film.actors.map(function(actor) {                    // Необходима проверка каждого актера в массиве
         if (actor.name != 'Tom Hanks' && names.indexOf(actor.name) == -1) {     // что он собственно не Том и не был записан в массив ранее
           return actor.name;                                                    // запись актера в массив
         }
       }));
   }
 });

 names = names.filter (function(name) {                                          // Функция для удаления неопределенных элементов массива после MAP
  return name != undefined;
 })

find = names.join(', ');                                                         // нужно для удобства - с пробелом более читаемо
alert('Имена всех актеров, которые играли с Томом Хэнксом, в фильмах после 1995 года: ' + find);
 //==============================================================================
 // Третья часть: Общий бюджет (сумма) фильмов, с режиссерами младше 70 лет и в которых не играл Том Хэнкс.
 //==============================================================================
let money = 0;                                                                   // Начальное значение общего бюджета
let budget = '';                                                                 // Создание пустой строки с бюджетом (для преобразований)
let bank = [];                                                                   // Создание пустого массива с бюджетом (для преобразований)

 films.forEach(function(film) {                                            // Необходима проверка каждого фильма в массиве
   if (film.director.age < 70 && film.actors.some(Tom) == false) {               // на условие с режиссерами младше 70 лет и в которых нет Тома(...
      budget = film.budget.substr(1);                                            // Удаляем $ в начале строки
      bank = budget.split(' ');                                                  // преобразуем в массив с удалением пробелов
      budget = bank.join('');                                                    // преобразуем этот массив в строку
      money = money + +budget;                                                   // конвертируем все в деньги - Общий бюджет
   }
 });

 alert('Общий бюджет (сумма) фильмов, с режиссерами младше 70 лет и в которых не играл Том Хэнкс: $' + money);
