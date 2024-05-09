import gameMenuHTML from "./components/gameMenuHTML";
import initDomElements from "./components/domElements";
import gameSetupHTML from "./components/gameSetupHTML";
import { initBoard } from "./components/initBoard";
import {
  handleDragStart,
  handleDragOver,
  handleDrop,
} from "./components/dragDrop";
import { rotateShip } from "./components/rotateShip";
import { playerBoard } from "./components/dragDrop";
import { playGame } from "./components/playGame";
import { randomizePlayerPlacement } from "./components/randomize";
import { restartGame } from "./components/restart";
import { handleKeyDown } from "./components/keyboardSupport";
import "./styles/style.css";

const app = document.getElementById("app");

export function menuPage() {
  app.innerHTML = gameMenuHTML;
  let domElements = initDomElements();

  window.addEventListener("keydown", setupPage);

  if (domElements.mobileButton) {
    domElements.mobileButton.addEventListener("click", setupPage);
  }
}

function setupPage() {
  app.innerHTML = gameSetupHTML;
  let domElements = initDomElements();

  initBoard(domElements);

  let cells = document.querySelectorAll(".cell");

  domElements.rotate.addEventListener("click", rotateShip);

  domElements.ship.forEach((ship) => {
    ship.addEventListener("dragstart", handleDragStart);
  });

  cells.forEach((cell) => {
    cell.addEventListener("dragover", handleDragOver);
    cell.addEventListener("drop", handleDrop);
  });

  domElements.randomize.addEventListener("click", randomizePlayerPlacement);

  domElements.restart.addEventListener("click", restartGame);

  domElements.backToMenu.addEventListener("click", () => {
    menuPage();
    playerBoard.resetBoard();
  });

  window.addEventListener("keydown", handleKeyDown);

  domElements.start.addEventListener("click", playGame);
}

menuPage();
