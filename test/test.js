const assert = require('assert');
const ConnectFour = require('../index');

/**
 * ========================================
 * Testing Instructed Version of Connect Four
 * ========================================
 */
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
      assert.equal(connectFour.isStateValid(board), true);
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
      assert.equal(connectFour.isStateValid(board), false);
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
      assert.equal(connectFour.isStateValid(board), false);
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
      assert.equal(connectFour.isStateValid(correctBoard), true);
      assert.equal(connectFour.isStateValid(incorrectBoard), false);
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
      ];
      assert.equal(connectFour.isStateValid(yellowBoard), false);
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
      assert.equal(connectFour.getCurrentPlayer(boardWithYellowTurn), 'y');
      assert.equal(connectFour.getCurrentPlayer(boardWithRedTurn), 'r');
    });
  });

  describe('Play and Placing Discs', function() {
    it('should start a game with yellow disc in the center row', function() {
      const board = [
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, 'r', null, null, null]
      ];
      assert.equal(connectFour.play(board, 0, 'y'), false);
    });
    it('should place a disc in correct place', function() {
      const board = [
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, 'y', null, null, null]
      ];
      const updatedBoard = connectFour.play(board, 3, 'r');
      assert.equal(updatedBoard[4][3], 'r');
    })
  });

  describe('Winning Condition', function() {
    describe('Row', function() {
      it('should return true if there is a winner with row', function() {
        const board = [
          [null, null, null, null, null, null, null],
          [null, null, null, null, null, null, null],
          [null, null, null, null, null, null, null],
          [null, null, null, null, null, null, null],
          [null, null, null, 'r', null, null, null],
          ['y', 'y', 'y', 'y', 'r', 'r', null]
        ];
        assert.equal(connectFour.checkRow(board), true);
      });

    });
    describe('Column', function() {
      it('should return true if there is a winner with column', function() {
        const board = [
          [null, null, null, null, null, null, null],
          [null, null, null, null, null, null, null],
          ['y', null, null, null, null, null, null],
          ['y', null, null, null, null, null, null],
          ['y', 'r', 'r', 'r', null, null, null],
          ['y', 'y', 'y', 'r', 'r', 'r', null]
        ];
        assert.equal(connectFour.checkColumn(board), true);
      });
    });
    describe('Diagonal', function() {
      it('should return true if there is a winner with diagonal(top left to bottom right)', function() {
        const board = [
          [null, null, null, null, null, null, null],
          [null, null, null, null, null, null, null],
          ['y', null, null, null, null, null, null],
          ['r', 'y', null, null, null, null, null],
          ['y', 'y', 'y', 'r', null, null, null],
          ['r', 'r', 'r', 'y', null, null, null]
        ];
        assert.equal(connectFour.checkDiagonal(board), true);
      });
      it('should return true if there is a winner with diagonal(bottom left to top right)', function() {
        const board = [
          [null, null, null, null, null, null, null],
          [null, null, null, null, null, null, null],
          [null, null, null, 'r', null, null, null],
          [null, null, 'r', 'y', null, null, null],
          [null, 'r', null, 'y', null, null, null],
          ['r', null, null, 'y', 'y', null, null]
        ];
        assert.equal(connectFour.checkDiagonal(board), true);
      });
    });
    describe('Any Direction', function() {
      it('should return false if there is no winner', function() {
        const board = [
          [null, null, null, null, null, null, null],
          [null, null, null, null, null, null, null],
          [null, null, null, null, null, null, null],
          [null, null, null, null, null, null, null],
          [null, null, 'y', 'r', null, null, null],
          ['y', 'r', 'y', 'y', 'r', 'r', null]
        ];
        assert.equal(connectFour.checkWinner(board), false);
      });
      it('should return true if there is winner', function() {
        const board = [
          [null, 'r', null, null, null, null, null],
          [null, 'y', 'r', null, null, null, null],
          [null, 'y', 'y', 'r', null, null, null],
          ['r', 'r', 'r', 'y', 'r', null, null],
          ['r', 'y', 'y', 'y', 'r', null, null],
          ['y', 'r', 'y', 'y', 'y', 'r', null]
        ];
        assert.equal(connectFour.checkWinner(board), true);
      });


    });
  });

});

/**
 * ========================================
 * Testing My Version of Connect Four
 * ========================================
 */

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
    const currentPlayer = connectFour._getCurrentPlayer();
    assert.equal(currentPlayer, 'r');
  });
  
  it('should rotate player after each move', function() {
    // because board is initiated with yellow disc already inserted in the center column, currentPlayer is set as red
    // when roated, it should be yellow
    connectFour.rotatePlayer();
    let currentPlayer = connectFour._getCurrentPlayer();
    assert.equal(currentPlayer, 'y');

    connectFour.rotatePlayer();
    currentPlayer = connectFour._getCurrentPlayer();
    assert.equal(currentPlayer, 'r');
  });
  
  it('should insert disc into correct column and row', function() {
    const currentPlayer = connectFour._getCurrentPlayer();
    connectFour._placeMove();
    connectFour.rl.write('0\n');
    const rowIndex = 5;
    const columnIndex = 0;
    assert.equal(board[rowIndex][columnIndex], currentPlayer);
  });

  it('should stack on top when disc is already in the column', function() {
    const currentPlayer = connectFour._getCurrentPlayer();
    connectFour._placeMove();
    connectFour.rl.write('0\n');
    const rowIndex = 4;
    const columnIndex = 0;
    assert.equal(board[rowIndex][columnIndex], currentPlayer);
    connectFour.rl.write('exit');
    setTimeout(() => process.exit(), 100);
  });
});
