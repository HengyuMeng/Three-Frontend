'use strict';

//begin my project
let rightNumber = Math.trunc(Math.random() * 20 + 1);
let score = 20;
let highestScore = 0;
//only for test
document.querySelector('.number').textContent = rightNumber.toString();

document.querySelector('.check').addEventListener('click',
    function ()
    {
        const guess = Number(document.querySelector('.guess').value);
        if (!guess)
        {
            document.querySelector('.message').textContent = 'no number!'
        }
        else if (guess>rightNumber)
        {

            if (score !== 0)
            {
                score--;
                document.querySelector('.score').textContent = score.toString();
                document.querySelector('.message').textContent = 'too high!';
            }
            else
            {
                document.querySelector('.message').textContent = 'you lose!';
            }

        }
        else if (guess<rightNumber)
        {

            if (score !== 0)
            {
                score--;
                document.querySelector('.score').textContent = score.toString();
                document.querySelector('.message').textContent = 'too low!';
            }
            else
            {
                document.querySelector('.message').textContent = 'you lose!';
            }
        }
        else
        {
            document.querySelector('.message').textContent = 'you are right!';
            if (score>highestScore)
            {
                highestScore = score;
            }
            document.querySelector('body').style.backgroundColor = '#60b347'
        }
        document.querySelector('.highscore').textContent = highestScore;
    });

document.querySelector('.again').addEventListener('click',
    function ()
    {
        score = 20;
        rightNumber = Math.trunc(Math.random() * 20 + 1);
        document.querySelector('.message').textContent = 'Start guessing...';
        document.querySelector('.number').textContent = '?';
        document.querySelector('.guess').value = '';
        document.querySelector('body').style.backgroundColor = '#222';
        document.querySelector('.number').style.width = '15rem';
    });
