const ROCK = document.querySelector("#rock");
const PAPER = document.querySelector("#paper");
const SCISSORS = document.querySelector("#scissors");

let humanScore = 0;
let computerScore = 0;

function getComputerChoice() {
    let computerChoice = Math.floor(Math.random() * 3);
    if (computerChoice === 0) {
        return "Rock";
    } else if (computerChoice === 1) {
        return "Paper";
    } else {
        return "Scissors";
    }
}

function getHumanChoice() {
    let humanChoice = Number(window.prompt("Enter 0 to Rock, 1 to Paper and 2 to Scissors"));
    if (humanChoice === 0) {
        return "Rock";
    } else if (humanChoice === 1) {
        return "Paper";
    } else {
        return "Scissors";
    }
}

const SCORE = document.querySelector(".score");

function playRound(humanChoice, computerChoice) {

    if (humanChoice === "Rock" && computerChoice === "Scissors"
        || humanChoice === "Paper" && computerChoice === "Rock"
        || humanChoice === "Scissors" && computerChoice === "Paper"
    ) {
        humanScore += 1;
        console.log("You: " + humanChoice + " Computer: " + computerChoice + "\n" + "You win!");
    } else if (humanChoice === computerChoice) {
        console.log("You: " + humanChoice + " Computer: " + computerChoice + "\n" + "Draw.");
    } else {
        computerScore += 1;
        console.log("You: " + humanChoice + " Computer: " + computerChoice + "\n" + "You lose!");
    }

    SCORE.textContent = "Player: " + humanScore + " vs " + "Computer: " + computerScore;

    if (humanScore === 5 || computerScore === 5) {
        if (humanScore === 5) {
            SCORE.textContent = "YOU WIN!";
        } else if (computerScore === 5) {
            SCORE.textContent = "YOU LOSE!";
        }
        humanScore = 0;
        computerScore = 0;
    }
}

ROCK.addEventListener("click", () => { playRound('Rock', getComputerChoice()); });
PAPER.addEventListener("click", () => { playRound('Paper', getComputerChoice()); });
SCISSORS.addEventListener("click", () => { playRound('Scissors', getComputerChoice()); });

SCORE.textContent = "Player: " + humanScore + " vs " + "Computer: " + computerScore;