function Game() {
  this.round = new Round();
}

function Round() {
  this.screen = new Screen();
}

function Screen() {
  const WIDTH = 10;
  const HEIGHT = 20;
  this.activeBlock = null;
  // New empty board
  this.cells = [];
  for (var i = 0; i < HEIGHT; i++) {
    this.cells[i] = [];
    for (var j = 0; j < WIDTH; j++) {
      this.cells[i][j] = null;
    }
  }
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

// Hardcoded block types
var iBlock = [
  [1],
  [1],
  [1],
  [1]
];
var tBlock = [
  [0, 1, 0],
  [1, 1, 1]
];
var oBlock = [
  [1, 1],
  [1, 1]
];
var lBlock = [
  [1, 0],
  [1, 0],
  [1, 1]
];
var jBlock = [
  [0, 1],
  [0, 1],
  [1, 1]
];
var zBlock = [
  [0, 1],
  [1, 1],
  [1, 0]
];
var sBlock = [
  [1, 0],
  [1, 1],
  [0, 1]
];

function Block(type) {
  var cellLayout = [[0]];
  this.cells = [];
  this.width = 0;
  this.height = 0;
  if (type === "I") {
    cellLayout = iBlock;
  }
  if (type === "T") {
    cellLayout = tBlock;
  }
  if (type === "O") {
    cellLayout = oBlock;
  }
  if (type === "L") {
    cellLayout = lBlock;
  }
  if (type === "J") {
    cellLayout = jBlock;
  }
  if (type === "Z") {
    cellLayout = zBlock;
  }
  if (type === "S") {
    cellLayout = sBlock;
  }
  this.height = cellLayout.length;
  this.width = cellLayout[0].length;

  for (var i = 0; i < this.height; i++) {
    this.cells[i] = [];
    for (var j = 0; j < this.width; j++) {
      if (cellLayout[i][j] === 1) {
        this.cells[i][j] = new Cell();
      }
      else {
        this.cells[i][j] = null;
      }
    }
  }
}

function Cell() {

}


// Start game
var game = new Game();
var screen = game.round.screen;
