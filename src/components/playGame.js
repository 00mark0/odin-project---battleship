import { Cpu } from "./cpu";
import { playerBoard } from "./dragDrop";

export function playGame(difficulty) {
  let cpu = new Cpu();
  let cpuCells = document.querySelectorAll(".cpu-cell");

  console.log("cpu:", cpu.board.board);
  cpu.placeShips();
  cpuCells.forEach((cell) => {
    cell.addEventListener("click", function cellClick(e) {
      console.clear();
      console.log("player:", playerBoard.board);
      console.log("cpu:", cpu.board.board);
      let index = parseInt(e.target.getAttribute("data-index"));
      let row = Math.floor(index / 10);
      let col = index % 10;
      let result = cpu.board.receiveAttack([row, col]);
      if (result) {
        e.target.style.backgroundColor = "red";
      } else {
        e.target.style.backgroundColor = "blue";
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
      }

      if (playerBoard.allSunk()) {
        alert("You lose!");
      }

      // e.target.removeEventListener("click", cellClick); // if you want to disable player clicking on the same cell, uncomment this line
    });
  });
}
