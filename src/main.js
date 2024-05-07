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
import "./styles/style.css";

const app = document.getElementById("app");

function menuPage() {
  app.innerHTML = gameMenuHTML;
  let domElements = initDomElements();

  domElements.startGame.addEventListener("click", setupPage);
}

function setupPage() {
  app.innerHTML = gameSetupHTML;
  let domElements = initDomElements();

  domElements.addNameButton.addEventListener("click", () => {
    domElements.playerName.textContent = domElements.nameInput.value;
  });

  initBoard(domElements);

  let cells = document.querySelectorAll(".cell");

  domElements.rotate.addEventListener("click", () => {
    domElements.ship.forEach((ship) => {
      rotateShip(ship);
    });
  });

  domElements.ship.forEach((ship) => {
    ship.addEventListener("dragstart", handleDragStart);
  });

  cells.forEach((cell) => {
    cell.addEventListener("dragover", handleDragOver);
    cell.addEventListener("drop", handleDrop);
  });

  domElements.start.addEventListener("click", () => {
    if (playerBoard.ships.length < 5) {
      alert("Please place all ships.");
      return;
    }

    playGame();
  });

  domElements.restart.addEventListener("click", () => {
    playerBoard.resetBoard();
    domElements.playerGrid.innerHTML = "";
    domElements.computerGrid.innerHTML = "";
    initBoard(domElements);
  });

  domElements.backToMenu.addEventListener("click", () => {
    menuPage();
    playerBoard.resetBoard();
  });
}

menuPage();
