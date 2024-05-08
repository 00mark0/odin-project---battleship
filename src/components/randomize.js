import { playerBoard } from "./dragDrop";
import Ship from "./ship";

export function randomizePlayerPlacement() {
  const shipLengths = [5, 4, 3, 3, 2];
  const gridWidth = 10;
  let grid = Array(gridWidth)
    .fill()
    .map(() => Array(gridWidth).fill(false)); // Create a 2D array

  // clear the board and the grid
  document.querySelectorAll(".cell").forEach((cell) => {
    cell.classList.remove("occupied");
  });

  // clear the playerBoard and reset the grid
  playerBoard.resetBoard();
  grid = Array(gridWidth)
    .fill()
    .map(() => Array(gridWidth).fill(false));

  shipLengths.forEach((length) => {
    let placed = false;

    while (!placed) {
      const orientation = Math.random() < 0.5 ? "horizontal" : "vertical";
      const row = Math.floor(Math.random() * gridWidth);
      const col = Math.floor(Math.random() * gridWidth);

      // check if the ship can be placed
      let canPlace = true;
      for (let i = 0; i < length; i++) {
        let targetRow = orientation === "horizontal" ? row : row + i;
        let targetCol = orientation === "horizontal" ? col + i : col;

        if (
          targetRow >= gridWidth ||
          targetCol >= gridWidth ||
          grid[targetRow][targetCol]
        ) {
          canPlace = false;
          break;
        }
      }

      if (canPlace) {
        const ship = new Ship(length);
        playerBoard.placeShip(ship, [row, col], orientation);
        placed = true;

        // mark cells as occupied
        for (let i = 0; i < length; i++) {
          let targetRow = orientation === "horizontal" ? row : row + i;
          let targetCol = orientation === "horizontal" ? col + i : col;
          grid[targetRow][targetCol] = true;

          let targetIndex = targetRow * gridWidth + targetCol;
          let targetCell = document.querySelector(
            `.cell[data-index="${targetIndex}"]`
          );
          targetCell.classList.add("occupied");
        }
      }
    }
  });

  // hide ship elements
  document.querySelectorAll(".ship").forEach((ship) => {
    ship.style.display = "none";
  });
}
