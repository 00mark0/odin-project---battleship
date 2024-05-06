import GameBoard from "./gameBoard";
import Ship from "./ship";

export class Cpu {
  constructor() {
    this.board = new GameBoard();
    this.ships = [
      { ship: new Ship(5), startPosition: [0, 0], direction: "horizontal" },
      { ship: new Ship(4), startPosition: [0, 1], direction: "horizontal" },
      { ship: new Ship(3), startPosition: [0, 2], direction: "horizontal" },
      { ship: new Ship(3), startPosition: [0, 3], direction: "horizontal" },
      { ship: new Ship(2), startPosition: [0, 4], direction: "horizontal" },
    ];
  }

  placeShips() {
    for (let i = 0; i < this.ships.length; i++) {
      let row, col, direction;

      while (true) {
        // Generate a random start position and direction
        direction = Math.random() < 0.5 ? "horizontal" : "vertical";

        if (direction === "horizontal") {
          row = Math.floor(Math.random() * 10);
          col = Math.floor(Math.random() * (10 - this.ships[i].ship.length));
        } else {
          row = Math.floor(Math.random() * (10 - this.ships[i].ship.length));
          col = Math.floor(Math.random() * 10);
        }

        // Check if the chosen position is empty
        let isPositionEmpty = true;
        for (let j = 0; j < this.ships[i].ship.length; j++) {
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
          break;
        }
      }

      // Place the ship
      for (let j = 0; j < this.ships[i].ship.length; j++) {
        if (direction === "horizontal") {
          this.board.board[row][col + j] = this.ships[i].ship;
        } else {
          this.board.board[row + j][col] = this.ships[i].ship;
        }
      }
    }
  }
}
