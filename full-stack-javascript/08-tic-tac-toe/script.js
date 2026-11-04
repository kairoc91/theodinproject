const gameBoard = (() => {
    let table = ["", "", "", "", "", "", "", "", ""];

    const addMark = (playerChoice, playerMark) => {
        if (playerChoice >= 0 && playerChoice < table.length && table[playerChoice] === "") {
            table[playerChoice] = playerMark;
            return true;
        }
        return false;
    };

    const getBoard = () => table;

    const resetBoard = () => {
        table = ["", "", "", "", "", "", "", "", ""];
    };

    return { addMark, getBoard, resetBoard };
})();

function createPlayer(name, marker) {
    return { name, marker };
}

const gameController = (() => {
    const player1 = createPlayer("Player 1", "O");
    const player2 = createPlayer("Player 2", "X");
    let activePlayer = player1;
    let gameOver = false;

    const winConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Linhas
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Colunas
        [0, 4, 8], [2, 4, 6]             // Diagonais
    ];

    const switchPlayerTurn = () => {
        activePlayer = activePlayer === player1 ? player2 : player1;
    };

    const getActivePlayer = () => activePlayer;

    const checkResult = () => {
        const board = gameBoard.getBoard();

        const hasWon = winConditions.some(([a, b, c]) => {
            return board[a] !== "" && board[a] === board[b] && board[a] === board[c];
        });

        if (hasWon) {
            gameOver = true;
            return `${activePlayer.name} (${activePlayer.marker}) venceu!`;
        }

        if (!board.includes("")) {
            gameOver = true;
            return "Empate!";
        }

        return null;
    };

    const addMark = (index) => {
        if (gameOver) {
            return "O jogo já acabou! Reinicie para jogar novamente.";
        }

        const markAdded = gameBoard.addMark(index, activePlayer.marker);

        if (!markAdded) {
            return "Escolha outra opção.";
        }

        const gameResult = checkResult();
        if (gameResult) {
            return gameResult;
        }

        switchPlayerTurn();
        return `Jogada realizada. Vez de ${activePlayer.name} (${activePlayer.marker}).`;
    };

    const resetGame = (player1Name = "Player 1", player2Name = "Player 2") => {
        player1.name = player1Name.trim() || "Player 1";
        player2.name = player2Name.trim() || "Player 2";
        gameBoard.resetBoard();
        activePlayer = player1;
        gameOver = false;
        return `Vez de ${activePlayer.name} (${activePlayer.marker}).`;
    };

    return { addMark, getActivePlayer, checkResult, resetGame };
})();

const displayController = (() => {
    const boardElement = document.getElementById("gameboard");
    const statusElement = document.getElementById("status-message");
    const restartBtn = document.getElementById("btn-restart");
    const player1Input = document.getElementById("player1-name");
    const player2Input = document.getElementById("player2-name");

    const renderBoard = () => {
        const board = gameBoard.getBoard();
        boardElement.innerHTML = "";

        board.forEach((mark, index) => {
            const cell = document.createElement("button");
            cell.type = "button";
            cell.classList.add("cell");
            if (mark === "O") cell.classList.add("marker-o");
            if (mark === "X") cell.classList.add("marker-x");

            cell.textContent = mark;
            cell.dataset.index = index;
            boardElement.appendChild(cell);
        });
    };

    const updateStatus = (message) => {
        statusElement.textContent = message;
    };

    boardElement.addEventListener("click", (event) => {
        const cell = event.target.closest(".cell");
        if (!cell) return;

        const index = Number(cell.dataset.index);
        const message = gameController.addMark(index);

        renderBoard();
        updateStatus(message);
    });

    restartBtn.addEventListener("click", () => {
        const message = gameController.resetGame(player1Input.value, player2Input.value);
        renderBoard();
        updateStatus(message);
    });

    // Inicializa a interface na primeira carga
    const initialMessage = gameController.resetGame(player1Input.value, player2Input.value);
    renderBoard();
    updateStatus(initialMessage);

    return { renderBoard, updateStatus };
})();

