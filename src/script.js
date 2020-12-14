const letters = document.querySelectorAll(".letter");
const input = document.querySelector("input");
const textExample = document.querySelector("#textExample");

const text = ` астрономической точки зрения Солнце – только единица из множества, рядовая звезда среди миллиардов других звёзд. Тысячи из них, возможно, превосходят его блеском, величиной и мощностью. В армии неба Солнце – простой солдат.

Для нас, жителей планеты Земля, Солнце – это звезда совершенно нам необходимая. Без Солнца никого из нас просто бы не было. Солнце – это главный двигатель всех жизненных процессов, происходящих на Земле. Уничтожьте его лучи хотя бы на один месяц, — и жизнь на нашей планете прекратится.


Звезда по имени Солнце, сформировавшаяся из громадного облака водорода и звездной пыли, горит уже в течение 4,6 миллиарда лет. Она обладает достаточным запасом топлива, чтобы гореть ещё очень долго.

Итак, Солнце – это звезда. Главные параметры любой звезды это – масса, температура, светимость и возраст.

Возраст Солнца – 4,6 миллирда лет. Масса — в 327 тысяч раз больше массы Земли, а именно 1988920000000000000 миллиардов тонн. Температура солнечного ядра 15 миллиардов градусов по Цельсию. Светимость — 382700000000000000000 мегаватт.

Какова форма Солнца? Солнце — это огромный, горячий, газовый шар, состоящий в основном из водорода. Диаметр Солнца — 1 392 000 км. Среднее расстояние от Солнца до Земли около 149,6 миллионов километров.

Стоит ли Солнце, этот огромный газовый шар, на месте? Нет, не стоит. Вместе со всеми своими планетами, образующими Солнечную систему, Солнце движется в космическом пространстве относительно других звезд.

Что такое Солнечная система? Солнечная система – это связанная силами притяжения система (комплекс) небесных тел. В состав Солнечной системы входят: главная звезда – Солнце, восемь известных больших планет с их спутниками (в том числе и планета Земля со спутником Луна). А также малые планеты, кометы, метеориты; кроме того: космическая пыль, газ, мелкие частицы. В самом Солнце сосредоточено 99,8 % массы всей Солнечной системы.

Теплота и свет Солнца настолько велики, что для изучения свойств и характеристик небесного светила используются особые приборы и способы для наблюдения за его поверхностью.

Солнце — самая важная для людей звезда, которая обеспечивает и поддерживает жизнь на планете Земля.`

// массив текста для проверки
// const text = [
//     "На переднем плане, прямо перед нами, расположен был дворик, где стоял",
//     "наполовину вычищенный автомобиль. Шофер Остин был на этот раз",
//     "уволен окончательно и бесповоротно. Он раскинулся на земле,",
// ];

// const textDiv = textToDiv(text);
// // удаление содержимого
// textExample.innerHTML = "";
// textExample.append(textDiv);

let printTextLength = 1;
showText(text, printTextLength);

document.body.addEventListener("keydown", keydownHandler);
document.body.addEventListener("keypress", keypressHandler);
document.body.addEventListener("keyup", keyupHandler);

// функция будет происходить, когда будет происходить нажатие клавишы
function keydownHandler(event) {

    for (const letter of letters) {
        //  проверка, что находиться внутри тега и нажатой клавишы
        if (letter.textContent === event.key.toUpperCase()) {
            // при совпадении добавляем класс sel = подсветка
            letter.classList.add("sel");
        }
    }
};

function keypressHandler(event) {
    event.preventDefault();
    input.value += event.key;
}

// функция будет происходить, когда будет происходить отжатие клавишы
function keyupHandler(event) {
    for (const letter of letters) {
        //  проверка, что находиться внутри тега и отжатой  клавишы
        if (letter.textContent === event.key.toUpperCase()) {
            // при совпадении удаляем класс sel = подсветка
            letter.classList.remove("sel");
        }
    }
};

function showText(text, printTextLength) {
    // разбтвка текста по словам
    const words = text.split(/\s/);

    const strings = [];

    let string = [];
    for (const word of words) {
        // составляем строки, чтобы их длина не превышала 70 символов
        if ((string + word).length >= 70) {
            strings.push(string);
            // для начала новой строки
            string = "";
        }
        string += word + " ";
    }

    if (!string) {
        strings.push(string);
    }

    for (let i = 0; i < strings.length; i++) {
        // trim() удаляет пробельный символ в начале и конце строки
        strings[i] = strings[i].trim() + "\n";
    }

    const showStrings = [];   
    for (let i = 0; i < strings.length; i++) {
        if (printTextLength > 0) {
            printTextLength -= strings[i].length;           
        }

        if (printTextLength <= 0) {
            if (printTextLength < 0) {
                printTextLength += strings[i].length;   
            }

            showStrings.push(strings[i]);

            if (showStrings.length >= 3) {
                break;
            }
        }
    }
    

       // виртуальный DOM  сразу не вставляет DOM элемент
       const div = document.createElement("div");

       for (let i = 0; i < showStrings.length; i++) {
        const line = document.createElement("div");
        line.classList.add('line');
           if (i === 0) {
               const span = document.createElement("span");
               span.classList.add("done");
               span.textContent = showStrings[i].slice(0, printTextLength);
               line.append(span);
               line.append(showStrings[i].slice(printTextLength));
           }
           else{
               line.append(showStrings[i]);
           }
           div.append(line);
       }
       textExample.innerHTML = '';
       textExample.append(div);

       
       console.log(div);
       console.log(strings);
       console.log(showStrings, printTextLength);
}