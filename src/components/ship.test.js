const Ship = require("./ship");

describe("Ship", () => {
  test("should initialize with the correct length and no hits", () => {
    const length = 3;
    const ship = new Ship(length);
    expect(ship.length).toBe(length);
    expect(ship.hits).toEqual([false, false, false]);
  });

  test("hit method should mark a part of the ship as hit", () => {
    const ship = new Ship(3);
    ship.hit(1);
    expect(ship.hits).toEqual([false, true, false]);
  });

  test("isSunk method should return false when not all parts are hit", () => {
    const ship = new Ship(3);
    ship.hit(1);
    expect(ship.isSunk()).toBe(false);
  });

  test("isSunk method should return true when all parts are hit", () => {
    const ship = new Ship(3);
    ship.hit(0);
    ship.hit(1);
    ship.hit(2);
    expect(ship.isSunk()).toBe(true);
  });
});
