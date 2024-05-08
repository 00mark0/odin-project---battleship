import { Cpu } from "./cpu";
import { playerBoard } from "./dragDrop";
import initDomElements from "./domElements";

export function playGame(difficulty) {
  let domElements = initDomElements();
  let cpu = new Cpu();
  let cpuCells = document.querySelectorAll(".cpu-cell");
  let gameOngoing = true;

  console.log("cpu:", cpu.board.board);
  cpu.placeShips();
  cpuCells.forEach((cell) => {
    cell.addEventListener("click", function cellClick(e) {
      if (!gameOngoing) return;
      console.clear();
      console.log("player:", playerBoard.board);
      console.log("cpu:", cpu.board.board);
      let index = parseInt(e.target.getAttribute("data-index"));
      let row = Math.floor(index / 10);
      let col = index % 10;
      let result = cpu.board.receiveAttack([row, col]);
      if (result) {
        e.target.classList.add("hit");
      } else {
        e.target.classList.add("miss");
      }

      if (result === "sunk") {
        domElements.playerInfo.textContent = "You sunk a ship!";
        domElements.playerInfo.style.display = "block";

        setTimeout(function () {
          domElements.playerInfo.textContent = "";
          domElements.playerInfo.style.display = "none";
        }, 5000);
      }

      let attackRow, attackCol, attackResult;

      if (difficulty === "easy") {
        [attackRow, attackCol, attackResult] = cpu.easyAttack(playerBoard);
      } else if (difficulty === "medium") {
        [attackRow, attackCol, attackResult] = cpu.mediumAttack(playerBoard);
      } else if (difficulty === "hard") {
        [attackRow, attackCol, attackResult] = cpu.hardAttack(playerBoard);
      }

      let attackIndex = attackRow * 10 + attackCol;
      let targetCell = document.querySelector(
        `.cell[data-index="${attackIndex}"]`
      );
      if (attackResult) {
        targetCell.classList.remove("occupied");
        targetCell.classList.add("hit");
        return;
      } else {
        targetCell.classList.add("miss");
      }

      if (cpu.board.allSunk()) {
        alert("You win!");
        gameOngoing = false;
        cpuCells.forEach((cell) => {
          cell.removeEventListener("click", cellClick);
        });
        return;
      }

      if (playerBoard.allSunk()) {
        alert("You lose!");
        gameOngoing = false;
        cpuCells.forEach((cell) => {
          cell.removeEventListener("click", cellClick);
        });
        return;
      }

      // e.target.removeEventListener("click", cellClick); // if you want to disable player clicking on the same cell, uncomment this line
    });
  });
}
