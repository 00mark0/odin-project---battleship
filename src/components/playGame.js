import { Cpu } from "./cpu";

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
      console.log("cpu:", cpu.board.board);
      if (result) {
        e.target.style.backgroundColor = "red";
      } else {
        e.target.style.backgroundColor = "blue";
      }
    });
  });
}
