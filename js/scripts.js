// Hardcoded block types


function Game() {
  this.round = new Round();
}

function Round() {
  this.screen = new Screen();
}

function Screen() {
  const WIDTH = 10;
  const HEIGHT = 20;
  // New empty board
  this.cells = [];
  for (var i = 0; i < HEIGHT; i++) {
    this.cells[i] = [];
    for (var j = 0; j < WIDTH; j++) {
      this.cells[i][j] = null;
    }
  }
  // TODO un-hardcode
  this.activeBlock = new Block("T");
}

Screen.prototype.spawnBlock = function (block, position) {
  // TODO: Error checking for in-bounds
  for (var i = 0; i < block.height; i++) {
    for (var j = 0; j < block.width; j++)
    this.cells[i + position.y][j + position.x] = block.cells[i][j];
  }
};

function Position(x, y) {
  // TODO: bounds checking
  this.x = x;
  this.y = y;
}

function Block(type) {
  this.cells = [];
  this.width = 0;
  this.height = 0;
  if (type = "T") {
    this.cells = [[null, new Cell(), null], [new Cell(), new Cell(), new Cell()]];
    this.width = 3;
    this.height = 2;
  }
}

function Cell() {

}


// Start game
var game = new Game();
var screen = game.round.screen;
