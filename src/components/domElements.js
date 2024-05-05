const initDomElements = () => ({
  gameMenu: document.querySelector(".game-menu"),
  menuItem: document.querySelector(".menu-item"),
  playerName: document.querySelector("#player-name"),
  difficulty: document.querySelector("#difficulty"),
  startGame: document.querySelector("#start-game"),
  gameSetup: document.querySelector(".game-setup"),
  gridContainer: document.querySelector(".grid-container"),
  playerGrid: document.querySelector(".player-grid"),
  computerGrid: document.querySelector(".computer-grid"),
  ships: document.querySelector(".ships"),
  ship: document.querySelectorAll(".ship"),
  buttons: document.querySelector(".buttons"),
  rotate: document.querySelector("#rotate"),
  start: document.querySelector("#start"),
  backToMenu: document.querySelector("#back-to-menu"),
});

export default initDomElements;
