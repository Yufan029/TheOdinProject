import Ship from "./Ship.js";

test('ship being hit once', () => {
  const ship = new Ship(2);
  ship.hit();
  expect(ship.hits).toBe(1);
});

test('ship length 3, and being hit by 3 times, sunk', () => {
  let shipLength3 = new Ship(3);
  shipLength3.hit();
  shipLength3.hit();
  shipLength3.hit();
  expect(shipLength3.isSunk()).toBe(true);
});

