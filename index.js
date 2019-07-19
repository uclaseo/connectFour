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

  }

  printBoard() {

  }

  checkWinner() {

  }

  exitGame() {
    process.exit();
  }
};


const connectFour = new ConnectFour();

connectFour.startGame();