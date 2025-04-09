import type {Winner} from './board.ts'

// biome-ignore lint/complexity/noStaticOnlyClass: <explanation>
export class View {
  static deactivateSelect(element: HTMLSelectElement) {
    element.disabled = true
  }
  static renderWinnerStatementFor(winner: Winner, element: HTMLElement) {
    if (winner === 'draw') {
      element.innerText = 'Draw'
      element.classList.add('draw')
    }
    if (winner === 'player') {
      element.innerText = 'Player Won'
      element.classList.add('playerWin')
    }
    if (winner === 'computer') {
      element.innerText = 'Computer Won'
      element.classList.add('computerWin')
    }
  }
}
