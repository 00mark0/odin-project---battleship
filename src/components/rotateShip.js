export function rotateShip(ship) {
  const cellSize = 25; // Assuming each grid cell is 25px by 25px
  const length = parseInt(ship.getAttribute("data-length"), 10);

  // Toggle rotation class
  ship.classList.toggle("rotate");

  if (ship.classList.contains("rotate")) {
    // For vertical orientation, set the width to match one cell and height based on length
    ship.style.width = `${cellSize}px`; // Width becomes the size of one cell
    ship.style.height = `${cellSize * length}px`; // Height is adjusted based on length
  } else {
    // Revert back to horizontal orientation
    ship.style.width = `${cellSize * length}px`; // Width is adjusted based on length
    ship.style.height = `${cellSize}px`; // Height becomes the size of one cell
  }
}
