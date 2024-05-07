export function rotateShip(ship) {
  const cellSize = 25; // assuming each grid cell is 25px by 25px
  const length = parseInt(ship.getAttribute("data-length"), 10);

  // toggle rotation class
  ship.classList.toggle("rotate");

  if (ship.classList.contains("rotate")) {
    // for vertical orientation, set the width to match one cell and height based on length
    ship.style.width = `${cellSize}px`;
    ship.style.height = `${cellSize * length}px`;
    ship.style.borderTop = "7px solid green";
    ship.style.borderLeft = "none";
  } else {
    // revert back to horizontal orientation
    ship.style.width = `${cellSize * length}px`;
    ship.style.height = `${cellSize}px`;
    ship.style.borderLeft = "7px solid green";
    ship.style.borderTop = "none";
  }
}
