export function initBoard(dom) {
  for (let i = 0; i < 100; i++) {
    let cell = document.createElement("div");
    cell.classList.add("cell");
    cell.setAttribute("data-index", i + 1);
    dom.playerGrid.appendChild(cell);
  }

  for (let i = 0; i < 100; i++) {
    let cpuCell = document.createElement("div");
    cpuCell.classList.add("cpuCell");
    cpuCell.setAttribute("data-index", i + 1);
    dom.computerGrid.appendChild(cpuCell);
  }
}