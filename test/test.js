const assert = require('assert');
const ConnectFour = require('../index');

describe('ConnectFour Instructed Version', function() {
  const connectFour = new ConnectFour();
  describe('State Validity', function() {
    it('should validate empty board', function() {
      const board = [
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null]
      ];
      assert.equal(connectFour._isStateValid(board), true);
    });
    it('should validate number of rows', function() {
      // 5 X 7
      const board = [
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
      ];
      assert.equal(connectFour._isStateValid(board), false);
    });
    it('should validate number of columns', function() {
      // 6 x 6
      const board = [
        [null, null, null, null, null, null],
        [null, null, null, null, null, null],
        [null, null, null, null, null, null],
        [null, null, null, null, null, null],
        [null, null, null, null, null, null],
        [null, null, null, null, null, null]
      ];
      assert.equal(connectFour._isStateValid(board), false);
    });

    it('should validate board with discs in correct places', function() {
      const correctBoard = [
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, 'y', 'r', 'y', null],
      ];
      const incorrectBoard = [
        [null, null, null, null, null, null, null],
        [null, 'r', null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, 'y', null, null, null],
      ]
      assert.equal(connectFour._isStateValid(correctBoard), true);
      assert.equal(connectFour._isStateValid(incorrectBoard), false);
    });
    it('should validate board with discs with correct number', function() {
      const yellowBoard = [
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, 'y', 'y', 'y', 'r'],
      ];
      const redBoard = [
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, 'r', 'y', 'r', 'y', 'r'],
      ]
      assert.equal(connectFour._isStateValid(yellowBoard), false);
    });
  });

  describe('Current Player', function() {
    it('should return correct current player', function() {
      const boardWithYellowTurn = [
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        ['r', 'y', null, 'y', 'r', null, null]
      ];
      const boardWithRedTurn = [
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, 'y'],
        ['y', null, null, 'y', 'r', null, 'r']
      ];
      assert.equal(connectFour._getCurrentPlayer(boardWithYellowTurn), 'y');
      assert.equal(connectFour._getCurrentPlayer(boardWithRedTurn), 'r');

    })
  });
});

describe('ConnectFour Inseok Version', function() {
  const connectFour = new ConnectFour();
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
    connectFour.rl.write('exit');
    setTimeout(() => process.exit(), 100);
  });
});
