const initDomElements = () => ({
  gameMenu: document.querySelector(".game-menu"),
  menuItem: document.querySelector(".menu-item"),
  difficulty: document.querySelector("#difficulty"),
  startGame: document.querySelector("#start-game"),
  gameSetup: document.querySelector(".game-setup"),
  gridContainer: document.querySelector(".grid-container"),
  playerGrid: document.querySelector(".player-grid"),
  playerName: document.querySelector("#player-name"),
  computerGrid: document.querySelector(".computer-grid"),
  ships: document.querySelector(".ships"),
  ship: document.querySelectorAll(".ship"),
  buttons: document.querySelector(".buttons"),
  addName: document.querySelector(".add-name"),
  nameInput: document.querySelector("#name-input"),
  addNameButton: document.querySelector("#add-name"),
  rotate: document.querySelector("#rotate"),
  start: document.querySelector("#start"),
  backToMenu: document.querySelector("#back-to-menu"),
});

export default initDomElements;