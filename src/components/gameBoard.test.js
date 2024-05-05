const GameBoard = require("./gameBoard");
const Ship = require("./ship");

describe("GameBoard", () => {
  let gameBoard;

  beforeEach(() => {
    gameBoard = new GameBoard();
  });

  describe("placeShip", () => {
    test("places a ship correctly on the board", () => {
      const ship = new Ship(3);
      gameBoard.placeShip(ship, [0, 0], "horizontal");
      expect(gameBoard.board[0][0]).toBe(ship);
      expect(gameBoard.board[0][1]).toBe(ship);
      expect(gameBoard.board[0][2]).toBe(ship);
    });

    test("throws error if ship placement is out of bounds", () => {
      const ship = new Ship(4);
      expect(() => gameBoard.placeShip(ship, [0, 7], "horizontal")).toThrow(
        "Ship placement out of bounds."
      );
    });

    test("throws error if position is already occupied", () => {
      const ship1 = new Ship(3);
      const ship2 = new Ship(3);
      gameBoard.placeShip(ship1, [0, 0], "horizontal");
      expect(() => gameBoard.placeShip(ship2, [0, 2], "horizontal")).toThrow(
        "Position already occupied."
      );
    });
  });

  describe("receiveAttack", () => {
    test("marks a hit on a ship", () => {
      const ship = new Ship(3);
      gameBoard.placeShip(ship, [0, 0], "horizontal");
      const result = gameBoard.receiveAttack([0, 1]);
      expect(result).toBe(true);
      expect(gameBoard.board[0][1]).toBe("hit");
    });

    test("marks a miss correctly", () => {
      gameBoard.receiveAttack([1, 1]);
      expect(gameBoard.board[1][1]).toBe("miss");
    });
  });

  describe("allSunk", () => {
    test("returns true when all ships are sunk", () => {
      const ship = new Ship(1);
      gameBoard.placeShip(ship, [0, 0], "horizontal");
      gameBoard.receiveAttack([0, 0]);
      expect(gameBoard.allSunk()).toBe(true);
    });

    test("returns false when not all ships are sunk", () => {
      const ship = new Ship(2);
      gameBoard.placeShip(ship, [0, 0], "horizontal");
      gameBoard.receiveAttack([0, 0]);
      expect(gameBoard.allSunk()).toBe(false);
    });
  });
});
