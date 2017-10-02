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

Contains all objects to be displayed on the screen. (0, 0) point is top-left.

#### Constructor

`Screen()`

| Arguments | Description |
|:---|:---|
| _none_ | - |

#### Properties

| Property | Description |
|:---|:---|
| `.blocks` | 2D array of `Blocks` according to the game state. Value of `null` means no block. |

#### Methods

| Property | Description |
|:---|:---|
| `.spawnPiece(x, y)` | Spawns a `Piece` at the provided (x, y) screen coordinate. |

---

## Piece

Collection of `Blocks` in a particular shape.

#### Constructor

`Piece(type)`

| Arguments | Description |
|:---|:---|
| type | string of either 'I', 'T', 'O', 'L', 'J', 'Z', or 'S' denoting type of piece to spawn |

#### Properties

| Property | Description |
|:---|:---|
| `.blocks` | 2D array of Blocks according to the game state. Value of `null` means no block. |

#### Methods

_none_

---

## Block

Single square of the play area

#### Properties

_none_

#### Methods

_none_

---

## Position

Represents a 2D point on the game grid

#### Properties

| Property | Description |
|:---|:---|
| `x` | x coordinate |
| `y` | y coordinate |

#### Methods

_none_

---
