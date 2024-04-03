const Player = (name, symbol) => {
    return {name, symbol};
};

const Gameboard = (() => {
    let board = ["","","","","","","","",""];
    let currentPlayer = null;

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

    

})();