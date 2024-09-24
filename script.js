'use strict'
// const winIndex = [
//     [1,2,3],
//     [4,5,6],
//     [7,8,9],
//     [1,4,7],
//     [2,5,8],
//     [3,6,9],
//     [1,5,9],
//     [3,5,7]
// ];
const area = document.querySelector('.game-area');
const turnBoxes = document.querySelectorAll('.turn-box')
let boxes = [];
let turn = 'x';

for(let i = 0; i < 9; i++) {
    area.innerHTML += "<div class='box' pos=" + i + "></div>";
}

boxes = document.querySelectorAll('.box');

boxes.forEach(item => {
  item.addEventListener('click', () => {
    if(item.innerHTML === '') {
      item.innerHTML = turn
      changeTurn();
    }
  })
})

function changeTurn() {
  if(turn === 'x') {
    turnBoxes[1].classList.add('active-box');
    turnBoxes[0].classList.remove('active-box');
  } else {
    turnBoxes[0].classList.add('active-box');
    turnBoxes[1].classList.remove('active-box');
  }
  turn = 'x' === turn ? 'o' : 'x';
}


