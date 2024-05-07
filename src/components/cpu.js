import GameBoard from "./gameBoard";
import Ship from "./ship";

export class Cpu {
  constructor() {
    this.board = new GameBoard();
    this.board.ships = [
      { ship: new Ship(5), startPosition: [0, 0], direction: "horizontal" },
      { ship: new Ship(4), startPosition: [0, 1], direction: "horizontal" },
      { ship: new Ship(3), startPosition: [0, 2], direction: "horizontal" },
      { ship: new Ship(3), startPosition: [0, 3], direction: "horizontal" },
      { ship: new Ship(2), startPosition: [0, 4], direction: "horizontal" },
    ];
    this.attackedCells = new Set();
    this.cellsToAttack = [];
    this.hitsStack = [];
  }

  placeShips() {
    for (let i = 0; i < this.board.ships.length; i++) {
      let row, col, direction;

      while (true) {
        // Generate a random start position and direction
        direction = Math.random() < 0.5 ? "horizontal" : "vertical";

        if (direction === "horizontal") {
          row = Math.floor(Math.random() * 10);
          col = Math.floor(
            Math.random() * (10 - this.board.ships[i].ship.length)
          );
        } else {
          row = Math.floor(
            Math.random() * (10 - this.board.ships[i].ship.length)
          );
          col = Math.floor(Math.random() * 10);
        }

        // Check if the chosen position is empty
        let isPositionEmpty = true;
        for (let j = 0; j < this.board.ships[i].ship.length; j++) {
          if (direction === "horizontal") {
            if (this.board.board[row][col + j] !== null) {
              isPositionEmpty = false;
              break;
            }
          } else {
            if (this.board.board[row + j][col] !== null) {
              isPositionEmpty = false;
              break;
            }
          }
        }

        // If the position is empty, place the ship
        if (isPositionEmpty) {
          // update the startPosition and direction of the ship
          this.board.ships[i].startPosition = [row, col];
          this.board.ships[i].direction = direction;
          break;
        }
      }

      // Place the ship
      for (let j = 0; j < this.board.ships[i].ship.length; j++) {
        if (direction === "horizontal") {
          this.board.board[row][col + j] = this.board.ships[i].ship;
        } else {
          this.board.board[row + j][col] = this.board.ships[i].ship;
        }
      }
    }
  }

  easyAttack(playerBoard) {
    let row, col;
    let attackResult;
    while (true) {
      row = Math.floor(Math.random() * 10);
      col = Math.floor(Math.random() * 10);
      let cellKey = `${row},${col}`;
      if (this.attackedCells.has(cellKey)) {
        continue;
      }
      this.attackedCells.add(cellKey);
      attackResult = playerBoard.receiveAttack([row, col]);
      if (attackResult !== undefined) {
        break;
      }
    }
    return [row, col, attackResult];
  }

  mediumAttack(playerBoard) {
    let row, col;
    let attackResult;
    let lastHit = Array.from(this.attackedCells).pop();
    if (lastHit && this.attackedCells.size % 2 === 0) {
      // Try an adjacent cell
      let [lastRow, lastCol] = lastHit.split(",").map(Number);
      let adjacentCells = [
        [lastRow - 1, lastCol],
        [lastRow + 1, lastCol],
        [lastRow, lastCol - 1],
        [lastRow, lastCol + 1],
      ];
      // Filter out cells that are out of bounds or have already been attacked
      adjacentCells = adjacentCells.filter(([row, col]) => {
        return (
          row >= 0 &&
          row < 10 &&
          col >= 0 &&
          col < 10 &&
          !this.attackedCells.has(`${row},${col}`)
        );
      });
      if (adjacentCells.length > 0) {
        // Choose a random adjacent cell
        [row, col] =
          adjacentCells[Math.floor(Math.random() * adjacentCells.length)];
      } else {
        // No valid adjacent cells, go back to random attacks
        do {
          row = Math.floor(Math.random() * 10);
          col = Math.floor(Math.random() * 10);
        } while (this.attackedCells.has(`${row},${col}`));
      }
    } else {
      // Random attack
      do {
        row = Math.floor(Math.random() * 10);
        col = Math.floor(Math.random() * 10);
      } while (this.attackedCells.has(`${row},${col}`));
    }
    this.attackedCells.add(`${row},${col}`);
    attackResult = playerBoard.receiveAttack([row, col]);
    return [row, col, attackResult];
  }

  hardAttack(playerBoard) {
    let row, col;
    let attackResult;

    if (this.hitsStack.length > 0) {
      let lastHit = this.hitsStack[0];
      if (lastHit.adjacentCells.length > 0) {
        [row, col] = lastHit.adjacentCells.pop();
      } else {
        this.hitsStack.shift();
        return this.hardAttack(playerBoard);
      }
    } else {
      do {
        row = Math.floor(Math.random() * 10);
        col = Math.floor(Math.random() * 10);
      } while (this.attackedCells.has(`${row},${col}`));
    }

    this.attackedCells.add(`${row},${col}`);
    attackResult = playerBoard.receiveAttack([row, col]);

    if (attackResult === "hit") {
      this.hitsStack = []; // Clear the stack
      let adjacentCells = [
        [row - 1, col],
        [row + 1, col],
        [row, col - 1],
        [row, col + 1],
      ];

      adjacentCells = adjacentCells.filter(([adjRow, adjCol]) => {
        return (
          adjRow >= 0 &&
          adjRow < 10 &&
          adjCol >= 0 &&
          adjCol < 10 &&
          !this.attackedCells.has(`${adjRow},${adjCol}`)
        );
      });

      this.hitsStack.push({ hit: [row, col], adjacentCells });
    }

    return [row, col, attackResult];
  }
}
