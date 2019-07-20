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
        if (this.board[0][columnIndex]) {
          console.log('The column is filled.  Please choose different column');
        } else {
          for (let i = 5; i >= 0; i -= 1) {
            if (!this.board[i][columnIndex]) {
              this.board[i][columnIndex] = this.currentPlayer;
              break;
            }
          }
        }
        const hasWinner = this.checkWinner();
        if (hasWinner) {
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

  checkWinner() {
    return false;
  }

  getBoard() {
    return this.board;
  }

  exitGame() {
    process.exit();
  }
};


const connectFour = new ConnectFour();

// connectFour.startGame();

module.exports = connectFour;