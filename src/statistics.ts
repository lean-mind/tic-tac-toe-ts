import type {Winner} from "./board.ts";

export class Statistics {
  private _totalPlayerWins = 0
  private _totalComputerWins = 0
  private _totalDraws = 0

  get totalDraws(): number {
    return this._totalDraws
  }
  get totalComputerWins(): number {
    return this._totalComputerWins
  }
  get totalPlayerWins(): number {
    return this._totalPlayerWins
  }

  updateFor(winner: Winner): void {
    if (winner === 'draw') {
      this._totalDraws += 1
    }
    if (winner === 'player') {
      this._totalPlayerWins += 1
    }
    if (winner === 'computer') {
      this._totalComputerWins += 1
    }
  }
}
