'use strict'
const clickBoxAudio = new Audio('./audio/box-click.mp3');
const restartButtonAudio = new Audio('./audio/restart.mp3');
const gameOverAudio = new Audio('./audio/game-over.mp3')
const winIndex = [
    [1,2,3],
    [4,5,6],
    [7,8,9],
    [1,4,7],
    [2,5,8],
    [3,6,9],
    [1,5,9],
    [3,5,7]
];
const area = document.querySelector('.game-area');
const turnBoxes = document.querySelectorAll('.turn-box');
const result = document.querySelector('.result');
const playAgain = document.querySelector('.play-again');

let xInd = [];
let oInd = [];
let boxes = [];
let turn = 'x';
let xWin = false;
let oWin = false;
let endGame = false;

for(let i = 0; i < 9; i++) {
    area.innerHTML += "<div class='box' pos=" + (i + 1) + "></div>";
}

boxes = document.querySelectorAll('.box');

function toVisible() {
  result.style.display = 'block';
  playAgain.style.cssText = 'display: block;';
}
function gameEnd() {
  area.style.pointerEvents = 'none';
  gameOverAudio.play();
}
boxes.forEach(item => {
  item.addEventListener('click', () => {
    clickBoxAudio.play();
    if(item.innerHTML === '') {
      item.innerHTML = turn
      turn === 'x' ? xInd.push(Number(item.getAttribute('pos'))) : oInd.push(Number(item.getAttribute('pos')));
      xWin = checkWin(xInd);
      oWin = checkWin(oInd);
      if(xWin || oWin || xInd.length === 5) {
        gameEnd()
      }
      if(xWin) {
        result.innerHTML = 'X win';
        toVisible();
      } else if(oWin) {
        result.innerHTML = 'O win';
        toVisible();
      } else if(!oWin && !xWin && xInd.length === 5 ) {
        result.innerHTML = 'Draw';
        toVisible();
      }
      changeTurn();
    }
  })
})

function restart() {
  restartButtonAudio.play();
  boxes.forEach(item => {
    item.innerHTML = ''
  })
  xInd = [];
  oInd = [];
  turn = 'x';
  xWin = false;
  oWin = false;
  turnBoxes[0].classList.add('active-box');
  turnBoxes[1].classList.remove('active-box');
  playAgain.style.display = 'none';
  result.style.display = 'none';
   area.style.pointerEvents = '';
}

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

function checkWin(data) {
    for(let i in winIndex) {
        let win = true;
        for(let j in winIndex[i]) {
            let id = winIndex[i][j];
            let ind = data.indexOf(id);

            if(ind == -1) {
                win = false
            }
        }

        if(win) return true;
    }
    return false;
}

playAgain.addEventListener('click', restart)
