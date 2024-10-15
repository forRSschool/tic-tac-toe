'use strict'
const restartButtonAudio = new Audio('./assets/audio/restart.mp3');
const gameOverAudio = new Audio('./assets/audio/game-over.mp3');
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
const steps = document.querySelector('.steps');
const settingsBtn = document.querySelector('.settings-btn');
const settingsModal = document.querySelector('.settings-modal');
const recordsBtn = document.querySelector('.records-btn');
const table = document.querySelector('.table');
const playerX = document.querySelector('.playerX');
const playerO = document.querySelector('.playerO');
const tableData = document.querySelector('.table-data');


let xInd = [];
let oInd = [];
let boxes = [];
let turn = 'x';
let xWin = false;
let oWin = false;
let endGame = false;
let results =localStorage.getItem('results')? [...JSON.parse(localStorage.getItem('results'))] : [];

for(let i = 0; i < 9; i++) {
    area.innerHTML += "<div class='box' pos=" + (i + 1) + "></div>";
}

boxes = document.querySelectorAll('.box');

function toVisible() {
  result.style.display = 'block';
  playAgain.style.display = 'block';
}

function gameEnd() {
  gameOverAudio && gameOverAudio.play();
  area.style.pointerEvents = 'none';
  steps.innerHTML = `steps: ${xInd.length}`;
  steps.style.display = 'block';
  toVisible();
  saveToLocalStorage();
}

function saveToLocalStorage() {
  const res = {
    playerX: playerX?.value || 'playerX',
    playerO:  playerO?.value || 'playerO',
    winner: xWin && 'X' || oWin && 'O' || 'Draw',
    steps: xInd.length
  }
  results.push(res)
  if(results.length > 10) {
    results.reverse();
    results.pop();
    results.reverse();
  }
  localStorage.setItem('results', JSON.stringify(results))
  showResults();
}

function showResults() {
  tableData.innerHTML = ''
  results.forEach(item => {
    const elem = document.createElement('div');
    elem.classList.add('table-item');
    elem.innerHTML += `<span>${item.playerX}</span> <span>${item.playerO}</span>  <span>${item.winner}</span> <span>${item.steps}</span>`
    tableData.append(elem)
  })
}
showResults();

function restart() {
  restartButtonAudio && restartButtonAudio.play();
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
  steps.style.display = 'none';
}

function changeTurn() {
  turn = 'x' === turn ? 'o' : 'x';
  if(turn === 'x') {
    turnBoxes[0].classList.add('active-box');
    turnBoxes[1].classList.remove('active-box');
  } else {
    turnBoxes[1].classList.add('active-box');
    turnBoxes[0].classList.remove('active-box');
  }
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

settingsBtn.addEventListener('click', () => {
  settingsModal.classList.toggle('active-modal');
})

recordsBtn.addEventListener('click', () => {
  table.classList.toggle('active-modal');
})

playAgain.addEventListener('click', restart)
boxes.forEach(item => {
  item.addEventListener('click', () => {
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
      } else if(oWin) {
        result.innerHTML = 'O win';
      } else if(!oWin && !xWin && xInd.length === 5 ) {
        result.innerHTML = 'Draw';
      }
      changeTurn();
    }
  })
})


