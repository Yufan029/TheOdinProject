const rock = `rock`;
const paper = `paper`;
const scissors = `scissors`;
let humanScore = 0;
let computerScore = 0;

const options = [rock, paper, scissors];

// function getHumanChoice() {
//     let humanChoice = prompt("Please input your choice: r(rock), p(paper), s(scissors), q(quit).");
//     if (humanChoice === null) {
//         console.log("Please make your decision.");
//         return null;
//     }

//     humanChoice = humanChoice.toLowerCase();
//     if (humanChoice === 'q' || humanChoice === 'quit') {
//         console.log(`Exit`);
//         return 'q';
//     }

//     if (humanChoice === 's' || humanChoice === scissors) {
//         return scissors;
//     } else if (humanChoice === 'r' || humanChoice === rock) {
//         return rock;
//     } else if (humanChoice === 'p' || humanChoice === paper) {
//         return paper;
//     }

//     console.error("Please input your choice: r(rock), p(paper), s(scissors), q(quit).");
//     return null;
// }

let container = document.querySelector('.container');
let result = document.querySelector('#result');
let clear = document.querySelector('#clear');

clear.disabled = true;

container.addEventListener('click', (e) => {
    if (e.target.textContent.toLowerCase() === 'clear') {
        while (result.firstChild) {
            result.removeChild(result.firstChild);
        }

        changeEnableStatus(false);
        resetScore();
        return;
    }

    playGame(e.target.textContent.toLowerCase());
});

window.addEventListener('keypress', (e) => {
    let pressedKey = e.key.toLocaleLowerCase();
    switch (pressedKey) {
        case 'r':
            document.querySelector('#rock').click();
            break;
        case 's':
            document.querySelector('#scissors').click();
            break;
        case 'p':
            document.querySelector('#paper').click();
            break;
        case 'c':
            clear.click();
        default:
            break;        
    }
});

function playGame(humanChoice) {
    let computerChoice = getComputerChoice();

    if (humanChoice === computerChoice) {
        console.log("Same, play again!");
        let div = document.createElement('div');
        div.appendChild(document.createTextNode("Same, play again!"))
        div.className = 'same';
        result.appendChild(div);
        return;
    }

    play(humanChoice, computerChoice);

    if (hasWinner()) {
        changeEnableStatus(true);
    }
}

function getComputerChoice() {
    let index = Math.floor(Math.random() * 3);
    return options[index];
}

function play(humanChoice, computerChoice) {
    let output = null;
    let div = document.createElement('div');

    if (humanChoice === rock && computerChoice === paper ||
        humanChoice === paper && computerChoice === scissors ||
        humanChoice === scissors && computerChoice === rock) {
        output = document.createTextNode(`You lose! ${computerChoice} beats ${humanChoice}`);
        div.className = 'lose';
        computerScore++;
    } else {
        div.className = 'win';
        output = document.createTextNode(`You win! ${humanChoice} beats ${computerChoice}`);
        humanScore++;
    }

    div.appendChild(output);
    result.appendChild(div);

    if (hasWinner()) {
        nLineBreakAfter(2, result);
        result.appendChild(document.createTextNode(`Human: ${humanScore} Vs Computer: ${computerScore}`));
        nLineBreakAfter(1, result);
        let winner = `The Winner is ${humanScore === 5 ? 'Human' : 'Computer'}`;
        result.appendChild(document.createTextNode(winner));
        nLineBreakAfter(1, result);
        result.appendChild(document.createTextNode(`End of the game.`));
        nLineBreakAfter(1, result);
        return;
    }
}

function nLineBreakAfter(n, element) {
    for (let i = 0; i < n; i++) {
        element.appendChild(document.createElement('br'));
    }
}

function changeEnableStatus(enable) {
    document.querySelector('#rock').disabled = enable;
    document.querySelector('#paper').disabled = enable;
    document.querySelector('#scissors').disabled = enable;

    clear.disabled = !enable;
}

function hasWinner() {
    return humanScore === 5 || computerScore === 5;
}

function resetScore() {
    humanScore = computerScore = 0;
}