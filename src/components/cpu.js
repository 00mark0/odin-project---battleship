import GameBoard from "./gameBoard";
import Ship from "./ship";
import initDomElements from "./domElements";

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
  }

  placeShips() {
    for (let i = 0; i < this.board.ships.length; i++) {
      let row, col, direction;

      while (true) {
        // generate a random start position and direction
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

        // check if the chosen position is empty
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

        // if the position is empty, place the ship
        if (isPositionEmpty) {
          // update the startPosition and direction of the ship
          this.board.ships[i].startPosition = [row, col];
          this.board.ships[i].direction = direction;
          break;
        }
      }

      // place the ship
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
    let domElements = initDomElements();

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

      if (attackResult === "sunk") {
        domElements.cpuInfo.textContent = "CPU sank a ship!";
        domElements.cpuInfo.style.display = "block";

        setTimeout(function () {
          domElements.cpuInfo.textContent = "";
          domElements.cpuInfo.style.display = "none";
        }, 3000);
      }
    }
    return [row, col, attackResult];
  }

  mediumAttack(playerBoard) {
    let row, col;
    let attackResult;

    if (this.lastHit) {
      // target mode
      let [lastRow, lastCol] = this.lastHit;
      let adjacentCells = [
        [lastRow - 1, lastCol],
        [lastRow + 1, lastCol],
        [lastRow, lastCol - 1],
        [lastRow, lastCol + 1],
      ];
      // filter out cells that are out of bounds or have already been attacked
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
        // choose a random cell from the valid adjacent cells
        let randomIndex = Math.floor(Math.random() * adjacentCells.length);
        [row, col] = adjacentCells[randomIndex];
      } else {
        // no valid adjacent cells, go back to hunt mode
        this.lastHit = null;
        do {
          row = Math.floor(Math.random() * 10);
          col = Math.floor(Math.random() * 10);
        } while (this.attackedCells.has(`${row},${col}`));
      }
    } else {
      // hunt mode
      do {
        row = Math.floor(Math.random() * 10);
        col = Math.floor(Math.random() * 10);
      } while (this.attackedCells.has(`${row},${col}`));
    }

    this.attackedCells.add(`${row},${col}`);
    attackResult = playerBoard.receiveAttack([row, col]);

    if (attackResult === "hit") {
      this.lastHit = [row, col];
    }

    if (attackResult === "sunk") {
      let domElements = initDomElements();
      domElements.cpuInfo.textContent = "CPU sank a ship!";
      domElements.cpuInfo.style.display = "block";

      setTimeout(function () {
        domElements.cpuInfo.textContent = "";
        domElements.cpuInfo.style.display = "none";
      }, 3000);
      this.lastHit = null;
    }

    return [row, col, attackResult];
  }

  hardAttack(playerBoard) {
    let row, col;
    let lastHit = Array.from(this.attackedCells).pop();
    if (lastHit) {
      // target mode
      let [lastRow, lastCol] = lastHit.split(",").map(Number);
      let adjacentCells = [
        [lastRow - 1, lastCol],
        [lastRow + 1, lastCol],
        [lastRow, lastCol - 1],
        [lastRow, lastCol + 1],
      ];
      // filter out cells that are out of bounds or have already been attacked
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
        // prioritize cells that are in the same direction as the last hit
        let direction = this.lastDirection || [0, 1]; // default to horizontal direction
        adjacentCells.sort(([row1, col1], [row2, col2]) => {
          let direction1 = [row1 - lastRow, col1 - lastCol];
          let direction2 = [row2 - lastRow, col2 - lastCol];
          return (
            Math.abs(direction1[0] - direction[0]) +
            Math.abs(direction1[1] - direction[1]) -
            (Math.abs(direction2[0] - direction[0]) +
              Math.abs(direction2[1] - direction[1]))
          );
        });
        // choose the first cell, which is the most prioritized
        [row, col] = adjacentCells[0];
        this.lastDirection = [row - lastRow, col - lastCol];
      } else {
        // no valid adjacent cells, go back to hunt mode
        do {
          row = Math.floor(Math.random() * 10);
          col = Math.floor(Math.random() * 10);
        } while (this.attackedCells.has(`${row},${col}`));
        this.lastDirection = null;
      }
    } else {
      // hunt mode
      do {
        row = Math.floor(Math.random() * 10);
        col = Math.floor(Math.random() * 10);
      } while (this.attackedCells.has(`${row},${col}`));
      this.lastDirection = null;
    }
    this.attackedCells.add(`${row},${col}`);
    let attackResult = playerBoard.receiveAttack([row, col]);

    if (attackResult === "hit") {
      this.lastHit = `${row},${col}`;
    }

    if (attackResult === "sunk") {
      let domElements = initDomElements();
      domElements.cpuInfo.textContent = "CPU sank a ship!";
      domElements.cpuInfo.style.display = "block";

      setTimeout(function () {
        domElements.cpuInfo.textContent = "";
        domElements.cpuInfo.style.display = "none";
      }, 3000);
      this.lastDirection = null;
    }

    return [row, col, attackResult];
  }
}
