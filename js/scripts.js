function Game() {
  this.round = new Round();
}

function Round() {
  this.screen = new Screen();
}

function Screen() {
  const WIDTH = 10;
  const HEIGHT = 20
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

function Piece() {

}

function Block() {

}

// Start game
$(function(){
  var game = new Game();
  var theme = new Audio('sounds/theme.mp3');
  var isPlaying = true;
  theme.loop = true;
  var startSound = new Audio('sounds/beep8.wav');
  theme.play();
  $("#start").click(function(){
    startSound.play();
    $(".start-menu").hide();
    $(".board").show();
    $(".starting").show();
  });
  $("#reset").click(function(){
    location.reload();
  });
  $("#music").click(function(){
    if (isPlaying) {
      theme.pause();
      isPlaying = false;
    } else {
      theme.play();
      isPlaying = true;
    }
  });
});
