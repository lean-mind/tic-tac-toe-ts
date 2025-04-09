import type {Winner} from './winner.ts'

export class WinnerStatementComponent {
  constructor(private winnerStatementElement: HTMLElement) {}

  renderFor(winner: Winner) {
    switch (winner) {
      case 'player':
        this.winnerStatementElement.innerText = 'Player Won'
        this.winnerStatementElement.classList.add('playerWin')
        break
      case 'computer':
        this.winnerStatementElement.innerText = 'Computer Won'
        this.winnerStatementElement.classList.add('computerWin')
        break
      case 'draw':
        this.winnerStatementElement.innerText = 'Draw'
        this.winnerStatementElement.classList.add('draw')
        break
      case 'none':
        this.winnerStatementElement.innerText = ''
        this.winnerStatementElement.classList.remove(
          'draw',
          'playerWin',
          'computerWin',
        )
        break
    }
  }
}
