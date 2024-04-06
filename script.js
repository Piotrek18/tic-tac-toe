const Player = (name, symbol) => {
    return {name, symbol};
};

const Gameboard = (() => {
    let board = ["","","","","","","","",""];
    let gameOver = false;

    const player1 = Player("Player 1", "X");
    const player2 = Player("Player 2", "O");
    let currentPlayer = player1;

    const Winner = () => {
        const winCombinations = [
            [0,1,2], [3,4,5], [6,7,8], //rows
            [0,3,6], [1,4,7], [2,5,8], //columns
            [0,4,8], [2,4,6]
        ];

    for (let combination of winCombinations) {
        const [a,b,c] = combination;
        if(board[a] && board[a] === board[b] && board[a] === board[c]) {
            return true;
        }
    }
    return false;
    };

    const checkTie = () => {
        return !board.includes("") && !Winner();
    };
    
    const switchPlayer = () => {
        currentPlayer = currentPlayer === player1 ? player2 : player1;
    };

    const updateBoard = () => {
        for (let i=0; i<board.length; i++) {
            document.getElementById("cell" + i).innerText = board[i];
        }
    };

    const openDialog = (message) => {
        const dialog = document.getElementById("dialog");
        const winnerMessage = document.getElementById("winnerMessage");
        winnerMessage.textContent = message;
        dialog.style.display = "block";
    };

    const closeDialog = () => {
        const dialog = document.getElementById("dialog");
        dialog.style.display = "none";
    };

    const resetGame = () => {
        board = ["","","","","","","","",""];
        currentPlayer = player1;
        gameOver = false;
        updateBoard();
        closeDialog();
    }

    const makeMove = (index) => {
        if (!gameOver && board[index] === "") {
            board[index] = currentPlayer.symbol;

            if(Winner()){
                openDialog(currentPlayer.name + "Won the game!");
                updateBoard();
                gameOver = true;
                return;
            }

            if(checkTie()){
                openDialog("It's Tie!");
                updateBoard();
                gameOver = true;
                return;
            }

            switchPlayer();
        } else {
            console.log("You can't make move here")
        }

        updateBoard();
    };

    return {makeMove, checkTie, Winner, switchPlayer, resetGame, board, currentPlayer, gameOver};

})();

const cells = document.querySelectorAll("td");

cells.forEach((cell, index) => {
    cell.addEventListener("click", () => {
        Gameboard.makeMove(index);
    });
});

document.getElementById("resetButton").addEventListener("click", () => {
    Gameboard.resetGame();
});