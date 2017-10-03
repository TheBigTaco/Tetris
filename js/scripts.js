function Game() {
  this.round = new Round();
}

function Round() {
  this.screen = new Screen();
}

function Screen() {
  this.width = 10;
  this.height = 20;

  // New empty board
  this.cells = [];
  for (var i = 0; i < this.height; i++) {
    this.cells[i] = [];
    for (var j = 0; j < this.width; j++) {
      this.cells[i][j] = null;
    }
  }
  this.activeBlock = null;
  this.requireRedraw = false;
}

Screen.prototype.spawnBlock = function (block, position) {
  // TODO: Error checking for in-bounds
  this.activeBlock = block;
  for (var i = 0; i < block.height; i++) {
    for (var j = 0; j < block.width; j++)
    this.cells[i + position.y][j + position.x] = block.cells[i][j];
  }
  this.requireRedraw = true;
};

function Position(x, y) {
  // TODO: bounds checking
  this.x = x;
  this.y = y;
}

// Hardcoded block types
const iBlock = [
  [1],
  [1],
  [1],
  [1]
];
const tBlock = [
  [0, 1, 0],
  [1, 1, 1]
];
const oBlock = [
  [1, 1],
  [1, 1]
];
const lBlock = [
  [1, 0],
  [1, 0],
  [1, 1]
];
const jBlock = [
  [0, 1],
  [0, 1],
  [1, 1]
];
const zBlock = [
  [0, 1],
  [1, 1],
  [1, 0]
];
const sBlock = [
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

// UI code
function drawUpdate(screen) {
  console.log("tick");
  updateHtml(screen);
}

function updateHtml(screen) {
  for (var i = 0; i < screen.height; i++) {
    for (var j = 0; j < screen.width; j++) {
      if (screen.cells[i][j] !== null) {
        $('.board [xCoordinate=' + j + '][yCoordinate=' + i + ']').addClass('cell-active');
      }
      else {
        $('.board [xCoordinate=' + j + '][yCoordinate=' + i + ']').removeClass('cell-active');
      }
    }
  }
  screen.requireRedraw = false;
}

// Start game
var game = new Game();
var screen = game.round.screen;

$(function(){
  var drawInterval = setInterval(drawUpdate, 1000, screen);
  var game = new Game();
  var theme = new Audio('sounds/theme.mp3');
  var isPlaying = true;
  theme.loop = true;
  var startSound = new Audio('sounds/beep8.wav');
  theme.play();
  $("#start-button").click(function(){
    startSound.play();
    $(".start-menu").hide();
    $(".board").show();
    $(".score").show();
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
  $("#pauseThatShit").click(function(){
    $(".score").hide();
    $(".middle").hide();
    $(".text-pause").show();
    theme.pause();
  });
  $("#unpause").click(function(){
    $(".score").show();
    $(".middle").show();
    $(".text-pause").hide();
    theme.play();
  });
  document.onkeypress = function(p) {
    console.log(p);
    if (p.code === "KeyP") {
      $(".score").hide();
      $(".middle").hide();
      $(".text-pause").show();
      theme.pause();
    } else if (p.code === "KeyU") {
      $(".score").show();
      $(".middle").show();
      $(".text-pause").hide();
      theme.play();
    }
  };
});
