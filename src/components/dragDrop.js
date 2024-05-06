import { GameBoard } from "./gameBoard";
import { Ship } from "./ship";

export function handleDragStart(e) {
  e.dataTransfer.setData("text/plain", e.target.id);
}

export function handleDragOver(e) {
  e.preventDefault();
}

export const playerBoard = new GameBoard();

export function handleDrop(e) {
  e.preventDefault();
  const shipId = e.dataTransfer.getData("text/plain");
  const shipElement = document.getElementById(shipId);
  const shipLength = parseInt(shipElement.getAttribute("data-length"), 10);
  const isHorizontal = !shipElement.classList.contains("rotate");
  const dropIndex = parseInt(e.target.getAttribute("data-index"), 10);

  const gridWidth = 10;
  const row = Math.floor(dropIndex / gridWidth);
  const col = dropIndex % gridWidth;

  // correctly calculate starting position
  if (isHorizontal) {
    if (col + shipLength <= gridWidth) {
      // check bounds for horizontal placement
      const ship = new Ship(shipLength);
      playerBoard.placeShip(ship, [row, col], "horizontal");
      console.log("player:", playerBoard.board);
      shipElement.style.display = "none"; // hide ship after placement
      // mark cells as occupied (example logic)
      for (let i = 0; i < shipLength; i++) {
        let targetCell = document.querySelector(
          `.cell[data-index="${dropIndex + i}"]`
        );
        targetCell.classList.add("occupied");
      }
    } else {
      console.error("Ship placement out of bounds.");
    }
  } else {
    // additional logic for vertical placement (needs similar correction)
    if (row + shipLength <= gridWidth) {
      const ship = new Ship(shipLength);
      playerBoard.placeShip(ship, [row, col], "vertical");
      console.log("player:", playerBoard.board);
      shipElement.style.display = "none"; // hide ship after placement
      // mark cells as occupied (example logic)
      for (let i = 0; i < shipLength; i++) {
        let targetCell = document.querySelector(
          `.cell[data-index="${dropIndex + i * gridWidth}"]`
        );
        targetCell.classList.add("occupied");
      }
    } else {
      console.error("Ship placement out of bounds.");
    }
  }
}
