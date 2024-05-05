import gameMenuHTML from "./components/gameMenuHTML";
import initDomElements from "./components/domElements";
import gameSetupHTML from "./components/gameSetupHTML";
import Ship from "./components/ship";
import GameBoard from "./components/gameBoard";
import initBoard from "./components/initBoard";
import "./styles/style.css";

const app = document.getElementById("app");

function menuPage() {
  app.innerHTML = gameMenuHTML;
  let domElements = initDomElements();

  domElements.startGame.addEventListener("click", () => {
    setupPage();
  });
}

function setupPage() {
  app.innerHTML = gameSetupHTML;
  let domElements = initDomElements();
  const gameBoard = new GameBoard();
  initBoard(gameBoard, initDomElements);

  domElements.backToMenu.addEventListener("click", () => {
    menuPage();
  });
}

menuPage();
