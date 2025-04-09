import type {Winner} from './winner.ts'

export type PlayerMove = 'O'
export type ComputerMove = 'X'
export type Cell = ComputerMove | PlayerMove | ''

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

  private addMoveIn(
    cellPosition: number,
    move: PlayerMove | ComputerMove,
  ): void {
    this._cells[cellPosition] = move
  }

  removeMoveIn(cellPosition: number): void {
    this._cells[cellPosition] = ''
  }

  reset() {
    this._cells = ['', '', '', '', '', '', '', '', '']
  }

  whoIsTheWinner(): Winner {
    if (this.anyLineIsCompletedFor('O')) {
      return 'player'
    }
    if (this.anyLineIsCompletedFor('X')) {
      return 'computer'
    }
    if (this.isFull()) {
      return 'draw'
    }
    return 'none'
  }

  private anyLineIsCompletedFor(move: PlayerMove | ComputerMove): boolean {
    const horizontalWinningCombinations = [
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
      ...horizontalWinningCombinations,
      ...verticalWinningCombinations,
      ...diagonalWinningCombinations,
    ]
    return winningCombinations.some((combination) =>
      combination.every((index) => this._cells[index] === move),
    )
  }

  *availableCellPositions(): Generator<number> {
    for (let i = 0; i < this._cells.length; i++) {
      if (this._cells[i] === '') {
        yield i
      }
    }
  }
}
