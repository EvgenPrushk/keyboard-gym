const letters = document.querySelectorAll('.letter');
console.log(letters);
// подсветка буквы
document.body.addEventListener('keyup', keyupHandler);

function keyupHandler( ) {
    console.log('keyup');
}