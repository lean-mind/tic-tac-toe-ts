import type {Board, Winner} from './board.ts'
import type {Statistics} from './statistics.ts' // biome-ignore lint/complexity/noStaticOnlyClass: <explanation>

// biome-ignore lint/complexity/noStaticOnlyClass: <explanation>
export class View {
  static renderBoard(board: Board, playArea: HTMLElement) {
    playArea.innerHTML = ''
    board.cells.forEach((e, i) => {
      playArea.innerHTML += `<div id="block_${i}" class="block" onclick="addPlayerMove(${i})">${board.cells[i]}</div>`
      if (e === 'O' || e === 'X') {
        playArea.querySelector(`#block_${i}`)?.classList.add('occupied')
      }
    })
  }
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

  static renderStatistics(statistics: Statistics, element: HTMLElement) {
    const totalPlayerWinsElement = element.querySelector(
      '#playerstat1',
    ) as HTMLElement
    totalPlayerWinsElement.textContent = `${statistics.totalPlayerWins}`
    const totalComputerWinsElement = element.querySelector(
      '#computerstat1',
    ) as HTMLElement
    totalComputerWinsElement.textContent = `${statistics.totalComputerWins}`
    const totalPlayerLosesElement = element.querySelector(
      '#loss1',
    ) as HTMLElement
    totalPlayerLosesElement.textContent = `${statistics.totalComputerWins}`
    const totalComputerLosesElement = element.querySelector(
      '#loss2',
    ) as HTMLElement
    totalComputerLosesElement.textContent = `${statistics.totalPlayerWins}`
    const totalPlayerDrawsElement = element.querySelector(
      '#draw1',
    ) as HTMLElement
    totalPlayerDrawsElement.textContent = `${statistics.totalDraws}`
    const totalComputerDrawsElement = element.querySelector(
      '#draw2',
    ) as HTMLElement
    totalComputerDrawsElement.textContent = `${statistics.totalDraws}`
  }
}
