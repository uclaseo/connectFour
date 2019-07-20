const assert = require('assert');
const connectFour = require('../index');

describe('ConnectFour', function() {
  const board = connectFour.getBoard();
  it('should create 6 rows', function() {
    assert.equal(board.length, 6);
  });
  it('should create 7 columns for all rows', function() {
    board.forEach((row) => {
      assert.equal(row.length, 7);
    });
  });
  it('should initially place yellow disc into middle column', function() {
    const bottomRowIndex = board.length - 1;
    const centerColumnIndex = (board[0].length - 1) / 2;
    assert.equal(board[bottomRowIndex][centerColumnIndex], 'y');
  });

  it('should set the current player as red disc at the beginning', function() {
    const currentPlayer = connectFour.getCurrentPlayer();
    assert.equal(currentPlayer, 'r');
  });
  
  it('should rotate player after each move', function() {
    // because board is initiated with yellow disc already inserted in the center column, currentPlayer is set as red
    // when roated, it should be yellow
    connectFour.rotatePlayer();
    let currentPlayer = connectFour.getCurrentPlayer();
    assert.equal(currentPlayer, 'y');

    connectFour.rotatePlayer();
    currentPlayer = connectFour.getCurrentPlayer();
    assert.equal(currentPlayer, 'r');
  });
  
  it('should insert disc into correct column and row', function() {
    const currentPlayer = connectFour.getCurrentPlayer();
    connectFour.placeMove();
    connectFour.rl.write('0\n');
    const rowIndex = 5;
    const columnIndex = 0;
    assert.equal(board[rowIndex][columnIndex], currentPlayer);
  });

  it('should stack on top when disc is already in the column', function() {
    const currentPlayer = connectFour.getCurrentPlayer();
    connectFour.placeMove();
    connectFour.rl.write('0\n');
    const rowIndex = 4;
    const columnIndex = 0;
    assert.equal(board[rowIndex][columnIndex], currentPlayer);
  });
});