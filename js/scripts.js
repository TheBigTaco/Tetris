function Game() {
  this.round = new Round();
}

function Round() {
  this.screen = new Screen();
}

function Screen() {
  // New empty board
  this.cells = [];
  for (var i = 0; i < Screen.height; i++) {
    this.cells[i] = [];
    for (var j = 0; j < Screen.width; j++) {
      this.cells[i][j] = null;
    }
  }
  this.requireRedraw = false;

  // TODO: move these to Round? Or maybe add Player object to track these and keypresses? (and score!)
  this.nextBlock = Block.randomBlock();
  this.activeBlock = null;
}

// Hardcoded static constants
Screen.width = 10;
Screen.height = 20;
Screen.spawnPosition = new Position(4, 5);

Screen.prototype.spawnNextBlock = function() {
  this.activeBlock = this.nextBlock;
  this.materializeBlock(this.activeBlock);
  this.nextBlock = Block.randomBlock();
}

// TODO: make materialize/dematerialize DRYer
Screen.prototype.materializeBlock = function(block) {
  var position = block.position;
  for (var i = 0; i < block.height; i++) {
    for (var j = 0; j < block.width; j++) {
      var cellPosition = new Position(j + position.x - block.pivot.x, i + position.y - block.pivot.y);
      if (cellPosition.isInBounds()) {
        this.cells[i + position.y - block.pivot.y][j + position.x - block.pivot.x] = block.cells[i][j];
      }
    }
  }
  this.requireRedraw = true;
};

