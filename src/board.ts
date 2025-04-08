export type Player = 'O'
export type Computer = 'X'
export type Cell = Computer | Player | ''

export class Board {
  private _cells: Cell[]

  constructor() {
    this._cells = ['', '', '', '', '', '', '', '', '']
  }

  get cells(): Cell[] {
    return this._cells
  }

  isEmpty(): boolean {
    return this._cells.every((cell) => cell === '')
  }

  isFull(): boolean {
    return this._cells.every((cell) => cell !== '')
  }

  isMoveAvailableIn(cellPosition: number): boolean {
    return this._cells[cellPosition] === ''
  }

  addPlayerMoveIn(cellPosition: number): void {
    this.addMoveIn(cellPosition, 'O')
  }

  addComputerMoveIn(cellPosition: number): void {
    this.addMoveIn(cellPosition, 'X')
  }

  private addMoveIn(cellPosition: number, move: Player | Computer): void {
    this._cells[cellPosition] = move
  }

  removeMoveIn(cellPosition: number): void {
    this._cells[cellPosition] = ''
  }

  reset() {
    this._cells = ['', '', '', '', '', '', '', '', '']
  }

  playerCompletesAnyLine(): boolean {
    return this.anyLineIsCompletedFor('O')
  }

  computerCompletesAnyLine(): boolean {
    return this.anyLineIsCompletedFor('X')
  }

  private anyLineIsCompletedFor(move: Player | Computer): boolean {
    const horizonatalWinningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
    ]
    const verticalWinningCombinations = [
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
    ]
    const diagonalWinningCombinations = [
      [0, 4, 8],
      [2, 4, 6],
    ]
    const winningCombinations = [
      ...horizonatalWinningCombinations,
      ...verticalWinningCombinations,
      ...diagonalWinningCombinations,
    ]
    return winningCombinations.some((combination) =>
      combination.every((index) => this._cells[index] === move),
    )
  }
}
