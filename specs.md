# Specs

|behavior|input|output|
|----|----|----|
|Has a start button|Press button|Game starts|
|Can display game board|Press start|Tetris board displays|
|Can draw a block to the screen|When board displays|Draw a block|
|Can draw a random block every time| When board displays|Draw random block|
|Blocks can move|Left arrow key| moves block|
|Blocks stay in screen boundaries|Blocks hit edge of screen| Blocks cannot move any further|
|Blocks can rotate in place|Press up arrow key| Rotates block|
|Blocks fall constantly from top center|When board displays| block falls from top center|
|Can detect when lands on bottom edge of board| Block hits bottom| Block stops moving|
|Can spawn another block when old one is stopped| Block hits bottom| New block spawns|
|Can detect when it hits other blocks| block hits another block| block stops|
|Can check if row is filled|All bottom squares are filled|Row disappears
|Can drop blocks after row disappears|Row disappears|All blocks drop|
|Can detect loss when blocks stack too high|Blocks hit top of board|You lose pops up|
|When loss happens reset button appears|You lose displays|Reset button appears|
|Adds points to score when line is cleared| line is cleared| points added|
|Increase speed for every 10 lines cleared| 10th line cleared| speed increases by unit of 1|


# Workflow
#### Backend
* game generated, holds all other things
* round generated
* pieces and screen
* blocks generated from pieces
* blocks pushed to screen array
* array 10 long 20 high for screen
* block types:
[[4]] Line,
[[2],[2]] Square,
[[010],[3]] Half-plus,
[[1,0],[1,0],[2]] Right-L,
[[0,1],[0,1],[2]] Wrong-L,
[[1,1,0],[0,1,1]] Right-Z,
[[0,1,1],[1,1,0]] Wrong-Z.
* hit detection, if hits 1 its a collision.

#### Frontend
* divs that correspond to screen array that change when class added

when array 10,20 === 1, addClass(color black);


## Wants

* scoreboard (level, lines cleared, colored, show next piece)
* spacebar drops instantly
* colored blocks (Add 3d effect)
* pause menu
* sounds
* music

## Wish-list

* see your whole game replayed in fast-forward
* different themes
* different gamemodes
* animations
* save game
* animated start menu


# Checklist

* [X] Make Tetris board for front end.
* [x] Make start menu.
* [x] Make side bars.
  * [x] Score placeholder.
  * [x] Level placeholder.
  * [x] Lines placeholder.
  * [x] Next block placeholder.