Screen.prototype.dematerializeBlock = function(block) {
  var position = block.position;
  for (var i = 0; i < block.height; i++) {
    for (var j = 0; j < block.width; j++) {
      var cellPosition = new Position(j + position.x - block.pivot.x, i + position.y - block.pivot.y);
      if (cellPosition.isInBounds()) {
       this.cells[i + position.y - block.pivot.y][j + position.x - block.pivot.x] = null;
      }
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
  // TODO: Do this in a less dumb way
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

Screen.prototype.rotateActiveBlock = function() {
  this.dematerializeBlock(this.activeBlock);
  this.activeBlock.rotate();
  this.materializeBlock(this.activeBlock);
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

function Block(type, position) {
  this.type = BlockType[type];
  this.rotationState = 0;
  this.cells = [];
  this.position = position;
  this.pivot = new Position(0, 0);
  this.width = 0;
  this.height = 0;
  this.updateCellLayout();
}

Block.prototype.updateCellLayout = function() {
  var cellLayout = this.type.orientations[this.rotationState];
  this.height = cellLayout.length;
  this.width = cellLayout[0].length;
  for (var i = 0; i < this.height; i++) {
    this.cells[i] = [];
    for (var j = 0; j < this.width; j++) {
      if (cellLayout[i][j] !== 0 ) {
        this.cells[i][j] = new Cell();
        if (cellLayout[i][j] === -1) {
          this.pivot.x = j;
          this.pivot.y = i;
        }
      }
      else {
        this.cells[i][j] = null;
      }
    }
  }
}

Block.prototype.rotate = function() {
  this.rotationState++;
  this.rotationState %= this.type.orientations.length;
  this.updateCellLayout();
}

Block.prototype.isInBounds = function() {
  var topLeft = new Position(this.position.x - this.pivot.x, this.position.y - this.pivot.y);
  var bottomRight = new Position(topLeft.x + this.width, topLeft.y + this.height);
  if (topLeft.isInBounds() && bottomRight.isInBounds()) {
    return true;
  }
  return false;
}

// TODO: Update to use BlockType keys to avoid hardcoding cases
Block.randomBlock = function() {
  var position = Screen.spawnPosition;
  var random = Math.floor(7 * Math.random());
  switch (random) {
    case 0:
      return new Block("I", position);
      break;
    case 1:
      return new Block("T", position);
      break;
    case 2:
      return new Block("O", position);
      break;
    case 3:
      return new Block("L", position);
      break;
    case 4:
      return new Block("J", position);
      break;
    case 5:
      return new Block("Z", position);
      break;
    case 6:
      return new Block("S", position);
      break;
    default:
      return null;
  }
}

function BlockType(name) {
  this.name = name;
    this.orientations = [];
}
// Hardcoded block types and rotation states
// 1 = block
// 0 = no block
// -1 = pivot point
BlockType.I = new BlockType("I");
BlockType.I.orientations[0] = [
  [1, -1, 1, 1]
];
BlockType.I.orientations[1] = [
  [1],
  [1],
  [-1],
  [1]
];

BlockType.T = new BlockType("T");
BlockType.T.orientations[0] = [
  [1, -1, 1],
  [0, 1, 0]
];
BlockType.T.orientations[1] = [
  [0, 1],
  [1, -1],
  [0, 1]
];
BlockType.T.orientations[2] = [
  [0, 1, 0],
  [1, -1, 1]
];
BlockType.T.orientations[3] = [
  [1, 0],
  [-1, 1],
  [1, 0]
];

BlockType.O = new BlockType("O");
BlockType.O.orientations[0] = [
  [1, 1],
  [1, 1]
];

BlockType.L = new BlockType("L");
BlockType.L.orientations[0] = [
  [1, -1, 1],
  [1, 0, 0]
];
BlockType.L.orientations[1] = [
  [1, 1],
  [0, -1],
  [0, 1]
];
BlockType.L.orientations[2] = [
  [0, 0, 1],
  [1, -1, 1]
];
BlockType.L.orientations[3] = [
  [1, 0],
  [-1, 0],
  [1, 1]
];

BlockType.J = new BlockType("J");
BlockType.J.orientations[0] = [
  [1, -1, 1],
  [0, 0, 1]
];
BlockType.J.orientations[1] = [
  [0, 1],
  [0, -1],
  [1, 1]
];
BlockType.J.orientations[2] = [
  [1, 0, 0],
  [1, -1, 1]
];
BlockType.J.orientations[3] = [
  [1, 1],
  [-1, 0],
  [1, 0]
];

BlockType.Z = new BlockType("Z");
BlockType.Z.orientations[0] = [
  [1, -1, 0],
  [0, 1, 1]
];
BlockType.Z.orientations[1] = [
  [0, 1],
  [-1, 1],
  [1, 0]
];

BlockType.S = new BlockType("S");
BlockType.S.orientations[0] = [
  [0, -1, 1],
  [1, 1, 0]
];
BlockType.S.orientations[1] = [
  [1, 0],
  [1, -1],
  [0, 1]
];

function Cell() {
  // Hold info about color, etc
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
    // console.log("draw");
  }
}

UserInterface.prototype.updateHtml = function() {
  for (var i = 0; i < Screen.height; i++) {
    for (var j = 0; j < Screen.width; j++) {
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
  var drawInterval = setInterval(ui.drawUpdate.bind(ui), 16);
  var pause = false;
  var possible = false;
  // Keypresses
  document.onkeydown = function(event) {
    var key = event.code;
    if (key === "ArrowRight") {
      screen.moveActiveBlock("right");
    }
    else if (key === "ArrowLeft") {
      screen.moveActiveBlock("left");
    }
    else if (key === "ArrowUp") {
      screen.rotateActiveBlock();
    }
  }

  // Audio
  var theme = new Audio('sounds/theme.mp3');
  var isPlaying = true;
  theme.loop = true;
  var startSound = new Audio('sounds/beep8.wav');
  // theme.play();

  // Buttons
  $("#start-button").click(function(){
    pause = true;
    possible = true;
    startSound.play();
    $(".start-menu").slideUp(1000);
    $(".board").slideDown();
    $(".col-md-3").slideDown();
  });
  $("#control-button").click(function(){
    $("#controls").show();
    $("#instructions").hide();
  });
  $("#instructions-button").click(function(){
    $("#instructions").show();
    $("#controls").hide();
  });
  $("#resume-button").click(function(){
    $(".score").slideDown();
    $(".middle").slideDown();
    $(".text-pause").slideUp(1000);
    $("#miniTitle").slideDown();
    theme.play();
    pause = true;
  });
  document.onkeypress = function(p) {
    // console.log(p);
    if (possible === true) {
      if (p.code === "KeyP") {
        startSound.play();
        if (pause === true) {
          $(".score").slideUp(1000);
          $(".middle").slideUp(1000);
          $(".text-pause").slideDown();
          $("#miniTitle").slideUp(1000);
          theme.pause();
          pause = false;
        } else {
          $(".score").slideDown();
          $(".middle").slideDown();
          $(".text-pause").slideUp(1000);
          $("#miniTitle").slideDown();
          theme.play();
          pause = true;
        }
      }
      if (p.code === "KeyR") {
        location.reload();
      }
      if (p.code === "KeyM") {
        startSound.play();
        if (isPlaying) {
          theme.pause();
          isPlaying = false;
        } else {
          theme.play();
          isPlaying = true;
        }
      }
    } else {
      if (p.code === "Enter") {
        $("#start-button").click();
      }
    }
  };
});
