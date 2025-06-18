let place = document.getElementById('textHere');
let inputt = 0;
let a = 0;


let area = document.getElementById('inputt');  // сохранение в локальную переменную
area.value = localStorage.getItem('area');
setInterval(() => localStorage.setItem('area', area.value), 2000);


function chistka(){
  area.value = '';
}

  
function getInput(){ //функция для получения выделенного текста
  inputt = document.getElementById('inputt');
  if (inputt == 0){ //проверка на пустой input
    return;
  }
  a = String(inputt.value.slice(inputt.selectionStart, inputt.selectionEnd)) ; //получение выделенного текста
  return a;
}



document.getElementById('todownloadHTML').onclick = function() { //функция для сохранения текста кода в виде html-страницы
  let text = "<DOCTYPE! html> \n<html>\n<body> \n" + document.getElementById('inputt').value + '\n</body>\n</html>';
  let myData = 'data:application/html;charset=utf-8,' + encodeURIComponent(text);
  this.href = myData;
  this.download = 'data.html';
  // console.log(text);
}

document.getElementById('todownloadText').onclick = function() { //функция для сохранения текста кода в виде html-страницы
  let text = document.getElementById('inputt').value;
  let myData = 'data:application/txt;charset=utf-8,' + encodeURIComponent(text);
  this.href = myData;
  this.download = 'data.txt';
  // console.log(text);
}




function uTag() { //добавление тега подчеркивания (u) к выделенному тексту в input
  getInput();
  if (a == 0){ //проверка на пустое выделение
    return;
  }
  // console.log(a[0], a[a.length - 1]); проверка
    if ((a.slice(0,3) == '<u>') && (a.slice(a.length -4) == '</u>')){ // отмена тега (проверка, если вставляемы символ(тег) уже применен)
      return inputt.setRangeText(`${a.slice(3, -4)}`);
    }
    // console.log((a.slice(0,3) + '__' + a.slice(a.length -4))); проверка
    return inputt.setRangeText(`<u>${a}</u>`);
}


function bTag() { //добавление тега жирного (b) к выделенному тексту в input
  getInput();
  if (a == 0){ //проверка на пустое выделение
    return;
  }
  // console.log(a[0], a[a.length - 1]);
    if ((a.slice(0,3) == '<b>') && (a.slice(a.length -4) == '</b>')){ // отмена тега (проверка, если вставляемы символ(тег) уже применен)
      return inputt.setRangeText(`${a.slice(3, -4)}`);
    }
    // console.log((a.slice(0,3) + '__' + a.slice(a.length -4))); проверка
    return inputt.setRangeText(`<b>${a}</b>`);
}

function iTag() { //добавление тега курсива (i) к выделенному тексту в input
  getInput();
  if (a == 0){ //проверка на пустое выделение
    return;
  }
  // console.log(a[0], a[a.length - 1]);
    if ((a.slice(0,3) == '<i>') && (a.slice(a.length -4) == '</i>')){ // отмена тега (проверка, если вставляемы символ(тег) уже применен)
      return inputt.setRangeText(`${a.slice(3, -4)}`);
    }
    // console.log((a.slice(0,3) + '__' + a.slice(a.length -4))); проверка
    return inputt.setRangeText(`<i>${a}</i>`);
}

function delTag() { //добавление тега зачеркивания (del) к выделенному тексту в input
  getInput();
  if (a == 0){ //проверка на пустое выделение
    return;
  }
  // console.log(a[0], a[a.length - 1]);
    if ((a.slice(0,5) == '<del>') && (a.slice(a.length -6) == '</del>')){ // отмена тега (проверка, если вставляемы символ(тег) уже применен)
      return inputt.setRangeText(`${a.slice(5, -6)}`);
    }
    // console.log((a.slice(0,5) + '__' + a.slice(a.length -6))); проверка
    return inputt.setRangeText(`<del>${a}</del>`);
}

