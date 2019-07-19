const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

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
      [null, null, null, null, null, null, null],
    ];
  }

  startGame() {
    this.placeMove();
  }
  
  placeMove() {
    this.printBoard();
    rl.question('which column?', (answer) => {
      if (answer === 'exit') {
        this.exitGame();
      } else {
        this.placeMove();
        this.checkWinner();
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

  checkWinner() {

  }

  exitGame() {
    process.exit();
  }
};


const connectFour = new ConnectFour();

connectFour.startGame();