# Tetris Object Documentation

## Game

Handles loading the actual game, starting `Rounds`, opening Menus, etc

#### Constructor

`Game()`

| Arguments | Description |
|:---|:---|
| _none_ | - |

#### Properties

| Property | Description |
|:---|:---|
| `.round` | currently running `Round` object |

#### Methods

_none_

---

## Round

Handles actual gameplay logic

#### Constructor

`Round()`

| Arguments | Description |
|:---|:---|
| _none_ | - |


#### Properties

| Property | Description |
|:---|:---|
| `.player` | the `Player` playing this round |
| `.screen` | the `Screen` displaying this round's play field |
| `.timeSinceLastFall` | time since last block drop |
| `.lastTickTime` | last unicode time `tick()` was run |

#### Methods

`.start()`

Initializes round and starts game tick

| Argument | Description |
|:---|:---|
| _none_ | - |

`.gameOver()`

Ends the round and stops game tick

| Argument | Description |
|:---|:---|
| _none_ | - |

`.tick()`

Main game tick that handles all timed game events

| Argument | Description |
|:---|:---|
| _none_ | - |

---

## Player

Tracks player data

#### Constructor

`Player()`

| Arguments | Description |
|:---|:---|
| _none_ | - |


#### Properties

| Property | Description |
|:---|:---|
| `.keyPress` | object with keys corresponding to key press actions. Valid keys are `left`, `right`, `down`, `rotate`, `pause` |
| `.score` | player score |
| `.level` | player level from 1-10 determining speed of falling blocks. increases by 1 for every 5 cleared rows |
| `.fallInterval` | millisecond delay before spawning new block for the player |
| `.rowsCleared` | total number of lines cleared by the player |
| `.consecutiveTerises` | current run of consecutive tetrises (4 lines cleared simultaneously) |
| `.isPaused` | `true` if this player has paused the game |
| `.gameOver` | `true` if this player's game has ended |

#### Methods

`.updateScore(numRowsCleared)`

Calculates player score increase based on number of rows cleared. Also increments `rowsCleared` and calculates new `level` and `fallInterval` when necessary.

| Argument | Description |
|:---|:---|
| `numRowsCleared` | integer number of rows cleared simultaneously |


---

## Screen

Contains all objects to be displayed on the screen. (0, 0) is top-left.

#### Constructor

`Screen(player)`

| Arguments | Description |
|:---|:---|
| `player` | `Player` controlling the screen |

#### Properties

| Property | Description |
|:---|:---|
| `.player` | `Player` controlling this screen |
| `.cells` | 2D array of `Cells` according to the game state. Value of `null` means no cell. |
| `.requireRedraw` | set to true or false depending on if the UI needs to redraw the screen |
| `.activeBlock` | Current block being controlled by the player |
| `.nextBlock` | Block next in line to be spawned |
| `Screen.width` _(static)_ | width of the screen in Cells |
| `Screen.height` _(static)_ | height of the screen in Cells |
| `Screen.spawnPosition` _(static)_ | point from which new `Blocks` spawn |

#### Methods

`.spawnNextBlock()`

Spawns `nextBlock` at the top center of the board, and sets that block as the `activeBlock`.

| Argument | Description |
|:---|:---|
| _none_ | - |

`.materializeBlock(block)`

Adds the passed in `Block` to the `Cells` array.

| Argument | Description |
|:---|:---|
| `block` | block to be added to `Cells` |

`.dematerializeBlock(block)`

Removes the passed in `Block` from the `Cells` array.

| Argument | Description |
|:---|:---|
| `block` | block to be removed from `Cells` |

`.testMaterializeBlock(block)`

Returns `false` if drawing the block to the screen would cause collisions or otherwise be invalid

| Argument | Description |
|:---|:---|
| `block` | block to be tested |

`.checkClearedRows()`

Checks if any rows were cleared this tick and updates the game accordingly

| Argument | Description |
|:---|:---|
| _none_ | - |

`.clearRows(clearedRows)`

Clears the listed rows of any active `Cells`

