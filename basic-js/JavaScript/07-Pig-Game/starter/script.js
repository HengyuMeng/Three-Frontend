'use strict';

const scoreElement0 = document.querySelector('#score--0');
const scoreElement1 = document.getElementById('score--1');
const currentScore0Element = document.querySelector('#current--0');
const currentScore1Element = document.querySelector('#current--1');
const diceElement = document.querySelector('.dice');
const playerElement0 = document.querySelector('.player--0');
const playerElement1 = document.querySelector('.player--1');
const buttonNew = document.querySelector('.btn--new');
const buttonRoll = document.querySelector('.btn--roll');
const buttonHold = document.querySelector('.btn--hold');
let playing = true;

let currentScore0 = 0;
let currentScore1 = 0;
let totalScore0 = 0;
let totalScore1 = 0;
let activatePlayer = 0;

scoreElement0.textContent = 0;
scoreElement1.textContent = 0;
diceElement.classList.add('hidden');


buttonNew.addEventListener('click',
    function () {
        playing = true;
        currentScore0 = 0;
        currentScore1 = 0;
        totalScore0 = 0;
        totalScore1 = 0;
        activatePlayer = 0;
        playerElement0.classList.add('player--active');
        playerElement1.classList.remove('player--active');
        playerElement0.classList.remove('player--winner');
        playerElement1.classList.remove('player--winner');
        currentScore0Element.textContent = currentScore0;
        currentScore1Element.textContent = currentScore1;
        scoreElement0.textContent = totalScore0;
        scoreElement1.textContent = totalScore1;

    })
buttonRoll.addEventListener('click',
    function () {
        if (playing === true) {
            diceElement.classList.remove('hidden');
            const dice = Math.trunc(Math.random() * 6) + 1;
            diceElement.src = `dice-${dice}.png`;

            if (dice !== 1) {
                if (activatePlayer === 0) {
                    currentScore0 += dice;
                    currentScore0Element.textContent = currentScore0;
                } else {
                    currentScore1 += dice;
                    currentScore1Element.textContent = currentScore1;
                }

            } else {
                if (activatePlayer === 0) {
                    currentScore0 = 0;
                    currentScore0Element.textContent = currentScore0;
                } else {
                    currentScore1 = 0;
                    currentScore1Element.textContent = currentScore1;
                }
                activatePlayer = activatePlayer === 0 ? 1 : 0;
                playerElement0.classList.toggle('player--active');
                playerElement1.classList.toggle('player--active');
            }
        }

    });

buttonHold.addEventListener('click',
    function () {
        if (playing === true) {
            if (activatePlayer === 0) {
                totalScore0 += currentScore0;
                if (totalScore0 > 100) {
                    playerElement0.classList.remove('player--active');
                    playerElement0.classList.add('player--winner');
                    playing = false;
                }
                currentScore0 = 0;
                currentScore0Element.textContent = currentScore0;
                scoreElement0.textContent = totalScore0;
            } else {
                totalScore1 += currentScore1;
                currentScore1 = 0;
                if (totalScore1 > 100) {
                    playerElement1.classList.remove('player--active');
                    playerElement1.classList.add('player--winner');
                    playing = false;
                }
                currentScore1Element.textContent = currentScore1;
                scoreElement1.textContent = totalScore1;
            }
            activatePlayer = activatePlayer === 0 ? 1 : 0;
            playerElement0.classList.toggle('player--active');
            playerElement1.classList.toggle('player--active');
        }
    })
