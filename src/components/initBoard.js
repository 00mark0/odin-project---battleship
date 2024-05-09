export function initBoard(dom) {
  for (let i = 0; i < 100; i++) {
    let cell = document.createElement("div");
    cell.classList.add("cell");
    cell.setAttribute("data-index", i);
    dom.playerGrid.appendChild(cell);
  }

  for (let i = 0; i < 100; i++) {
    let cpuCell = document.createElement("div");
    cpuCell.classList.add("cpu-cell");
    cpuCell.setAttribute("data-index", i);
    cpuCell.title =
      "If you get really mad at the CPU, you can cheat in the console. 😉";
    dom.computerGrid.appendChild(cpuCell);
  }
}
