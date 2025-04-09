import type {Winner} from './winner.ts'

export class WinnerStatementComponent {
  constructor(private winnerStatementElement: HTMLElement) {}

  renderFor(winner: Winner) {
    if (winner === 'draw') {
      this.winnerStatementElement.innerText = 'Draw'
      this.winnerStatementElement.classList.add('draw')
    }
    if (winner === 'player') {
      this.winnerStatementElement.innerText = 'Player Won'
      this.winnerStatementElement.classList.add('playerWin')
    }
    if (winner === 'computer') {
      this.winnerStatementElement.innerText = 'Computer Won'
      this.winnerStatementElement.classList.add('computerWin')
    }
  }
}
