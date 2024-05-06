import { Cpu } from "./cpu";
import Ship from "./ship";
import GameBoard from "./gameBoard";

export function playGame() {
  let cpu = new Cpu();
  let cpuCells = document.querySelectorAll(".cpu-cell");
  console.log("cpu:", cpu.board.board);
  cpu.placeShips();
  cpuCells.forEach((cell) => {
    cell.addEventListener("click", (e) => {
      let index = parseInt(e.target.getAttribute("data-index"));
      let row = Math.floor(index / 9);
      let col = index % 9;
      let result = cpu.board.receiveAttack([row, col]);
      if (result) {
        e.target.style.backgroundColor = "red";
      } else {
        e.target.style.backgroundColor = "blue";
      }
    });
  });
}
