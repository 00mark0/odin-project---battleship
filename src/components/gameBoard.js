// battleship game board class

class GameBoard {
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

    if (target === null) {
      this.board[attackRow][attackCol] = "miss";
      return false;
    } else if (target === "miss" || target === "hit") {
      return false;
    } else {
      // correctly calculate the hit position based on ship's orientation and starting position
      const shipInfo = this.ships.find((shipInfo) => shipInfo.ship === target);
      const [startRow, startCol] = shipInfo.startPosition;
      const hitPosition =
        shipInfo.direction === "horizontal"
          ? attackCol - startCol
          : attackRow - startRow;

      target.hit(hitPosition);
      this.board[attackRow][attackCol] = "hit";
      return true;
    }
  }

  allSunk() {
    return this.ships.every((shipInfo) => shipInfo.ship.isSunk());
  }
}

export default GameBoard;
