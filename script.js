document.addEventListener('DOMContentLoaded', () => {
    const boxes = document.querySelectorAll('.box');
    const boxTexts = document.querySelectorAll('.boxtext');
    const gameInfo = document.querySelector('.info');
    const currentPlayerDisplay = document.getElementById('current-player');
    const resetButton = document.getElementById('reset');
    const scoreXDisplay = document.getElementById('score-x');
    const scoreODisplay = document.getElementById('score-o');
  
    let currentPlayer = 'X';
    let gameBoard = ['', '', '', '', '', '', '', '', ''];
    let gameActive = true;
    let scores = { X: 0, O: 0 };
  
    const winningCombinations = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
      [0, 4, 8], [2, 4, 6]           // Diagonals
    ];
  
    function checkWinner() {
      for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
          return gameBoard[a];
        }
      }
      return null;
    }
  
    function checkDraw() {
      return gameBoard.every(cell => cell !== '');
    }
  
    function updateGameInfo(message) {
      gameInfo.textContent = message;
    }

    function updateCurrentPlayerDisplay() {
      currentPlayerDisplay.textContent = currentPlayer;
    }

    function updateScoresDisplay() {
      scoreXDisplay.textContent = scores.X;
      scoreODisplay.textContent = scores.O;
    }
  
  
    function handleClick(index) {
      if (!gameActive || gameBoard[index] !== '') {
        return;
      }
  
      gameBoard[index] = currentPlayer;
      boxTexts[index].textContent = currentPlayer;
      
      const winner = checkWinner();
      if (winner) {
        gameActive = false;
        scores[winner]++;
        updateScoresDisplay();
        updateGameInfo(`${winner} wins!`);
      } else if (checkDraw()) {
        gameActive = false;
        updateGameInfo("It's a draw!");
      } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        updateCurrentPlayerDisplay();
        updateGameInfo(`Turn for ${currentPlayer}`);
      }
    }
  
    boxes.forEach((box, index) => {
      box.addEventListener('click', () => {
        handleClick(index);
      });
    });
  
    resetButton.addEventListener('click', () => {
      gameBoard = ['', '', '', '', '', '', '', '', ''];
      boxTexts.forEach(boxText => {
        boxText.textContent = '';
      });
      gameActive = true;
      currentPlayer = 'X';
      updateGameInfo('Turn for X');
    });
  
    updateScoresDisplay();
    updateCurrentPlayerDisplay();
    updateGameInfo('Turn for X');
  });
  