function initBoard(gameBoard, dom) {
  let domElements = dom();
  let playerGrid = domElements.playerGrid;
  let computerGrid = domElements.computerGrid;

  for (let i = 0; i < 100; i++) {
    let cell = document.createElement("div");
    cell.classList.add("cell");
    playerGrid.appendChild(cell);
  }

  for (let i = 0; i < 100; i++) {
    let cell = document.createElement("div");
    cell.classList.add("cell");
    computerGrid.appendChild(cell);
  }

  let cells = document.querySelectorAll(".cell");

  cells.forEach((cell, index) => {
    cell.addEventListener("click", () => {
      gameBoard.receiveAttack([Math.floor(index / 10), index % 10]);
      console.log(gameBoard.board);
    });
  });
}

export default initBoard;
