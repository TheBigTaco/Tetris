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
  this.blocks = [];
  for (var i = 0; i < HEIGHT; i++) {
    this.blocks[i] = [];
    for (var j = 0; j < WIDTH; j++) {
      this.blocks[i][j] = null;
    }
  }
}

Screen.prototype.spawnPiece = function (x, y) {
  // TODO: Error checking for in-bounds
  this.blocks[y][x] = new Block();
};

function Piece(type) {
  
}

function Block() {

}

// Start game
var game = new Game();
