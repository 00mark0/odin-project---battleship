import gameSetupHTML from "./gameSetupHTML";
import initDomElements from "./domElements";
import { rotateShip } from "./rotateShip";
import { mobileRandomize } from "./mobileRandomize";
import { initBoard } from "./initBoard";
import { menuPage } from "../main";
import { playerBoard } from "./dragDrop";
import { mobilePlayGame } from "./mobilePlayGame";
import { mobileShipPlacement } from "./mobileShipPlacement";
import { restartGameMobile } from "./restartGameMobile";

export function mobileSetup() {
  const app = document.getElementById("app");
  app.innerHTML = gameSetupHTML;

  let domElements = initDomElements();

  initBoard(domElements);

  let cells = document.querySelectorAll(".cell");

  cells.forEach((cell) => {
    cell.addEventListener("click", mobileShipPlacement);
  });

  domElements.rotate.addEventListener("click", rotateShip);

  domElements.randomize.addEventListener("click", mobileRandomize);

  domElements.restart.addEventListener("click", restartGameMobile);

  domElements.backToMenu.addEventListener("click", () => {
    menuPage();
    playerBoard.resetBoard();
  });

  domElements.start.addEventListener("click", mobilePlayGame);
}
