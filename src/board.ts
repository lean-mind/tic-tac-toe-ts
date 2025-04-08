export type Player = 'O'
export type Computer = 'X'
export type Cell = Computer | Player | ''

export class Board {
  private readonly _cells: Cell[]

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
}
