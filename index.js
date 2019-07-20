const readline = require('readline');

class ConnectFour {
  constructor() {
    // each array is row
    // eacy index in arrays is cell and a column
    this.board = [
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
      [null, null, null, 'y', null, null, null],
    ];
    this.currentPlayer = 'r'
    this.rl = this.createInputHandler();
  }

  createInputHandler() {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    return rl;
  }

  startNewGame() {
    this.placeMove();
  }
  
  placeMove() {
    // this.printBoard();
    this.rl.question('Which column? (0 - 6)', (column) => {
      const isValidInput = Boolean(!isNaN(column) && parseInt(column) <= 6 && parseInt(column) >= 0);
      if (isValidInput) {
        const columnIndex = parseInt(column);
        let placedLocation = [];
        if (this.board[0][columnIndex]) {
          console.log('The column is filled.  Please choose different column');
          return this.placeMove();
        } else {
          for (let i = 5; i >= 0; i -= 1) {
            if (!this.board[i][columnIndex]) {
              this.board[i][columnIndex] = this.currentPlayer;
              placedLocation.push(i, columnIndex);
              break;
            }
          }
        }
        const hasWinner = this.checkWinner(placedLocation);
        if (hasWinner) {
          // this.printBoard();
          console.log('Winner is', this.getCurrentPlayer());
          this.exitGame();
        } else {
          this.rotatePlayer();
          this.placeMove();
        }
      } else if (column === 'exit') {
        this.exitGame();
      } else {
        console.log('Please enter valid input. (0 - 6)');
        this.placeMove();
      }
    });
  }

  printBoard() {
    let boardString = '';
    this.board.forEach((row) => {
      boardString += '|';
      row.forEach((cell) => {
        if (!cell) {
          boardString += ' |';
        } else if (cell === 'r') {
          boardString += 'r|';
        } else if (cell === 'y') {
          boardString += 'y|';
        }
      });
      boardString += '\n';
    });
    boardString += '---------------';
    console.log(boardString);
  }

  rotatePlayer() {
    if (this.currentPlayer === 'y') {
      return this.currentPlayer = 'r';
    } else {
      return this.currentPlayer = 'y';
    }
  }

  checkWinner(placedLocation) {
    const [rowIndex, columnIndex] = placedLocation;
    if (this.checkRow(rowIndex) || this.checkColumn(columnIndex) || this.checkDiagonal(rowIndex, columnIndex)) {
      return true;
    }
    return false;
  }

  checkRow(row) {
    const board = this.board;
    const currentPlayer = this.getCurrentPlayer();
    let count = 0;
    for (let i = 0; i < 7; i += 1) {
      if (board[row][i] === currentPlayer) {
        count += 1;
        if (count === 4) {
          return true;
        }
      } else {
        count = 0;
      }
    }
    return false;
  }
  
  checkColumn(column) {
    const board = this.board;
    const currentPlayer = this.getCurrentPlayer();
    let count = 0;
    for (let i = 5; i >= 0; i -= 1) {
      if (board[i][column] === currentPlayer) {
        count += 1;
        if (count === 4) {
          return true;
        }
      } else {
        count = 0;
      }
    }
    return false;
  }

  checkDiagonal(row, column) {
    const board = this.board;
    const currentPlayer = this.getCurrentPlayer();

    // bottom left to top right
    for (let i = 0; i < 4; i += 1) {
      const firstCell = board[row + i] && board[row + i][column - i];
      const secondCell = board[row - 1 + i] && board[row - 1 + i][column + 1 - i];
      const thirdCell = board[row - 2 + i] && board[row - 2 + i][column + 2 - i];
      const fourthCell = board[row - 3 + i] && board[row - 3 + i][column + 3 - i];
      const hasValidCells = Boolean(firstCell && secondCell && thirdCell && fourthCell);
      if (hasValidCells && firstCell === secondCell && secondCell === thirdCell && thirdCell === fourthCell) {
        return true;
      }
    }

    // top left to bottom right
    for (let j = 0; j < 4; j += 1) {
      const firstCell = board[row - j] && board[row - j][column - j];
      const secondCell = board[row + 1 - j] && board[row + 1 - j][column + 1 - j];
      const thirdCell = board[row + 2 - j] && board[row + 2 - j][column + 2 - j];
      const fourthCell = board[row + 3 - j] && board[row + 3 - j][column + 3 - j];
      const hasValidCells = Boolean(firstCell && secondCell && thirdCell && fourthCell);
      if (hasValidCells && firstCell === secondCell && secondCell === thirdCell && thirdCell === fourthCell) {
        return true;
      }
    }
    return false;
  }

  
  getBoard() {
    return this.board;
  }
  
