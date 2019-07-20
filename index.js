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

  startGame() {
    this.placeMove();
  }
  
  placeMove() {
    this.printBoard();
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
        console.log('hasWinner', hasWinner);
        if (hasWinner) {
          this.printBoard();
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
    let hasRow = this.checkRow(rowIndex)
    if (hasRow) {
      return true;
    }
    let hasColumn = this.checkColumn(columnIndex);
    if (hasColumn) {
      return true;
    }
    let hasDiagonal = this.checkDiagonal(rowIndex, columnIndex);
    if (hasDiagonal) {
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
};


const connectFour = new ConnectFour();

connectFour.startGame();

module.exports = connectFour;