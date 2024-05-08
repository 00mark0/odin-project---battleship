import { Cpu } from "./cpu";
import { playerBoard } from "./dragDrop";
import initDomElements from "./domElements";
import confetti from "canvas-confetti";

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
        domElements.playerInfo.textContent = "You sank a ship!";
        domElements.playerInfo.style.display = "block";

        setTimeout(function () {
          domElements.playerInfo.textContent = "";
          domElements.playerInfo.style.display = "none";
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

      if (difficulty === "easy") {
        [attackRow, attackCol, attackResult] = cpu.easyAttack(playerBoard);
      } else if (difficulty === "medium") {
        [attackRow, attackCol, attackResult] = cpu.mediumAttack(playerBoard);
      } else if (difficulty === "hard") {
        [attackRow, attackCol, attackResult] = cpu.hardAttack(playerBoard);
      }

      if (playerBoard.allSunk()) {
        domElements.gameInfo.textContent = "You lose! 😞🙁";
        gameOngoing = false;
        cpuCells.forEach((cell) => {
          cell.removeEventListener("click", cellClick);
        });
        return;
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

      // e.target.removeEventListener("click", cellClick); // if you want to enable player clicking on the same cell, comment out this line
    });
  });
}
