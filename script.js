const Player = (name, symbol) => {
    return {name, symbol};
};

const Gameboard = (() => {
    let board = ["","","","","","","","",""];

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
        return !board.includes("");
    };
    
    const switchPlayer = () => {
        currentPlayer = currentPlayer === player1 ? player2 : player1;
    };

    const updateBoard = () => {
        for (let i=0; i<board.length; i++) {
            document.getElementById("cell" + i).innerText = board[i];
        }
    };

    const makeMove = (index) => {
        if (board[index] === "") {
            board[index] = currentPlayer.symbol;

            if(Winner()){
                console.log(currentPlayer.name + "Won the game!");
                updateBoard();
                return;
            }

            if(checkTie()){
                console.log("It's Tie!");
                updateBoard();
                return;
            }

            switchPlayer();
        } else {
            console.log("You can't make move here")
        }

        updateBoard();
    };

    return {makeMove, checkTie, Winner, switchPlayer};

})();

Gameboard.makeMove(0);