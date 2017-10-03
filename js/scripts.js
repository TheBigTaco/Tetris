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
  this.nextBlock = Block.randomBlock();
  this.activeBlock = null;
  this.requireRedraw = false;
}

Screen.prototype.spawnNextBlock = function() {
  const spawnPosition = new Position(5, 0);
  this.activeBlock = this.nextBlock;
  this.activeBlock.position = spawnPosition;
  this.materializeBlock(this.activeBlock);
  this.nextBlock = Block.randomBlock();
}

Screen.prototype.materializeBlock = function(block) {
  var position = block.position;
  for (var i = 0; i < block.height; i++) {
    for (var j = 0; j < block.width; j++) {
      this.cells[i + position.y][j + position.x] = block.cells[i][j];
    }
  }
  block.position = position;
  this.requireRedraw = true;
};

Screen.prototype.dematerializeBlock = function(block) {
  var position = block.position;
  for (var i = 0; i < block.height; i++) {
    for (var j = 0; j < block.width; j++) {
       this.cells[i + position.y][j + position.x] = null;
    }
  }
  this.requireRedraw = true;
};

Screen.prototype.moveActiveBlock = function(direction) {
  var oldPosition = this.activeBlock.position;
  var newPosition = new Position(oldPosition.x, oldPosition.y);
  var dx = 0;
  if (direction === "left") {
    dx = -1;
  }
  else if (direction === "right") {
    dx = 1;
  }
  newPosition.x += dx;
  // Check Position
  this.activeBlock.position = newPosition;
  if (this.activeBlock.isInBounds()) {
    this.activeBlock.position = oldPosition;
    this.dematerializeBlock(this.activeBlock);
    this.activeBlock.position = newPosition;
    this.materializeBlock(this.activeBlock);
  }
  else {
    this.activeBlock.position = oldPosition;
  }
}

function Position(x, y) {
  this.x = x;
  this.y = y;
}

Position.prototype.isInBounds = function() {
  if (this.x >= 0 && this.x <= 10 && this.y >= 0 && this.y <= 20) {
    return true;
  }
  return false;
}

function Block(type) {
  this.type = type;
  var cellLayout = BlockType[type].currentRotation();
  this.cells = [];
  this.position;
  this.width = 0;
  this.height = 0;

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

Block.prototype.isInBounds = function() {
  var topLeft = new Position(this.position.x, this.position.y);
  var bottomRight = new Position(this.position.x + this.width, this.position.y + this.height);
  if (topLeft.isInBounds() && bottomRight.isInBounds()) {
    return true;
  }
  return false;
}


Block.randomBlock = function() {
  var random = Math.floor(7 * Math.random());
  switch (random) {
    case 0:
      return new Block("I");
      break;
    case 1:
      return new Block("T");
      break;
    case 2:
      return new Block("O");
      break;
    case 3:
      return new Block("L");
      break;
    case 4:
      return new Block("J");
      break;
    case 5:
      return new Block("Z");
      break;
    case 6:
      return new Block("S");
      break;
    default:
      return null;
  }
}

// Dont forget documentation
function BlockType() {
  this.rotationState = 0;
  this.rotations = [];
  this.currentRotation = function() {
    return this.rotations[this.rotationState];
  }
}

// Hardcoded block types
BlockType.I = new BlockType();
BlockType.I.rotations[0] = [
  [1, 1, 1, 1]
];
BlockType.I.rotations[1] = [
  [1],
  [1],
  [1],
  [1]
];

BlockType.T = new BlockType();
BlockType.T.rotations[0] = [
  [1, 1, 1],
  [0, 1, 0]
];
BlockType.T.rotations[1] = [
  [1, 0],
  [1, 1],
  [1, 0]
];
BlockType.T.rotations[2] = [
  [0, 1, 0],
  [1, 1, 1]
];
BlockType.T.rotations[3] = [
  [0, 1],
  [1, 1],
  [0, 1]
];

BlockType.O = new BlockType();
BlockType.O.rotations[0] = [
  [1, 1],
  [1, 1]
];

BlockType.L = new BlockType();
BlockType.L.rotations[0] = [
  [0, 0, 1],
  [1, 1, 1]
];
BlockType.L.rotations[1] = [
  [1, 1],
  [0, 1],
  [0, 1]
];
BlockType.L.rotations[2] = [
  [1, 1, 1],
  [1, 0, 0]
];
BlockType.L.rotations[3] = [
  [1, 0],
  [1, 0],
  [1, 1]
];

BlockType.J = new BlockType();
BlockType.J.rotations[0] = [
  [1, 0, 0],
  [1, 1, 1]
];
BlockType.J.rotations[1] = [
  [0, 1],
  [0, 1],
  [1, 1]
];
BlockType.J.rotations[2] = [
  [1, 1, 1],
  [0, 0, 1]
];
BlockType.J.rotations[3] = [
  [1, 1],
  [1, 0],
  [1, 0]
];

BlockType.Z = new BlockType();
BlockType.Z.rotations[0] = [
  [1, 1, 0],
  [0, 1, 1]
];
BlockType.Z.rotations[1] = [
  [0, 1],
  [1, 1],
  [1, 0]
];

BlockType.S = new BlockType();
BlockType.S.rotations[0] = [
  [0, 1, 1],
  [1, 1, 0]
];
BlockType.S.rotations[1] = [
  [1, 0],
  [1, 1],
  [0, 1]
];

function Cell() {

}

// UI code
function UserInterface(game) {
  this.game = game;
  this.screen = game.round.screen;
}

UserInterface.prototype.drawUpdate = function() {
  if (screen.requireRedraw === true)
  {
    this.updateHtml();
    console.log("draw");
  }
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
  var drawInterval = setInterval(ui.drawUpdate.bind(ui), 10);

  // Keypresses
  document.onkeydown = function(event) {
    var key = event.code;
    if (key === "ArrowRight") {
      screen.moveActiveBlock("right");
    }
    else if (key === "ArrowLeft") {
      screen.moveActiveBlock("left");
    }
  }

  // Audio
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
  });
  $("#unpause").click(function(){
    $(".score").show();
    $(".middle").show();
    $(".text-pause").hide();
  });
});
