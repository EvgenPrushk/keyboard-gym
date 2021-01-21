const input = document.querySelector("input");
// для преобразования node list в массив используем метод Array.from()
const letters = Array.from(document.querySelectorAll("[data-letters]"));

const specs = Array.from(document.querySelectorAll("[data-spec]"));

const textExample = document.querySelector('#textExample');

const symbolsPerMinute = document.querySelector('#symbolsPerMinute');
const errorPercent = document.querySelector('#errorPercent');

const text = 'В начале XIII в. в Центральной Азии возникло новое государство - Монгольская империя. Объединение монгольских племен в немалой степени было вызвано изменением климатических условий местности, где проживали монголы. XI и XII вв. были благоприятными для монголов. Длительный период влажных лет в восточной степи привел к тому, что умножились стада, а, следовательно, одна и та же территория могла прокормить больше людей. Произошло увеличение населения в Монголии. Однако в конце XII в. климат стал постепенно меняться в сторону ухудшения, стал более засушливым. Кочевое скотоводство стало малопродуктивным, в степи стало много избыточного населения. Началась обычная в таких условиях борьба с соседями за пастбища, а также вторжения на земли соседей-земледельцев.'

const party = createParty(text);


init();

function init() {
    input.addEventListener("keydown", keydownHandler);
    input.addEventListener("keyup", keyupHandler);

    viewUpdate();
}

//функция будет происходить, когда будет происходить нажатие клавишы
function keydownHandler(event) {
    event.preventDefault();
    //   В  атрибуте dataset  ищем  подстраку в строке используя метод includes()
    const letter = letters.find((x) => x.dataset.letters.includes(event.key));

    if (letter) {
        letter.classList.add('pressed');
        press(event.key);
        return;
    }

    let key = event.key.toLowerCase();

    if (key === " ") {
        key = "space";
        press(' ');
    }
    
    if (key === 'enter') {
        press('\n');
    }

    const ownSpecs = specs.filter((x) => x.dataset.spec === key);

    if (ownSpecs.length) {
        ownSpecs.forEach((spec) => spec.classList.add("pressed"));
        return;
    }

    console.warn("Неизвестный вид клавишы", event);
}

function keyupHandler(event) {
    event.preventDefault();

    const letter = letters.find((x) => x.dataset.letters.includes(event.key));

    if (letter) {
        letter.classList.remove('pressed');        
        return;
    }

    let key = event.key.toLowerCase();

    if (key === " ") {
        key = "space";
    }

    const ownSpecs = specs.filter((x) => x.dataset.spec === key);

    if (ownSpecs.length) {
        ownSpecs.forEach((spec) => spec.classList.remove("pressed"));
        return;
    }
}

function createParty(text) {
    const party = {
        text,
        strings: [],
        maxStringLenght: 70,
        maxShowStrings: 3,
        currentStringIndex: 0,
        currentPressedIndex: 0,
        errors: [],
        started: false,

        statisticFlag: false,
        timerCounter:0,
        startTimer: 0,        
        errorCounter: 0,
        commonCounter: 0,
    };
    // заменим все концы строки на конец строки и пробел
    party.text = party.text.replace(/\n/g, '\n ');
    //разобъем слова по сеппаратору пробел
    const words = party.text.split(" ");

    let string = [];
    for (const word of words) {
        // копируем всю строку, которая должна быть сформирована к этому моменту
        // с помощью ... и в конец добавляем word  и объединяем с поощью пробела
        const newStringLenght = [...string, word].join(" ").length + !word.includes("\n");

        if (newStringLenght > party.maxStringLenght) {
            party.strings.push(string.join(" ") + " ");
            string = [];
        }

        string.push(word);

        if (word.includes("\n")) {
            party.strings.push(string.join(" "));
            string = [];
        }
    }

    if (string.length) {
        party.strings.push(string.join(" "));
    }

    return party;
}

function press(letter) {
    party.started = true;
    if (!party.statisticFlag) {
        party.statisticFlag = true; 

        party.startTimer = Date.now();
    }

    // в string храниться текущая строчка 
    const string = party.strings[party.currentStringIndex];
    // выбираем символ, которые должны напечатать
    const mustLetter = string[party.currentPressedIndex];   
    
    if (letter === mustLetter) {
        party.currentPressedIndex++;

        if (string.length <= party.currentPressedIndex) {
            party.currentPressedIndex = 0;
            party.currentStringIndex++;
            // в конце строки делаем флаг false
            party.statisticFlag = false;
            // разница между тещим временем и начальным временем
            party.timerCounter = Date.now() - party.startTimer;
        }
    }  else if (!party.errors.includes(mustLetter)) {
        party.errors.push(mustLetter);
        party.errorCounter++;
    }

    party.commonCounter++;

    viewUpdate();
}


function viewUpdate() {
    const string = party.strings[party.currentStringIndex];
    // делаем копию массива среди всех элементов которые у него есть начиная с
    // текущей строки заканчивая тем колличеством, которое у нас должно быть в текущей строке
    const showedStrings = party.strings.slice(
        party.currentStringIndex,
        party.currentStringIndex + party.maxShowStrings
    );

    const div = document.createElement('div');

    const firstLine = document.createElement('div');
    firstLine.classList.add('line');
    div.append(firstLine);

    const done = document.createElement('span');
    done.classList.add('done');
    done.textContent = string.slice(0, party.currentPressedIndex);
    // добавдляем done в firstLine добавляем span c классом done
    // который содержит текст, которые мы успели напечатать
    // все оставшееся попадет посимвольно после этого
    firstLine.append(
        done,
        ...string
            .slice(party.currentPressedIndex)
            .split("")
            .map((letter) => { 
                if (letter === " ") {
                    return ".";
                } 

                if (letter === "\n") {
                    return "¶";
                }
                
                if (party.errors.includes(letter)) {
                    const errorSpan = document.createElement('span');
                    errorSpan.classList.add('hint');
                    errorSpan.textContent = letter;
                    return errorSpan;
                }

                return letter;
            })
    );

    for (let i = 1; i < showedStrings.length; i++) {
        const line = document.createElement('div');
        line.classList.add('line');
        div.append(line);

        line.append(           
            ...showedStrings[i]                
                .split("")
                .map((letter) => {
                    if (letter === " ") {
                        return ".";
                    } 
    
                    if (letter === "\n") {
                        return "¶";
                    }
                    
                    if (party.errors.includes(letter)) {
                        const errorSpan = document.createElement('span');
                        errorSpan.classList.add('hint');
                        errorSpan.textContent = letter;
                        return errorSpan;
                    }
    
                    return letter;
                })
        );
    }

    textExample.innerHTML = '';
    textExample.append(div);

    input.value = string.slice(0, party.currentPressedIndex);

    if (!party.statisticFlag && party.started) {
         symbolsPerMinute.textContent = Math.round(
            (60000 * party.commonCounter) / party.timerCounter
        );
        errorPercent.textContent = 
        Math.floor((10000 * party.errorCounter) / party.commonCounter / 100) + '%';
        
     }
}



