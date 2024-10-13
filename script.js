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
const settingsModal = document.querySelector('.settings-modal')
const bgColor = document.querySelector('.background-color');
const mainColor = document.querySelector('.main-color');
const playerX = document.querySelector('.playerX');
const playerO = document.querySelector('.playerO');


let xInd = [];
let oInd = [];
let boxes = [];
let turn = 'x';
let xWin = false;
let oWin = false;
let endGame = false;
const results =localStorage.getItem('results')? [...JSON.parse(localStorage.getItem('results'))] : [];
console.log(results)

for(let i = 0; i < 9; i++) {
    area.innerHTML += "<div class='box' pos=" + (i + 1) + "></div>";
}

boxes = document.querySelectorAll('.box');
bgColor.value = '#252A34';
mainColor.value = '#DC143C';

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
  let res = {
    playerX: playerX?.value || 'playerX',
    playerO:  playerO?.value || 'playerO',
    winner: xWin && 'X' || oWin && 'O' || 'Draw',
    steps: xInd.length
  }
  results.push(res)
  localStorage.setItem('results', JSON.stringify(results))
  console.log(JSON.parse(localStorage.getItem('results')))
}

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
  turnBoxes[0].style.backgroundColor = mainColor.value;
  turnBoxes[1].style.backgroundColor = bgColor.value;
  playAgain.style.display = 'none';
  result.style.display = 'none';
  area.style.pointerEvents = '';
  steps.style.display = 'none';
}

function changeTurn() {
  if(turn === 'x') {
    turnBoxes[1].classList.add('active-box');
    turnBoxes[0].classList.remove('active-box');
  } else {
    turnBoxes[0].classList.add('active-box');
    turnBoxes[1].classList.remove('active-box');
  }
  if(turnBoxes[0].classList.contains('active-box')) {
    turnBoxes[0].style.backgroundColor = mainColor.value;
    turnBoxes[1].style.backgroundColor = 'inherit';
  } else {
    turnBoxes[1].style.backgroundColor = mainColor.value;
    turnBoxes[0].style.backgroundColor = 'inherit';
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

settingsBtn.addEventListener('click', () => {
  settingsModal.classList.toggle('active-modal');
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

bgColor.addEventListener('input', () => {
  document.body.style.backgroundColor = bgColor.value;
  turnBoxes.forEach(item => {
    if(!item.classList.contains('active-box')) {
      item.style.backgroundColor = bgColor.value;
    }
  })
})

mainColor.addEventListener('input', () => {
    playAgain.style.backgroundColor = mainColor.value;
    turnBoxes.forEach(item => {
      if(item.classList.contains('active-box')) {
        item.style.backgroundColor = mainColor.value;
      }
    })
    boxes.forEach(item => {
      item.addEventListener('mouseover', () => {
        item.style.backgroundColor = mainColor.value;
      })

      item.addEventListener('mouseout', () => {
        item.style.backgroundColor = 'inherit';
    });
    })
})
