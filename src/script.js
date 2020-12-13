const letters = document.querySelectorAll(".letter");
const input = document.querySelector("input");

// массив текста для проверки
const text = [
    "На переднем плане, прямо перед нами, расположен был дворик, где стоял",
    "наполовину вычищенный автомобиль. Шофер Остин был на этот раз",
    "уволен окончательно и бесповоротно. Он раскинулся на земле,",
];

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

function textToDiv(array) {
    
}

// <div>
// 				<div class="line">
// 					<span class="done"> На переднем плане, прямо перед</span>
// 					<span class="hint">н</span>ами, расположен был дворик, где стоял
// 				</div>
// 				<div class="line">
// 					наполовину вычищенный автомобиль. Шофер Остин был на этот раз
// 				</div>
// 				<div class="line">
// 					уволен окончательно и бесповоротно. Он раскинулся на земле,
// 				</div>
// 			</div>	