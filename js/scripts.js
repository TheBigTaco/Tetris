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
  // TODO un-hardcode
  this.activePiece = new Piece("T");
}

Screen.prototype.spawnPiece = function (piece, x, y) {
  // TODO: Error checking for in-bounds
  for (var i = 0; i < piece.height; i++) {
    for (var j = 0; j < piece.width; j++)
    this.blocks[i + y][j + x] = piece.blocks[i][j];
  }
};

function Piece(type) {
  this.blocks = [];
  this.width = 0;
  this.height = 0;
  if (type = "T") {
    this.blocks = [[null, new Block(), null], [new Block(), new Block(), new Block()]];
    this.width = 3;
    this.height = 2;
  }
}

function Block() {

}

// Start game
var game = new Game();
var screen = game.round.screen;
