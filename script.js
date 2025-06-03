'use strict';

let player0 = document.querySelector('.player--0');
let player1 = document.querySelector('.player--1');

let player0CurrentScore = 0;
let player0TotalScore = 0;
let player1CurrentScore = 0;
let player1TotalScore = 0;

let player0CurrentScoreEl = document.querySelector('#current--0');
let player0TotalScoreEl = document.querySelector('#score--0');
let player1CurrentScoreEl = document.querySelector('#current--1');
let player1TotalScoreEl = document.querySelector('#score--1');

let dice = document.querySelector('.dice');
let rollButton = document.querySelector('.btn--roll');
let holdButton = document.querySelector('.btn--hold');
let newGameButton = document.querySelector('.btn--new');

let isPlayer0sTurn = true;

const rollDice = function() {
  return Math.trunc(Math.random()*6) + 1; 
}

function rollButtonCallback() {
  const number = rollDice();
  const imageFileName = `dice-${number}.png`;

  dice.setAttribute('src', imageFileName);
  dice.style.display = 'block';

  if (isPlayer0sTurn) {
    if (number !== 1) {
      player0CurrentScore += number;
      player0CurrentScoreEl.textContent = player0CurrentScore;
    } else {
      player0CurrentScore = 0;
      player0CurrentScoreEl.textContent = player0CurrentScore;
      isPlayer0sTurn = false;
      player0.classList.remove('player--active');
      player1.classList.add('player--active');
    }
  } else {
    if (number !== 1) {
      player1CurrentScore += number;
      player1CurrentScoreEl.textContent = player1CurrentScore;
    } else {
      player1CurrentScore = 0;
      player1CurrentScoreEl.textContent = player1CurrentScore;
      isPlayer0sTurn = true;
      player1.classList.remove('player--active');
      player0.classList.add('player--active');
    }
  }
}

function holdButtonCallback() {
  if (isPlayer0sTurn) {
    player0TotalScore += player0CurrentScore;
    player0TotalScoreEl.textContent = player0TotalScore;
    player0CurrentScore = 0;
    player0CurrentScoreEl.textContent = player0CurrentScore;

    if (player0TotalScore >= 100) {
      player0.classList.add('player--winner');
      rollButton.removeEventListener('click', rollButtonCallback)
      rollButton.removeEventListener('click', holdButtonCallback)
    } else {
      isPlayer0sTurn = false;
      player0.classList.remove('player--active');
      player1.classList.add('player--active');
    }
  } else {
    player1TotalScore += player1CurrentScore;
    player1TotalScoreEl.textContent = player1TotalScore;
    player1CurrentScore = 0;
    player1CurrentScoreEl.textContent = player1CurrentScore;


    if (player1TotalScore >= 100) {
      player1.classList.add('player--winner');
      rollButton.removeEventListener('click', rollButtonCallback)
      rollButton.removeEventListener('click', holdButtonCallback)
    } else {
      isPlayer0sTurn = true;
      player0.classList.add('player--active');
      player1.classList.remove('player--active');
    }
  }
}

dice.style.display = 'none';

rollButton.addEventListener('click', rollButtonCallback)
holdButton.addEventListener('click', holdButtonCallback)

newGameButton.addEventListener('click', function() {
  player0CurrentScore = 0;
  player1CurrentScore = 0;
  
  player0CurrentScoreEl.textContent = player0CurrentScore;
  player1CurrentScoreEl.textContent = player1CurrentScore;

  player0TotalScore = 0;
  player1TotalScore = 0;

  player0TotalScoreEl.textContent = player0TotalScore;
  player1TotalScoreEl.textContent = player1TotalScore;

  rollButton.addEventListener('click', rollButtonCallback)
  holdButton.addEventListener('click', holdButtonCallback)

  isPlayer0sTurn = true;

  player0.classList.add('player--active');
  player1.classList.remove('player--active');

  if (player0.classList.contains('player--winner')) {
    player0.classList.remove('player--winner');
  } else if (player1.classList.contains('player--winner')) {
    player1.classList.remove('player--winner');
  }
})