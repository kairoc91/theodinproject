// Função que gera uma escolha randomica pelo computador
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

// Função que recebe a opcão escolhida pelo jogador 
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

// Variáveis que armazenam a pontuação dos jogadores
let humanScore = 0;
let computerScore = 0;

// Função que recebe cada uma das cinco rodadas
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
}

// Função que chama a função de rodada, e exibe o placar no final.
function playGame() {
    for (let i = 1; i <= 5; i++) {
        console.log("Round " + i)
        const humanSelection = getHumanChoice();
        const computerSelection = getComputerChoice();

        playRound(humanSelection, computerSelection);
        console.log("You: " + humanScore + " Computer: " + computerScore);
    }

    console.log("End game!");

    if (humanScore < computerScore) {
        console.log("YOU LOSE.");
    } else if (humanScore > computerScore) {
        console.log("YOU WIN!");
    } else {
        console.log("DRAW.");
    }
}

playGame();