function vivod(){ //функция вывода на страницу
  getInput();
  return textHere.innerHTML = inputt.value;//output as html
  //return textHere.innerText = inputt.value;
  //output as text
}


function getNums(){ //фкнкция для получения кол-ва строк и столбцов
  let rows = +prompt("Введите кол-во строк");
  while (!Number.isFinite(rows)) { //проверка на введение числа
    rows = +prompt("Введите кол-во строк (ЧИСЛО)");
  }

  let columns = +prompt("Введите кол-во столбцов");
  while (!Number.isFinite(columns)) { //проверка на введение числа
    columns = +prompt("Введите кол-во столбцов (ЧИСЛО)");
  }
  return [rows, columns];
}




document.getElementById('createTable').addEventListener("click", () => { //функция для отрисовывания таблицы

  let params = getNums();//получение параметров
  let rows = params[0];
  let colums = params[1];

  getInput();

  let widthTab = document.getElementById('borderWidth').value? document.getElementById('borderWidth').value : 1 ; //получение ширины границы таблицы
  let colorTab = document.getElementById('borderColor').value? document.getElementById('borderColor').value : 'black'; // получение цвета границы

  if ((rows == 0)||(colums == 0)){ //проверка на коррекрный ввод сичла колонок и столбцов
    return 0;
  }

  // проверка 
  // console.log(rows + '__' + colums);

  inputt.value += `\n<table style = 'border-collapse: collapse; border: ${widthTab}px solid ${colorTab}'> <!-- Начало таблицы -->`; //отрисовка таблицы
  inputt.value += '\n<caption>Название вашей таблицы</caption>';
  for (i = 0; i < rows; i++){
      inputt.value += `\n<tr>  <!-- строка ${i+1} -->`;
      for(j = 0; j < colums; j++){
          inputt.value += `\n<td style = 'border-collapse: collapse; border: ${widthTab}px solid ${colorTab}'>Место для вашего текста</td> <!-- ячейка ${j+1} -->`;
      }
      inputt.value += '\n</tr>';
  }
  inputt.value += '\n</table> <!-- Конец таблицы -->';
});




document.getElementById('createP').addEventListener("click", () => { //функция для оформления абзаца
    getInput();

    let textSize = document.getElementById('textSize').value? document.getElementById('textSize').value: 16; // запрос размера шрифта
    let textColor = document.getElementById('textColor').value? document.getElementById('textColor').value: 'black'; // запрос цвета текста

    inputt.value += `\n<p style = 'font-size: ${textSize}px; color: ${textColor}'></p> <!-- Между тегами вводите текст абзаца -->`; // отрисовка абзаца
});






document.getElementById('createList').addEventListener("click", () => { //функция для оформления списка
  getInput();
  let kolvo = +prompt('Сколько элементов в вашем списке?'); //запрос кол-ва элеметов в списке (и проверка на число)
  while (!Number.isFinite(kolvo)) {
    kolvo = +prompt("Сколько элементов в вашем списке? (ЧИСЛО)");
  }

  let listType = document.querySelector('input[name="ulOrOl"]:checked').id; //получение типа списка

  inputt.value += '\n<h3>Название вашего списка</h3>  <!-- Начало списка -->'; //отрисовка списка
  inputt.value += `\n<${listType}>`;
  for(let i = 0; i < kolvo; i++){
      inputt.value += `\n<li>Место для вашего текста</li> <!-- ${i+1} элемент списка -->`;
  }
  inputt.value += `\n</${listType}> <!-- Конец списка -->`;
});





document.getElementById('createH1').addEventListener("click", () => { //функция для оформления заголовка

  getInput();

  let h1Color = document.getElementById('h1Color').value? document.getElementById('h1Color').value : 'black';
  let h1Weight = document.getElementById('h1Weight').value? document.getElementById('h1Weight').value: 1;

  inputt.value += `\n<h${h1Weight} style  = 'color: ${h1Color}'></h${h1Weight}> <!-- Между тегами вводите текст заголовка -->`;
});





  