| Argument | Description |
|:---|:---|
| `clearedRows` | array of indexes of the rows to be cleared |

`.moveActiveBlockDown()`

moves the `activeBlock` down one cell if it would not collide with screen edges or other filled cells

| Argument | Description |
|:---|:---|
| _none_ | - |

`.moveActiveBlockHorizontal(direction)`

Moves the `activeBlock` either left or right one unit depending on passed in argument, unless it would move out of bounds or collide with a filled cell

| Argument | Description |
|:---|:---|
| `direction` | either the string "left" or "right" representing the direction to move the block |

`.rotateActiveBlock()`

Rotates the active block in place, unless it would become out of bounds or overlap with a filled cell

| Argument | Description |
|:---|:---|
| _none_ | - |

---

## Position

Represents a 2D point on the game grid, with `(0, 0)` being the top-left.

#### Constructor

`Position(x, y)`

| Arguments | Description |
|:---|:---|
| `x` | initial x coordinate |
| `y` | initial y coordinate |

#### Properties

| Property | Description |
|:---|:---|
| `x` | current x coordinate |
| `y` | current y coordinate |

#### Methods

`.isInBounds()`

Returns `true` if the `Position` is in the gameplay bounds

| Argument | Description |
|:---|:---|
| _none_ | - |

`.isInBounds()`

Returns `true` if the `Position` is in the screen bounds

| Argument | Description |
|:---|:---|
| _none_ | - |


---

## Block

Collection of `Cells` in a particular tetromino shape.

#### Constructor

`Block(type, position)`

| Arguments | Description |
|:---|:---|
| type | string of either `'I'`, `'T'`, `'O'`, `'L'`, `'J'`, `'Z'`, or `'S'` denoting type of block to spawn |
| position | `Position` object denoting the `Block`'s initial position |

#### Properties

| Property | Description |
|:---|:---|
| `.type` | `BlockType` object containing information about the kind of tetromino |
| `.rotationState` | Number from `0-3` describing current rotation of the `Block`, in terms of number of 90 degree clockwise turns |
| `.cells` | 2D array of `Cells` according to the game state. Value of `null` means no cell. |
| `.position` | `Position` object representing where the block is on the screen |
| `.pivot` | `Position` object denoting the location of the `Block`'s pivot point in relation to its top-left corner |
| `.width` | width of the block |
| `.height` | height of the block |

#### Methods

`updateCellLayout()`

Updates the `Block`'s array of `Cells`, as well as its `width` and `height` based on its `BlockType` and current `rotationState`

| Argument | Description |
|:---|:---|
| _none_ | - |

`rotate()`

Rotates the block counterclockwise

| Argument | Description |
|:---|:---|
| _none_ | - |

`clone()`

Returns an exact copy of the `Block`

| Argument | Description |
|:---|:---|
| _none_ | - |

`isInBounds()`

Returns `true` if the block is within the screen boundary

| Argument | Description |
|:---|:---|
| _none_ | - |

`Block.RandomBlock()` _(static)_

Generates a random `Block` object

| Argument | Description |
|:---|:---|
| _none_ | - |

---

## BlockType

Object representing a certain kind of tetromino block and its possible rotations. Calling `BlockType[type]`, where `type` is a valid tetromino type gives a reference to a static `BlockType` object containing that tetromino's properties.

Valid tetronimo types are `'I'`, `'T'`, `'O'`, `'L'`, `'J'`, `'Z'`, or `'S'`

#### Constructor

`BlockType(type)`

| Arguments | Description |
|:---|:---|
| type | string of a valid tetronimo type |

_Note: this constructor is only used to create the static instances of each tetromino, and should not be called in other parts of the code_

#### Properties

| Property | Description |
|:---|:---|
| `.name` | single-letter string denoting the tetromino type |
| `.orientations` | Array of 2D arrays containing all possible tetromino rotations. Within each 2D array, `0` indicates no cell, `1` indicates a cell, and `-1` indicates the pivot cell (center of rotation) |

#### Methods

_none_

---

## Cell

Single square of the play area

#### Properties

_none_

#### Methods

_none_

---
