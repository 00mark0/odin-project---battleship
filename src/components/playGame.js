import { Cpu } from "./cpu";
import { playerBoard } from "./dragDrop";
import initDomElements from "./domElements";

export function playGame() {
  let cpu = new Cpu();
  let cpuCells = document.querySelectorAll(".cpu-cell");

  console.log("cpu:", cpu.board.board);
  cpu.placeShips();
  cpuCells.forEach((cell) => {
    cell.addEventListener("click", (e) => {
      let index = parseInt(e.target.getAttribute("data-index"));
      let row = Math.floor(index / 10);
      let col = index % 10;
      let result = cpu.board.receiveAttack([row, col]);
      if (result) {
        e.target.style.backgroundColor = "red";
      } else {
        e.target.style.backgroundColor = "blue";
      }

      let [attackRow, attackCol, attackResult] = cpu.randomAttack(playerBoard);
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
    });
  });
}
