const cells = document.querySelectorAll('[data-cell]');
const status = document.getElementById('status');
const resetButton = document.getElementById('reset-button');
const overlay = document.getElementById('overlay');
const resultMessage = document.getElementById('result-message');
const resetButtonOverlay = document.getElementById('reset-button-overlay');
let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

function checkWin() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6] // Diagonals
    ];

    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            return gameBoard[a];
        }
    }

    if (!gameBoard.includes('')) {
        return 'draw';
    }

    return null;
}

function handleCellClick(event) {
    const cell = event.target;
    const index = Array.from(cells).indexOf(cell);

    if (gameBoard[index] || !gameActive) {
        return;
    }

    gameBoard[index] = currentPlayer;
    cell.textContent = currentPlayer;

    const winner = checkWin();

    if (winner) {
        gameActive = false;
        if (winner === 'draw') {
            resultMessage.textContent = "It's a draw!";
        } else {
            resultMessage.textContent = `${winner} wins!`;
        }
        overlay.style.display = 'flex';
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        status.textContent = `${currentPlayer}'s turn`;
    }
}

function resetGame() {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameActive = true;
    status.textContent = `${currentPlayer}'s turn`;

    cells.forEach((cell) => {
        cell.textContent = '';
    });

    overlay.style.display = 'none';
}

cells.forEach((cell) => {
    cell.addEventListener('click', handleCellClick);
});

resetButton.addEventListener('click', resetGame);
resetButtonOverlay.addEventListener('click', resetGame);
