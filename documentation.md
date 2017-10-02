# Tetris Documentation

## Game

Handles loading the actual game, starting `Rounds`, opening Menus, etc

#### Properties

| Property | Description |
|:---|:---|
| .round | currently running `Round` object |

#### Methods

_none_

---

## Round

Handles actual gameplay logic

#### Properties

| Property | Description |
|:---|:---|
| .screen | the `Screen` associated with the current round |

#### Methods

_none_

---

## Screen

Tracks which blocks are currently active

#### Properties

| Property | Description |
|:---|:---|
| .blocks | 2D array of `Blocks` according to the game state. Value of `null` means no block. |

#### Methods

| Property | Description |
|:---|:---|
| .spawnPiece(x, y) | Spawns a `Piece` at the provided (x, y) screen coordinate. |

---

## Piece

Collection of `Blocks` in a particular shape.

#### Properties

| Property | Description |
|:---|:---|
| .blocks | 2D array of Blocks according to the game state. Value of `null` means no block. |

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
