// battleship ship class

export class Ship {
  constructor(length) {
    this.length = length;
    this.hits = Array(length).fill(false);
    this.type = "ship";
  }

  hit(position) {
    if (position >= 0 && position < this.length) {
      this.hits[position] = true;
    }
  }

  isSunk() {
    if (this.hits.every((hit) => hit === true)) {
      return true;
    } else {
      return false;
    }
  }
}

export default Ship;
