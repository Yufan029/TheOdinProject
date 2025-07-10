import GameBoard from "./GameBoard";

test('Game board init, 10 columns', () => {
  const gameBoard = new GameBoard();
  gameBoard.initBoard();
  expect(gameBoard.columnsCount).toBe(10);
});

test('Game board init, 10 rows', () => {
  const gameBoard = new GameBoard();
  gameBoard.initBoard();
  expect(gameBoard.rowsCount).toBe(10);
})