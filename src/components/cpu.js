import GameBoard from "./gameBoard";
import Ship from "./ship";
import { playerBoard } from "./dragDrop";

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

  randomAttack(playerBoard) {
    let row, col;
    let attackResult;
    while (true) {
      row = Math.floor(Math.random() * 10);
      col = Math.floor(Math.random() * 10);
      attackResult = playerBoard.receiveAttack([row, col]);
      if (attackResult !== undefined) {
        break;
      }
    }
    return [row, col, attackResult];
  }
}
