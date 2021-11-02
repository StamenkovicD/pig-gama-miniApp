/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, gamePlaying, previousRoll;





init();

function nextPlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;   
    roundScore = 0;
    var current_0 = document.getElementById("current-0").textContent = 0;
    var current_1 = document.getElementById("current-1").textContent = 0;


    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    document.querySelector(".dice").style.display = "none";
    document.querySelector(".dice_1").style.display = "none";
}

function init() {
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;

    document.querySelector(".dice").style.display = "none";
    document.querySelector(".dice_1").style.display = "none";

    document.getElementById("score-0").textContent = 0;
    document.getElementById("score-1").textContent = 0;
    document.getElementById("current-0").textContent = 0;
    document.getElementById("current-1").textContent = 0;
    document.getElementById('name-0').textContent = "Player 1";
    document.getElementById('name-1').textContent = "Player 2";
    document.querySelector('.player-0-panel').classList.remove('winner')
    document.querySelector('.player-1-panel').classList.remove('winner')
    document.querySelector('.player-0-panel').classList.remove('active')
    document.querySelector('.player-1-panel').classList.remove('active')
    document.querySelector('.player-0-panel').classList.add('active')
}





//event kada neko pritisne dugme(ROLL) 
document.querySelector(".btn-roll").addEventListener("click", function() {
    if(gamePlaying){
        var dice = Math.floor(Math.random() * 6) + 1;
        var dice_1 = Math.floor(Math.random() * 6) + 1;

        var diceDOM = document.querySelector(".dice");
        var diceDOM_1 = document.querySelector(".dice_1");
    

        //IF PLAYER HIT 2x 6, next player turn
        if(previousRoll === 6 && dice === 6) {
            nextPlayer()
            console.log("NEXT PLAYER TURN!");
        }

        previousRoll = dice;

        
        //prikazati rezultat
        diceDOM.style.display = "block";
        diceDOM_1.style.display = "block";

        diceDOM.src = "dice-" + dice + ".png"
        diceDOM_1.src = "dice-" + dice_1 + ".png"

        //Update round score ako je veci od 1
        if(dice !== 1 || dice_1 !==1) {
            roundScore = roundScore + (dice + dice_1);
            // roundScore =+ dice1
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else {
           nextPlayer();
        }
    }
});

//event kada pritisne dugme(HOLD)
document.querySelector('.btn-hold').addEventListener('click', function() {
    if(gamePlaying) {
        //add current score to global score
    scores[activePlayer] += roundScore;

    //update the UI 
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

    var input = document.querySelector('.final-score').value;
    var winScore;
    if (input) {
        winScore = input;
    } else {
        winScore = 100;
    }
    //Check if the player win the game
    if(scores[activePlayer] >= winScore) {
        document.querySelector('#name-' + activePlayer).textContent = "Winner!"; 
        document.querySelector('.dice').style.display = 'none';
        document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
        document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
        gamePlaying = false;
    } else {
    //next player
    nextPlayer();
    }   
    }
    
});

//event kada pritisne dugme(NEW)
document.querySelector('.btn-new').addEventListener('click', init);