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
    this.lastHit = null;
    this.missStreak = 0;
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

      if (attackResult === "sunk") {
        domElements.playerInfo.textContent = "CPU sank your ship!";
        domElements.playerInfo.style.display = "block";

        setTimeout(function () {
          domElements.playerInfo.textContent = "";
          domElements.playerInfo.style.display = "none";
        }, 3000);
      }

      if (attackResult !== undefined) {
        break;
      }
    }
    return [row, col, attackResult];
  }

  mediumAttack(playerBoard) {
    let row, col;
    let attackResult;
    let domElements = initDomElements();

    // get all cells that have not been attacked yet
    let nonAttackedCells = [];

    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        if (!this.attackedCells.has(`${i},${j}`)) {
          nonAttackedCells.push([i, j]);
        }
      }
    }

    // decide whether to hit or miss based on a random number
    let randomNumber = Math.random();

    // filter cells based on whether they contain a ship or not
    let cellsWithShips = nonAttackedCells.filter(
      ([i, j]) => playerBoard.board[i][j] !== null
    );
    let cellsWithoutShips = nonAttackedCells.filter(
      ([i, j]) => playerBoard.board[i][j] === null
    );

    if (randomNumber < 0.3 && cellsWithShips.length > 0) {
      // choose a random cell that contains a ship
      let randomIndex = Math.floor(Math.random() * cellsWithShips.length);
      [row, col] = cellsWithShips[randomIndex];
    } else if (cellsWithoutShips.length > 0) {
      // choose a random cell that does not contain a ship
      let randomIndex = Math.floor(Math.random() * cellsWithoutShips.length);
      [row, col] = cellsWithoutShips[randomIndex];
    } else {
      // all cells have been attacked
      return null;
    }

    // attack the chosen cell
    attackResult = playerBoard.receiveAttack([row, col]);
    this.attackedCells.add(`${row},${col}`);

    if (attackResult === "sunk") {
      domElements.playerInfo.textContent = "CPU sank your ship!";
      domElements.playerInfo.style.display = "block";

      setTimeout(function () {
        domElements.playerInfo.textContent = "";
        domElements.playerInfo.style.display = "none";
      }, 3000);
    }

    return [row, col, attackResult];
  }

  hardAttack(playerBoard) {
    let row, col;
    let attackResult;
    let domElements = initDomElements();

    // get all cells that have not been attacked yet
    let nonAttackedCells = [];

    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        if (!this.attackedCells.has(`${i},${j}`)) {
          nonAttackedCells.push([i, j]);
        }
      }
    }

    // decide whether to hit or miss based on a random number
    let randomNumber = Math.random();

    // filter cells based on whether they contain a ship or not
    let cellsWithShips = nonAttackedCells.filter(
      ([i, j]) => playerBoard.board[i][j] !== null
    );
    let cellsWithoutShips = nonAttackedCells.filter(
      ([i, j]) => playerBoard.board[i][j] === null
    );

    if (randomNumber < 0.6 && cellsWithShips.length > 0) {
      // choose a random cell that contains a ship
      let randomIndex = Math.floor(Math.random() * cellsWithShips.length);
      [row, col] = cellsWithShips[randomIndex];
    } else if (cellsWithoutShips.length > 0) {
      // choose a random cell that does not contain a ship
      let randomIndex = Math.floor(Math.random() * cellsWithoutShips.length);
      [row, col] = cellsWithoutShips[randomIndex];
    } else {
      // all cells have been attacked
      return null;
    }

    // attack the chosen cell
    attackResult = playerBoard.receiveAttack([row, col]);
    this.attackedCells.add(`${row},${col}`);

    if (attackResult === "sunk") {
      domElements.playerInfo.textContent = "CPU sank your ship!";
      domElements.playerInfo.style.display = "block";

      setTimeout(function () {
        domElements.playerInfo.textContent = "";
        domElements.playerInfo.style.display = "none";
      }, 3000);
    }

    return [row, col, attackResult];
  }
}
