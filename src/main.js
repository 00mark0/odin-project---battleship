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
import "./styles/style.css";

const app = document.getElementById("app");

function menuPage() {
  app.innerHTML = gameMenuHTML;

  window.addEventListener("keydown", setupPage);
}

function setupPage() {
  app.innerHTML = gameSetupHTML;
  let domElements = initDomElements();

  domElements.addNameButton.addEventListener("click", () => {
    domElements.playerName.textContent = domElements.nameInput.value;
  });

  domElements.nameInput.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
      domElements.playerName.textContent = domElements.nameInput.value;
    }
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
      domElements.gameInfo.textContent = "Please place all ships.";
      return;
    }

    domElements.gameInfo.textContent = "";

    let difficulty = domElements.difficulty.value;
    console.log(difficulty);

    domElements.addName.style.display = "none";
    domElements.menuItem.style.display = "none";
    domElements.rotate.style.display = "none";
    domElements.start.style.display = "none";
    domElements.randomize.style.display = "none";
    domElements.backToMenu.style.display = "none";

    domElements.restart.style.marginLeft = "25px";

    playGame(difficulty);
  });

  domElements.randomize.addEventListener("click", randomizePlayerPlacement);

  domElements.restart.addEventListener("click", () => {
    playerBoard.resetBoard();

    domElements.playerGrid.innerHTML = "";
    domElements.computerGrid.innerHTML = "";

    initBoard(domElements);

    domElements.addName.style.display = "block";
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
  });

  domElements.backToMenu.addEventListener("click", () => {
    menuPage();
    playerBoard.resetBoard();
  });

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      menuPage();
      playerBoard.resetBoard();
    }

    if (e.key === "r") {
      randomizePlayerPlacement();
    }
  });
}

menuPage();
