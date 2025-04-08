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
}
