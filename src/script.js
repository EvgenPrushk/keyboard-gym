const input = document.querySelector("input");
// для преобразования node list в массив используем метод Array.from()
const letters = Array.from(document.querySelectorAll("[data-letters]"));

const specs = Array.from(document.querySelectorAll("[data-spec]"));

const text = 'В начале XIII в. в Центральной Азии возникло новое государство - Монгольская империя. Объединение монгольских племен в немалой степени было вызвано изменением климатических условий местности, где проживали монголы. XI и XII вв. были благоприятными для монголов. Длительный период влажных лет в восточной степи привел к тому, что умножились стада, а, следовательно, одна и та же территория могла прокормить больше людей. Произошло увеличение населения в Монголии. Однако в конце XII в. климат стал постепенно меняться в сторону ухудшения, стал более засушливым. Кочевое скотоводство стало малопродуктивным, в степи стало много избыточного населения. Началась обычная в таких условиях борьба с соседями за пастбища, а также вторжения на земли соседей-земледельцев.'

const party = createParty(text);
console.log(party);

init();

function init() {
    input.addEventListener("keydown", keydownHandler);

    input.addEventListener("keyup", keyupHandler);
}

//функция будет происходить, когда будет происходить нажатие клавишы
function keydownHandler(event) {
    event.preventDefault();
    //   В  атрибуте dataset  ищем  подстраку в строке используя метод includes()
    const letter = letters.find((x) => x.dataset.letters.includes(event.key));

    if (letter) {
        letter.classList.add('pressed');
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
        press(event.key);
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
   const string = party.strings[party.currentStringIndex];
   mustLettetr = party[party.currentPressedIndex];

}

function viewUpdate(text) {
    
}