export default class GameBoard {
  #gameBoard = [];

  initBoard() {
    for (let i = 0; i < 10; i++) {
      this.#gameBoard[i] = [];
      for (let j = 0; j < 10; j++) {
        this.#gameBoard[i][j] = {};
      }
    }
  }

  get columnsCount() {
    return this.#gameBoard[0].length;
  }

  get rowsCount() {
    let i = 0;
    while (this.#gameBoard[i] != undefined) {
      i++;
    }

    return i;
  }

  receiveAttack(x, y) {
    this.#gameBoard[x][y].attacked = true;
  }
}
