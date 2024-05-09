import initDomElements from "./domElements";
import { mobilePlayerBoard } from "./mobileShipPlacement";
import { initBoard } from "./initBoard";
import { mobileShipPlacement } from "./mobileShipPlacement";
import { shipIndex } from "./mobileShipPlacement";

export function restartGameMobile() {
  let domElements = initDomElements();

  mobilePlayerBoard.resetBoard();

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

  let cellsAfterReset = document.querySelectorAll(".cell");

  shipIndex.value = 0;

  cellsAfterReset.forEach((cell) => {
    cell.addEventListener("click", mobileShipPlacement);
  });

  console.clear();
}
