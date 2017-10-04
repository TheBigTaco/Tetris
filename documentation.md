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
| `.screen` | the `Screen` associated with the current round |

#### Methods

_none_

---

## Screen

Contains all objects to be displayed on the screen. (0, 0) is top-left.

#### Constructor

`Screen()`

| Arguments | Description |
|:---|:---|
| _none_ | - |

#### Properties

| Property | Description |
|:---|:---|
| `.cells` | 2D array of `Cells` according to the game state. Value of `null` means no cell. |
| `.activeBlock` | Current block being controlled by the player |
| `.nextBlock` | Block next in line to be spawned |
| `.width` | width of the screen in Cells |
| `.height` | height of the screen in Cells |
| `.requireRedraw` | set to true or false depending on if the UI needs to redraw the screen |

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

`.moveActiveBlock(direction)`

Moves the active block either left or right one unit depending on passed in argument, unless it would move out of bounds

| Argument | Description |
|:---|:---|
| `direction` | either the string "left" or "right" representing the direction to move the block |

`.rotateActiveBlock()`

Rotates the active block in place, unless it would become out of bounds

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

Returns `true` if the `Position` is in the screen bounds

| Argument | Description |
|:---|:---|
| _none_ | - |


---

## Block

Collection of `Cells` in a particular tetromino shape.

#### Constructor

`Block(type)`

| Arguments | Description |
|:---|:---|
| type | string of either `'I'`, `'T'`, `'O'`, `'L'`, `'J'`, `'Z'`, or `'S'` denoting type of block to spawn |

#### Properties

| Property | Description |
|:---|:---|
| `.type` | `BlockType` object containing information about the kind of tetromino |
| `.rotationState` | Number from `0-3` describing current rotation of the `Block`, in terms of number of 90 degree clockwise turns |
| `.cells` | 2D array of `Cells` according to the game state. Value of `null` means no cell. |
| `.position` | `Position` object representing where the block is on the screen |
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

`isInBounds()`

Returns `true` if the block is within the screen boundary

| Argument | Description |
|:---|:---|
| _none_ | - |

(static) `Block.RandomBlock()`

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
