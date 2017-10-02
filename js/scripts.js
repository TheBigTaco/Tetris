// Handles loading of the game/menus/etc
function Game() {
  this.round = new Round();
}

// Handles actual gameplay logic
function Round() {
  this.screen = new Screen();
}

// Tracks position of blocks
function Screen() {
  this.squares = [];
  for (var i = 0; i < 20; i++) {
    this.squares[i] = [];
    for (var j = 0; j < 10; j++) {
      this.squares[i][j] = 0;
    }
  }
}

// Collection of blocks in a particular shape
function Piece() {

}

// Single square of the board
function Block() {

}

// Start game
var game = new Game();
