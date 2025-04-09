import type {Board} from './board.ts'

export class BoardComponent {
  constructor(private playArea: HTMLElement) {}

  renderFor(board: Board) {
    this.playArea.innerHTML = ''
    board.cells.forEach((e, i) => {
      this.playArea.innerHTML += `<div id="block_${i}" class="block" onclick="addPlayerMove(${i})">${board.cells[i]}</div>`
      if (e === 'O' || e === 'X') {
        this.playArea.querySelector(`#block_${i}`)?.classList.add('occupied')
      }
    })
  }
}
