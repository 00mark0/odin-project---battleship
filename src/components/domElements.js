const initDomElements = () => ({
  gameMenu: document.querySelector(".game-menu"),
  pressKey: document.querySelector("#press-key"),
  difficulty: document.querySelector("#difficulty"),
  gameSetup: document.querySelector(".game-setup"),
  gridContainer: document.querySelector(".grid-container"),
  gameInfoContainer: document.querySelector(".game-info-container"),
  gameInfo: document.querySelector("#game-info"),
  playerGrid: document.querySelector(".player-grid"),
  playerInfo: document.querySelector("#player-info"),
  cpuInfo: document.querySelector("#cpu-info"),
  computerGrid: document.querySelector(".computer-grid"),
  ships: document.querySelector(".ships"),
  ship: document.querySelectorAll(".ship"),
  buttons: document.querySelector(".buttons"),
  menuItem: document.querySelector(".menu-item"),
  rotate: document.querySelector("#rotate"),
  start: document.querySelector("#start"),
  randomize: document.querySelector("#randomize"),
  restart: document.querySelector("#restart"),
  backToMenu: document.querySelector("#back-to-menu"),
});

export default initDomElements;
