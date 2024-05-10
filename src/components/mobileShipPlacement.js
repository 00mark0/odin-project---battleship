import Ship from "./ship";
import GameBoard from "./gameBoard";
import initDomElements from "./domElements";

export const mobilePlayerBoard = new GameBoard();
export const shipIndex = { value: 0 };

export function mobileShipPlacement(e) {
  let domElements = initDomElements();
  if (shipIndex.value >= domElements.ship.length) return; // all ships have been placed

  let ship = new Ship(
    parseInt(domElements.ship[shipIndex.value].getAttribute("data-length"), 10)
  );
  let shipLength = ship.length;
  let isHorizontal =
    !domElements.ship[shipIndex.value].classList.contains("rotate");
  let dropIndex = parseInt(e.target.getAttribute("data-index"), 10);
  let gridWidth = 10;
  let row = Math.floor(dropIndex / gridWidth);
  let col = dropIndex % gridWidth;

  if (isHorizontal) {
    if (col + shipLength <= gridWidth) {
      mobilePlayerBoard.placeShip(ship, [row, col], "horizontal");
      console.log("player:", mobilePlayerBoard.board);
      domElements.ship[shipIndex.value].style.display = "none";
      for (let i = 0; i < shipLength; i++) {
        let targetCell = document.querySelector(
          `.cell[data-index="${dropIndex + i}"]`
        );
        targetCell.classList.add("occupied");
      }
      shipIndex.value++; // move to the next ship
    } else {
      domElements.gameInfo.textContent = "Ship placement out of bounds.";
      domElements.gameInfo.style.display = "block";

      setTimeout(function () {
        domElements.gameInfo.textContent = "";
      }, 3000);
    }
  } else {
    if (row + shipLength <= gridWidth) {
      mobilePlayerBoard.placeShip(ship, [row, col], "vertical");
      console.log("player:", mobilePlayerBoard.board);
      domElements.ship[shipIndex.value].style.display = "none";

      for (let i = 0; i < shipLength; i++) {
        let targetCell = document.querySelector(
          `.cell[data-index="${dropIndex + i * gridWidth}"]`
        );
        targetCell.classList.add("occupied");
      }
      shipIndex.value++; // move to the next ship
    } else {
      domElements.gameInfo.textContent = "Ship placement out of bounds.";
      domElements.gameInfo.style.display = "block";

      setTimeout(function () {
        domElements.gameInfo.textContent = "";
      }, 3000);
    }
  }
}
