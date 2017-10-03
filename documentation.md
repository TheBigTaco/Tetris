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

Moves the active block either left or right one unit depending on passed in argument

| Argument | Description |
|:---|:---|
| `direction` | either the string "left" or "right" representing the direction to move the block |


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

_none_

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
| `.cells` | 2D array of Cells according to the game state. Value of `null` means no cell. |
| `.type` | String corresponding to the tetromino type of the block |
| `.position` | `Position` object representing where the block is on the screen |
| `.height` | height of the block |
| `.width` | width of the block |

#### Methods

(static) `Block.RandomBlock()`

Generates a random `Block` object

| Argument | Description |
|:---|:---|
| _none_ | - |

---

## Cell

Single square of the play area

#### Properties

_none_

#### Methods

_none_

---
