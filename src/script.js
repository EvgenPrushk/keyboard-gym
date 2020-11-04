const letters = document.querySelectorAll('.letter');
const input = document.querySelector('input');
const textExample = document.querySelector('#textExample');


const text = 'Солнце - центральное тело Солнечной системы - представляет собою  горячий газовый шар. Оно в 750 раз превосходит по массе все остальные тела Солнечной системы вместе взятые. Именно поэтому всё в Солнечной системе можно приближенно считать вращающимся вокруг Солнца. Землю Солнце "перевешивает" в 330 000 раз. На солнечном диаметре можно было бы разместить цепочку из 109 таких планет, как наша. Солнце - ближайшая к Земле звезда, оно - единственная из звезд, чей видимый диск различим невооруженным глазом. Все остальные звезды, удаленные от нас на световые года, даже при рассмотрении в мощные телескопы, не открывают никаких подробностей своих поверхностей. Свет от Солнца  до  нас доходит за 8 с третью минут. По одной из гипотез, именно вместе с Солнцем образовалась наша планетная система, Земля, а затем и жизнь на ней.'

let printTextLength = 150;
showText(text);

// const text = [
//     "На переднем плане, прямо перед нами, расположен был дворик, где стоял",
//     "наполовину вычищенный автомобиль. Шофер Остин был на этот раз",
//     "уволен окончательно и бесповоротно. Он раскинулся на земле",
// ];

// const textDiv = textToDiv(text);
// // удаляем предыдущее содержимое
// textExample.innerHTML = "";
// textExample.append(textDiv);


// подсветка буквы
document.body.addEventListener('keydown', keydownHandler);
document.body.addEventListener('keypress', keypressHandler);
document.body.addEventListener('keyup', keyupHandler);

function keydownHandler(event) {
    // работаем по коллекции ключ - значение
    for (const letter of letters) {
        // textContent ( одно из св-в dom элемента) - то что находиться внутри тега
        //toUpperCase() - метод строки, который делает текст в верхнем регистре
        if (letter.textContent === event.key.toUpperCase()) {
            letter.classList.add('sel');
        }
    }
}

function keypressHandler(event) {
    input.value += event.key;
}

function keyupHandler(event) {
    for (const letter of letters) {
        // textContent ( одно из св-в dom элемента) - то что находиться внутри тега
        //toUpperCase() - метод строки, который делает текст в верхнем регистре
        if (letter.textContent === event.key.toUpperCase()) {
            letter.classList.remove('sel');
        }
    }
}

function textToDiv(array) {
    const div = document.createElement('div');

    for (const string of array) {
        const line = document.createElement('div');
        line.classList.add('line');
        line.textContent = string;
        // append вставляет в конец всех дочерник элементов
        div.append(line);
    }
    return div;

}

function showText(text, printTextLength) {
    // разбивка текста по словам разделенным пробелом
    const words = text.split(/\s/)

    const strings = [];

    let string = "";
    for (const word of words) {
               // составляем строки таким образом, чтобы их длина не привышала 79 символов
        if ((string + " "  + word).length >= 70) {
            strings.push(string)
            string = "";
        }
        string += word + " ";
    }
    if (!string) {
        strings.push(string);
    }
    for (let i = 0; i < strings.length; i++){
        // trim() удаляет пробельные символы в начале и в конце строки
        strings[i] = strings[i].trim() + '\n';
    }
    
    const showText = [];
    for (let i = 0; i < strings.length; i++) {
       if (printTextLength > 0) {
           printTextLength -= strings[i].length;
       }
       if (printTextLength <= 0) {
           showText.push(string);
       }
        
    }
}
1-02-33
