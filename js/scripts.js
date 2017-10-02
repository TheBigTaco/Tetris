function Game() {
  this.round = new Round();
}

function Round() {
  this.screen = new Screen();
}

function Screen() {
  this.squares = [];
  for (var i = 0; i < 20; i++) {
    this.squares[i] = [];
    for (var j = 0; j < 10; j++) {
      this.squares[i][j] = 0;
    }
  }
}

function Piece() {

}

function Block() {

}


var game = new Game();
