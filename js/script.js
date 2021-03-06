function computerPlay(){
    const num = Math.floor(Math.random() * 9) + 1;

    if(num <= 3) {
        return 'Rock';
    } else if (num <= 6 ) {
        return 'Paper';
    } else {
        return 'Scissors'
    }
}

function playRound(playerSelection, computerSelection){
    const playerSelectionLower = playerSelection.toLowerCase();
    const computerSelectionLower = computerSelection.toLowerCase();
    const playerSelectionFirstLetter = playerSelection.slice(0,1);
    const playerSelectionCapitalised = playerSelectionLower.replace(playerSelectionFirstLetter, playerSelectionFirstLetter.toUpperCase());

    if(playerSelectionLower === computerSelectionLower){
        return {points: 1, message: "There is a tie"};
    } else if(playerSelectionLower === 'rock' && computerSelectionLower === 'scissors' ) {
        return {points: 3, message: "You win, Rock beats Scissors"};
    } else if(playerSelectionLower === 'paper' && computerSelectionLower === 'rock' ) {
        return {points: 3, message: "You win, Paper beats Rock"};
    } else if(playerSelectionLower === 'scissors' && computerSelectionLower === 'paper' ) {
        return {points: 3, message: "You win, Scissors beats Paper"};
    } else {
        return {points: 0, message: `You Lose! ${computerSelection} beats ${playerSelectionCapitalised}`};
    }
}

const btns = document.querySelectorAll('#buttons>button');
const results = document.querySelector('#results');
const div = document.createElement('div');

let yourpoints = 0;
let compoints = 0;
let i = 0;

function updateScore(points){
    const yourscore = document.querySelector('.yourscore');
    const comscore = document.querySelector('.comscore');

    yourpoints += Number(points);
    yourscore.textContent = `${yourpoints}`;

    let compoint = 1;

    if(points === 0) {
        compoint = 3;
    } else if(points === 3) {
        compoint = 0;
    } 

    compoints += compoint;
    comscore.textContent = `${compoints}`;
}

function play() {
    const computerSelection = computerPlay();
    const roundresult = playRound(this.id, computerSelection);
    
    updateScore(roundresult.points);
    const p = document.createElement('p');
    p.textContent = `Round ${++i}: ${roundresult.message}`;
    div.appendChild(p);

    const h2 = document.createElement('h2');
    
    //Only Display winner when there is no tie
    if(yourpoints >= 5 && yourpoints !== compoints) {
        h2.textContent = `Congratulations! You Win with a score of ${yourpoints}`;
        h2.setAttribute('style', 'color: green');
        playAgain();
    } else if(compoints >=5 && yourpoints !== compoints) {
        h2.textContent = `Oh Sorry, computer wins with a score of ${compoints}`;
        h2.style.color = "red";
        playAgain();
    }

    div.appendChild(h2);

}

function playAgain() {
    const playBtn = document.createElement('button');
    playBtn.textContent = 'Play Again';
    playBtn.classList.add('btn');
    results.appendChild(playBtn);

    btns.forEach(btn => {
         btn.removeEventListener('click', play);
    })

    playBtn.addEventListener('click', clearScreen);
}

function clearScreen() {
    location.reload();
}

function game() {   
    btns.forEach(btn => {
        btn.addEventListener('click', play );
        btn.classList.add('btn')
    });

    results.appendChild(div);
}

game();