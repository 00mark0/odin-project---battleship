import { Cpu } from "./cpu";
import { mobilePlayerBoard } from "./mobileShipPlacement";
import initDomElements from "./domElements";
import confetti from "canvas-confetti";

export function mobilePlayGame() {
  let domElements = initDomElements();
  let difficulty = document.querySelector("#difficulty").value;

  if (mobilePlayerBoard.ships.length < 5) {
    domElements.gameInfo.textContent = "Please place all ships.";
    return;
  }

  domElements.gameInfo.textContent = "";

  console.log(difficulty);

  domElements.menuItem.style.display = "none";
  domElements.rotate.style.display = "none";
  domElements.start.style.display = "none";
  domElements.randomize.style.display = "none";
  domElements.backToMenu.style.display = "none";

  domElements.restart.style.marginLeft = "25px";

  let cpu = new Cpu();
  let cpuCells = document.querySelectorAll(".cpu-cell");
  let gameOngoing = true;

  console.log("cpu:", cpu.board.board);
  cpu.placeShips();
  cpuCells.forEach((cell) => {
    cell.addEventListener("click", function cellClick(e) {
      if (!gameOngoing) return;

      if (
        e.target.classList.contains("hit") ||
        e.target.classList.contains("miss")
      )
        return;

      console.clear();
      console.log("player:", mobilePlayerBoard.board);
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
        domElements.cpuInfo.textContent = "You sank a ship!";
        domElements.cpuInfo.style.display = "block";

        setTimeout(function () {
          domElements.cpuInfo.textContent = "";
          domElements.cpuInfo.style.display = "none";
        }, 3000);
      }

      if (cpu.board.allSunk()) {
        domElements.gameInfo.textContent = "You win! 🎉🥳";

        confetti({
          particleCount: 300,
          spread: 200,
          origin: { y: 0.6 },
        });

        gameOngoing = false;
        cpuCells.forEach((cell) => {
          cell.removeEventListener("click", cellClick);
        });
        return;
      }

      let attackRow, attackCol, attackResult;

      console.log(difficulty);

      if (mobilePlayerBoard.allSunk()) {
        domElements.gameInfo.textContent = "You lose! 😞🙁";
        gameOngoing = false;
        cpuCells.forEach((cell) => {
          cell.removeEventListener("click", cellClick);
        });
        return;
      }

      if (difficulty === "easy") {
        [attackRow, attackCol, attackResult] =
          cpu.easyAttack(mobilePlayerBoard);
      } else if (difficulty === "medium") {
        [attackRow, attackCol, attackResult] =
          cpu.mediumAttack(mobilePlayerBoard);
      } else if (difficulty === "hard") {
        [attackRow, attackCol, attackResult] =
          cpu.hardAttack(mobilePlayerBoard);
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
    });
  });
}