  getCurrentPlayer() {
    return this.currentPlayer;
  }
  
  exitGame() {
    process.exit();
  }

  // below codes are the required functions as instructed whereas above codes are my own implementation of the game

  _getCurrentPlayer(gameState) {
    let yellowCount = 0;
    let redCount = 0;
    gameState.forEach((row) => {
      row.forEach((cell) => {
        if (cell === 'y') {
          yellowCount += 1;
        } else if (cell === 'r') {
          redCount += 1;
        }
      });
    });
    this.board = gameState;
    if (yellowCount === redCount) {
      this.currentPlayer = 'y';
    } else if (yellowCount - 1 === redCount) {
      this.currentPlayer = 'r';
    } else {
      // game state is invalid for all other cases
      return false;
    }
    return this.currentPlayer;
  }

  _startGame(gameState, column, color) {
    const isStateValid = this._isStateValid(gameState);
    if (!isStateValid) {
      return false;
    }
    let yellowCount = 0;
    let redCount = 0;
    gameState.forEach((row) => {
      gameState.forEach((cell) => {
        if (cell === 'y') {
          yellowCount += 1;
        } else if (cell === 'r') {
          redCount += 1;
        }
      });
    });

    this.board = gameState;
    if (yellowCount === redCount) {
      this.currentPlayer = 'y';
    } else {
      this.currentPlayer = 'r';
    }

    if (this.currentPlayer === color) {
      return false;
    }

    this._placeMove(column, color);
  }

  _placeMove(column, color) {
    const isValidInput = Boolean(!isNaN(column) && parseInt(column) <= 6 && parseInt(column) >= 0);
    if (isValidInput) {
      const columnIndex = parseInt(column);
      let placedLocation = [];
      if (this.board[0][columnIndex]) {
        return 'The column is filled.  Please choose different column';
      } else {
        for (let i = 5; i >= 0; i -= 1) {
          if (!this.board[i][columnIndex]) {
            this.board[i][columnIndex] = this.currentPlayer;
            placedLocation.push(i, columnIndex);
            break;
          }
        }
      }
      const hasWinner = this.checkWinner(placedLocation);
      if (hasWinner) {
        this.printBoard();
        console.log('Winner is', this.getCurrentPlayer());
      } 
    } else {
      console.log('Please enter valid input. (0 - 6)');
    }
  }

  _isStateValid(gameState) {
    let yellowCount = 0;
    let redCount = 0;

    // check number of rows
    if (gameState.length !== 6) {
      return false;
    }
    for (let i = 0; i < gameState.length; i += 1) {
      const currentRow = gameState[i];
      if (currentRow.length !== 7) {
        return false;
      }
      for (let j = 0; j < currentRow.length; j += 1) {
        const currentCell = currentRow[j];
        if (currentCell && i !== 5 && !gameState[i + 1][j]) {
          return false;
        }
        if (currentCell === 'y') {
          yellowCount += 1;
        } else if (currentCell === 'r') {
          redCount += 1;
        }
      }

    }

    if (redCount > yellowCount || yellowCount - redCount > 1) {
      return false;
    }
    return true;
  }
};


/**
 * This is my own implementation of Connect Four
 * If startNewGame is called, a new game with stream of inputs starts.
 * ============================================
 * const connectFour = new ConnectFour();
 * connectFour.startNewGame();
 * ============================================
 * 
 * 
 * 
 * To play it in instructed implementation version, below codes should be executed
 * ============================================
 * const connectFour = new ConnectFour();
 * const gameState = [
 *   [null, null, null, null, null, null, null],
 *   [null, null, null, null, null, null, null],
 *   [null, null, null, null, null, null, null],
 *   [null, null, null, null, null, null, null],
 *   [null, null, null, null, null, null, null],
 *   [null, null, null, null, null, null, null],
 * ];
 * connectFour._isStateValid(gameState);
 * connectFour._getCurrentPlayer(gameState);
 * connectFour._startGame(gameState, someColumnNumber, color);
 * 
 * ============================================
 */



 
module.exports = ConnectFour;