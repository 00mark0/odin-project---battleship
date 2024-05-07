// battleship game board class

export class GameBoard {
  constructor() {
    this.board = Array.from({ length: 10 }, () => Array(10).fill(null)); // create a 10x10 2D array
    this.ships = [];
  }

  placeShip(ship, startPosition, direction) {
    const shipLength = ship.length;
    let [startRow, startCol] = startPosition; // assuming startPosition is an array [row, col]

    for (let i = 0; i < shipLength; i++) {
      if (direction === "horizontal") {
        if (startCol + i >= 10) {
          throw new Error("Ship placement out of bounds.");
        }
        if (this.board[startRow][startCol + i] !== null) {
          throw new Error("Position already occupied.");
        }
        this.board[startRow][startCol + i] = ship; // place part of the ship
      } else if (direction === "vertical") {
        if (startRow + i >= 10) {
          throw new Error("Ship placement out of bounds.");
        }
        if (this.board[startRow + i][startCol] !== null) {
          throw new Error("Position already occupied.");
        }
        this.board[startRow + i][startCol] = ship; // place part of the ship
      }
    }

    // add the ship to the ships array with its starting position and direction
    this.ships.push({ ship, startPosition, direction });
  }

  receiveAttack(position) {
    let [attackRow, attackCol] = position;
    let target = this.board[attackRow][attackCol];

    if (target === "hit" || target === "miss") {
      return undefined;
    } else if (target === null) {
      this.board[attackRow][attackCol] = "miss";
      return false;
    } else if (target && target.type === "ship") {
      // Calculate the hit position relative to the start of the ship
      let shipInfo = this.ships.find((shipInfo) => shipInfo.ship === target);
      let hitPosition;
      if (shipInfo.direction === "horizontal") {
        hitPosition = attackCol - shipInfo.startPosition[1];
      } else {
        // shipInfo.direction === "vertical"
        hitPosition = attackRow - shipInfo.startPosition[0];
      }

      // Call the hit method with the hit position
      target.hit(hitPosition);
      this.board[attackRow][attackCol] = "hit";

      // Check if the ship is sunk
      if (target.isSunk()) {
        console.log("You sunk my battleship!");
      }

      return true;
    } else {
      return false;
    }
  }

  allSunk() {
    return this.ships.every((shipInfo) => shipInfo.ship.isSunk());
  }

  resetBoard() {
    this.board = Array.from({ length: 10 }, () => Array(10).fill(null));
    this.ships = [];
  }
}

export default GameBoard;
