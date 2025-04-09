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

  updateForPlayerWin(): void {
    this._totalPlayerWins += 1
  }

  updateForComputerWin(): void {
    this._totalComputerWins += 1
  }

  updateForDraw(): void {
    this._totalDraws += 1
  }
}
