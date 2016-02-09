'use strict';

// Core Game Object
function Game () {
  this.board = [];
  this.isOver = false;
  this.turn = 'X';
  this.turnCount = 0;
  // Reset the board on initialization
  this.resetBoard();
}

Game.prototype.resetBoard = function () {
  this.board = [['', '', ''], ['', '', ''], ['', '', '']];
  this.turnCount = 0;
  this.isOver = false;
  this.turn = 'X';
};

Game.prototype.placePiece = function (x, y) {
  let response = {
    success: false,
    turn: this.turn,
    msg: '',
    isWon: false
  };
  let currentTurn = this.turn;

  // First Check if the game has already ended
  if (this.isOver) {
    response.msg = 'Game is over, Please Click New Game to start again';
    return response;
  } else {
    // Second Check if the position given is even free
    if (!this.isPositionFree(x, y)) {
      response.msg = 'Position is not free please try a different spot';
      return response;
    }

    this.board[x][y] = currentTurn;
    response.success = true;
    this.turnCount++;
    this.toggleTurn();

    if (this.checkForWin(x, y)) {
      // Game Over!
      this.isOver = true;
      console.log('Congratulations, ' + currentTurn + ' has won');

      response.msg = 'Congratulations, ' + currentTurn + ' has won';
      response.isWon = true;
      return response;
    }

    if (this.turnCount > 8) {
      // It is a Draw - Full Board
      this.isOver = true;
      console.log('Game has Ended in a Draw');
      response.msg = 'Game has Ended in a Draw';
      return response;
    }
  }

  return response;
};

Game.prototype.toggleTurn = function () {
  this.turn = this.turn === 'X' ? '0' : 'X';
};

Game.prototype.checkForWin = function (x, y) {
  // 8 Scenarios, 3 down, 3 across, 2 diagonal
  let thisBoard = this.board;

  // Horizontal Win
  if (thisBoard[x][0] && thisBoard[x][0] === thisBoard[x][1] && thisBoard[x][2] === thisBoard[x][1]) {
    return true;
  }

  // Vertical Win
  if (thisBoard[0][y] && thisBoard[0][y] === thisBoard[1][y] && thisBoard[2][y] === thisBoard[1][y]) {
    return true;
  }

  // dont check middle sides for diagonal
  if (x === 1 && y !== 1 || x !== 1 && y === 1) {
    return false;
  }

  if (thisBoard[1][1] && thisBoard[0][0] === thisBoard[1][1] && thisBoard[2][2] === thisBoard[1][1]) {
    return true;
  }

  if (thisBoard[1][1] && thisBoard[2][0] === thisBoard[1][1] && thisBoard[0][2] === thisBoard[1][1]) {
    return true;
  }
};

Game.prototype.isPositionFree = function (x, y) {
  return this.board[x][y] === '';
};

function DumbAI () {
  this.game = null;
}

DumbAI.prototype.setGame = function (game) {
  this.game = game;
};

DumbAI.prototype.takeTurn = function () {
  if (!this.game || this.game.isOver) {
    return false;
  }
  let hasSuccess = false;
  let response, randX, randY;
  while (!hasSuccess) {
    randX = Math.floor(Math.random() * 3);
    randY = Math.floor(Math.random() * 3);
    response = this.game.placePiece(randX, randY);
    hasSuccess = response.success;
  }

  response.x = randX;
  response.y = randY;

  return response;
};
