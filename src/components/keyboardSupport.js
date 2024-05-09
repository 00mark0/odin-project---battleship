import { playerBoard } from "./dragDrop";
import { randomizePlayerPlacement } from "./randomize";
import { restartGame } from "./restart";
import { menuPage } from "../main";

export function handleKeyDown(e) {
  if (e.key === "Escape") {
    menuPage();
    playerBoard.resetBoard();
  }

  if (e.key === "q") {
    randomizePlayerPlacement();
  }

  if (e.key === "c") {
    restartGame();
  }
}
