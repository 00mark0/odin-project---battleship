import initDomElements from "./domElements";
import { playerBoard } from "./dragDrop";
import { initBoard } from "./initBoard";
import { handleDragStart, handleDragOver, handleDrop } from "./dragDrop";

export function restartGame() {
  let domElements = initDomElements();

  playerBoard.resetBoard();

  domElements.playerGrid.innerHTML = "";
  domElements.computerGrid.innerHTML = "";

  initBoard(domElements);

  domElements.menuItem.style.display = "block";
  domElements.rotate.style.display = "block";
  domElements.start.style.display = "block";
  domElements.randomize.style.display = "block";
  domElements.backToMenu.style.display = "block";
  domElements.gameInfo.textContent = "";

  domElements.ship.forEach((ship) => {
    ship.style.display = "block";
  });

  domElements.ship.forEach((ship) => {
    ship.addEventListener("dragstart", handleDragStart);
  });

  let cellsAfterReset = document.querySelectorAll(".cell");

  cellsAfterReset.forEach((cell) => {
    cell.addEventListener("dragover", handleDragOver);
    cell.addEventListener("drop", handleDrop);
  });

  console.clear();
}
