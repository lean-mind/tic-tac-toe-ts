import type {Board} from './board.ts' // biome-ignore lint/complexity/noStaticOnlyClass: <explanation>

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
}
