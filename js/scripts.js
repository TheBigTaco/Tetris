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
  this.nextBlock = null;
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


function Block(type) {
  var cellLayout = [[0]];
  this.cells = [];
  this.width = 0;
  this.height = 0;
  if (type === "I") {
    cellLayout = Block.typeI;
  }
  if (type === "T") {
    cellLayout = Block.typeT;
  }
  if (type === "O") {
    cellLayout = Block.typeO;
  }
  if (type === "L") {
    cellLayout = Block.typeL;
  }
  if (type === "J") {
    cellLayout = Block.typeJ;
  }
  if (type === "Z") {
    cellLayout = Block.typeZ;
  }
  if (type === "S") {
    cellLayout = Block.typeS;
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

// Hardcoded block types
Block.typeI = [
  [1],
  [1],
  [1],
  [1]
];
Block.typeT = [
  [0, 1, 0],
  [1, 1, 1]
];
Block.typeO = [
  [1, 1],
  [1, 1]
];
Block.typeL = [
  [1, 0],
  [1, 0],
  [1, 1]
];
Block.typeJ = [
  [0, 1],
  [0, 1],
  [1, 1]
];
Block.typeZ = [
  [0, 1],
  [1, 1],
  [1, 0]
];
Block.typeS = [
  [1, 0],
  [1, 1],
  [0, 1]
];

Block.RandomBlock = function() {
  alert("it worked");
}

function Cell() {

}

// UI code
function UserInterface(game) {
  this.game = game;
  this.screen = game.round.screen;
}

UserInterface.prototype.drawUpdate = function() {
  this.updateHtml();
}

UserInterface.prototype.updateHtml = function() {
  for (var i = 0; i < this.screen.height; i++) {
    for (var j = 0; j < this.screen.width; j++) {
      if (this.screen.cells[i][j] !== null) {
        $('.board [xCoordinate=' + j + '][yCoordinate=' + i + ']').addClass('cell-active');
      }
      else {
        $('.board [xCoordinate=' + j + '][yCoordinate=' + i + ']').removeClass('cell-active');
      }
    }
  }
  this.screen.requireRedraw = false;
}

// Start game
var game = new Game();
var screen = game.round.screen;
var ui = new UserInterface(game);

$(function(){
  // UI
  var drawInterval = setInterval(ui.drawUpdate.bind(ui), 1000);

  // Audio
  var theme = new Audio('sounds/theme.mp3');
  var isPlaying = true;
  theme.loop = true;
  var startSound = new Audio('sounds/beep8.wav');
  theme.play();

  // Buttons
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
