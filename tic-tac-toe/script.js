const defaultToken = '';
const BOARD_ROW = 3;
const BOARD_COLUMN = 3;

// function Cell() {
//     let token = defaultToken;

//     const setToken = (newToken) => token = newToken;
//     const getToken = () => token;

//     return {
//         setToken, 
//         getToken
//     };
// }

function gameBoardFactory() {
    let board = [];

    const getBoard = () => board;
    const printBoard = () => console.log(board);

    const dropToken = function (row, column, token) {
        if (row >= 3 || column >= 3) {
            return false;
        }

        if (board[row][column] !== defaultToken) {
            return false;
        }

        board[row][column] = token;
        return true;
    };

    const init = () => {
        for (let i = 0; i < BOARD_ROW; i++) {
            board[i] = [];
            for (let j = 0; j < BOARD_COLUMN; j++) {
                board[i].push(defaultToken);
            }
        }
    }

    init();

    return {
        init,
        getBoard,
        printBoard,
        dropToken,
    };
}

function gameController() {
    const players = [
        {
            name: 'Player 1',
            token: 'X',
        },
        {
            name: 'Player 2',
            token: 'O',
        }
    ]

    const boardFactory = gameBoardFactory();
    const board = boardFactory.getBoard();
    let activePlayer = players[0];

    const setPlayer1Name = (name) => players[0].name = name;
    const setPlayer2Name = (name) => players[1].name = name;

    const getActivePlayer = () => activePlayer;
    const switchPlayer = function () {
        activePlayer = activePlayer == players[0] ? players[1] : players[0];
    }

    const printNewRound = () => {
        console.log(`${activePlayer.name}'s (${activePlayer.token}) turn.`);
        boardFactory.printBoard();
    }

    const dropToken = (row, column) => boardFactory.dropToken(row, column, activePlayer.token);

    const playRound = (row, column) => {
        if (!dropToken(row, column)) {
            return;
        }
        
        if (gotWinner(row, column)) {
            console.log(`Winner is ${activePlayer.name} (${activePlayer.token}).`);
            return `Winner is ${activePlayer.name} (${activePlayer.token}).`;
        } else if (!availableSpacesLeft()) {
            console.log('Drawwwww!');
            return 'Drawwwww!';
        } else {
            switchPlayer();
            printNewRound();
        }
    }
    
    const gotWinner = (row, column) => {
        // row win.
        for (let j = 0; j < BOARD_COLUMN; j++) {
            if (board[row][j] !== activePlayer.token) {
                break;
            }

            if (j === BOARD_COLUMN - 1) {
                console.log(`${activePlayer.name} (${activePlayer.token}) win, at row ${row + 1}.`);
                return true;
            }
        }

        // column win.
        for (let i = 0; i < BOARD_ROW; i++) {
            if (board[i][column] !== activePlayer.token) {
                break;
            }

            if (i === BOARD_ROW - 1) {
                console.log(`${activePlayer.name} (${activePlayer.token}) win, at column ${column + 1}.`);
                return true;
            }
        }

        // diagonal (\) win.
        for (let i = 0; i < BOARD_ROW; i++) {
            if (board[i][i] !== activePlayer.token) {
                break;
            }

            if (i === BOARD_ROW - 1) {
                console.log(`${activePlayer.name} (${activePlayer.token}) win, at diagonal (\\).`);
                return true;
            }
        }

        // diagonal (/) win.
        if (activePlayer.token === board[0][2] &&
            activePlayer.token === board[1][1] &&
            activePlayer.token === board[2][0]) {
                
            console.log(`${activePlayer.name} win, at diagonal (/).`);
            return true;
        }

        return false;
    }

    const availableSpacesLeft = () => {
        for (let i = 0; i < BOARD_ROW; i++) {
            for (let j = 0; j < BOARD_COLUMN; j++) {
                if (board[i][j] === defaultToken) {
                    return true;
                }
            }
        }

        return false;
    }

    const reset = () => {
        boardFactory.init();
        activePlayer = players[0];
        printNewRound();
    }

    printNewRound();

    return {
        reset,
        getActivePlayer,
        playRound,
        setPlayer1Name,
        setPlayer2Name,
        board: boardFactory.getBoard(),
    }
}

// draw
// controller.playRound(0, 0);
// controller.playRound(0, 2);
// controller.playRound(1, 1);
// controller.playRound(2, 2);
// controller.playRound(2, 0);
// controller.playRound(1, 0);
// controller.playRound(0, 1);
// controller.playRound(2, 1);
// controller.playRound(1, 2);

// column
// controller.playRound(1, 1);
// controller.playRound(1, 0);
// controller.playRound(0, 1);
// controller.playRound(0, 0);
// controller.playRound(2, 1);

// row
// controller.playRound(0, 0);
// controller.playRound(1, 0);
// controller.playRound(0, 1);
// controller.playRound(1, 1);
// controller.playRound(0, 2);
// console.log('=============================');

// diagonal (\)
// controller.playRound(1, 1);
// controller.playRound(0, 1);
// controller.playRound(0, 0);
// controller.playRound(2, 1);
// controller.playRound(2, 2);

// diagonal (/)
// controller.playRound(1, 0);
// controller.playRound(0, 2);
// controller.playRound(1, 2);
// controller.playRound(1, 1);
// controller.playRound(0, 1);
// controller.playRound(2, 0);

//controller.reset();

function ScreenController() {
    const container = document.querySelector('.container');
    const info = document.querySelector('.info');
    const resetButton = document.querySelector('.reset');
    const namesButton = document.querySelector('.enter-names');
    const dialog = document.querySelector('dialog');
    const submitButton = document.querySelector('#submit');
    const cancelButton = document.querySelector('#cancel');
    const player1Name = document.querySelector('#player1');
    const player2Name = document.querySelector('#player2');

    let controller = gameController();

    const renderBoard = () => {
        container.textContent = '';
        updatePlayerInfo();

        for (let i = 0; i < BOARD_ROW; i++) {
            for (let j = 0; j < BOARD_COLUMN; j++) {
                let cellButton = document.createElement('button');
                cellButton.dataset.row = i;
                cellButton.dataset.column = j;
                cellButton.classList.add('cell');
                cellButton.textContent = controller.board[i][j];
                container.appendChild(cellButton);
            }
        }

        // Add the event handler for the entire container div.
        container.addEventListener('click', placeToken);
    }

    const updatePlayerInfo = () => {
        info.textContent = `${controller.getActivePlayer().name}'s (${controller.getActivePlayer().token}) turn.`;
    }

    const placeToken = (e) => {
        const rowIndex = e.target.dataset.row;
        const columnIndex = e.target.dataset.column;

        let message = controller.playRound(rowIndex, columnIndex);
        renderBoard();

        if (message !== undefined) {
            info.textContent = message;
            container.removeEventListener('click', placeToken);
        }
    }

    resetButton.addEventListener('click', () => {
        controller.reset();
        renderBoard();
    });

    namesButton.addEventListener('click', () => {
        dialog.showModal();
    });

    cancelButton.addEventListener('click', (e) => {
        e.preventDefault();
        dialog.close();
    });

    submitButton.addEventListener('click', (e) => {
        if (player1Name.value.trim() === '' || player2Name.value.trim() === '') {
            return;
        }

        controller.setPlayer1Name(player1Name.value);
        controller.setPlayer2Name(player2Name.value);
        controller.reset();
        renderBoard();

        e.preventDefault();
        dialog.close();
    });

    renderBoard();
}

ScreenController();