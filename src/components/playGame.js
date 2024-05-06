import { Cpu } from "./cpu";
import { playerBoard } from "./dragDrop";

export function playGame() {
  let cpu = new Cpu();
  let cpuCells = document.querySelectorAll(".cpu-cell");
  let cells = document.querySelectorAll(".cell");
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
      console.log(
        `CPU attack: row ${attackRow}, col ${attackCol}, result ${attackResult}`
      ); // Add this line
      let attackIndex = attackRow * 10 + attackCol;
      let targetCell = document.querySelector(
        `.cell[data-index="${attackIndex}"]`
      );
      console.log(`Target cell classes before attack: ${targetCell.classList}`); // Add this line
      if (attackResult) {
        targetCell.classList.remove("occupied");
        targetCell.classList.add("hit");
      } else {
        targetCell.classList.add("miss");
      }
      console.log(`Target cell classes after attack: ${targetCell.classList}`); // Add this line

      if (cpu.board.allSunk()) {
        alert("You win!");
      }

      if (playerBoard.allSunk()) {
        alert("You lose!");
      }
    });
  });
}
