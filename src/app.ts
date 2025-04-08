import gameOverAudio from './audio/gameover.wav'
import winAudio from './audio/win.wav'
import type {Cell} from './board.ts'
import {Board} from './board.ts'
import {View} from './view.ts'

export type Game = {
  render_board: () => void
  start: () => void
  checkBoardComplete: () => void
  game_loop: () => void
  randomizeStart: () => void
  addComputerMove: (ai_level: string) => void
  minimax: (board: Cell[], isMaximizing: boolean) => number
  checkWinner: () => void
  check_match: () => string
  reset_board: () => void
  muteAudio: () => void
}

type Comparator = (a: number, b: number) => boolean

export function createGame(gameBoard: Board = new Board()): Game {
  const player = 'O'
  const computer = 'X'
  let gameFinished = false
  let ai_level = ''

  const game = {} as Game

  game.render_board = () => {
    View.renderBoard(gameBoard, document.getElementById('play') as HTMLElement)
  }

  const configure_ai = () => {
    const ai_select = document.querySelector('#ai_level') as HTMLSelectElement
    ai_level = Array.from(ai_select.options).filter(
      (option) => option.defaultSelected,
    )[0].value
    ai_select.addEventListener('change', (event) => {
      const target = event.target as HTMLSelectElement
      ai_level = target.options[target.selectedIndex].value
    })
  }

  game.start = () => {
    View.renderBoard(gameBoard, document.getElementById('play') as HTMLElement)
    configure_ai()
  }

  game.checkBoardComplete = () => {
    gameFinished = gameBoard.isFull()
  }

  const game_loop = () => {
    View.renderBoard(gameBoard, document.getElementById('play') as HTMLElement)
    gameFinished = gameBoard.isFull()
    checkWinner()
  }
  game.game_loop = game_loop

  const randomizeStart = () => {
    if (gameBoard.isEmpty()) {
      // const PLAYER = 0;
      const COMPUTER = 1
      const start = Math.round(Math.random())
      if (start === COMPUTER) {
        addComputerMove(ai_level)
        console.log('COMPUTER STARTED')
      } else {
        console.log('PLAYER STARTS')
      }
    }
  }
  game.randomizeStart = randomizeStart

  window.addPlayerMove = (cellPosition) => {
    if (gameBoard.isMoveAvailableIn(cellPosition) && !gameFinished) {
      const querySelector = document.querySelector(
        '#ai_level',
      ) as HTMLSelectElement
      querySelector.disabled = true
      gameBoard.addPlayerMoveIn(cellPosition)
      game_loop()
      addComputerMove(ai_level)
    }
  }

  const addComputerMove = (ai_level: string) => {
    if (!gameFinished) {
      let score = 0
      let compare: Comparator = (a, b) => a > b
      switch (ai_level) {
        case 'hard':
          score = Number.NEGATIVE_INFINITY
          compare = (a, b) => a > b
          break
        case 'easy':
          score = Number.POSITIVE_INFINITY
          compare = (a, b) => a < b
          break
        case 'normal': {
          const guess = Math.random() * 100
          if (guess <= 40) {
            score = Number.POSITIVE_INFINITY
            compare = (a, b) => a < b
          } else {
            score = Number.NEGATIVE_INFINITY
            compare = (a, b) => a > b
          }
          break
        }
      }
      let nextMove = 0
      for (
        let cellPosition = 0;
        cellPosition < gameBoard.cells.length;
        cellPosition++
      ) {
        if (gameBoard.isMoveAvailableIn(cellPosition)) {
          gameBoard.addComputerMoveIn(cellPosition)
          const endScore = minimax(gameBoard.cells, false)
          gameBoard.removeMoveIn(cellPosition)
          if (compare(endScore, score)) {
            score = endScore
            nextMove = cellPosition
          }
        }
      }
      gameBoard.addComputerMoveIn(nextMove)
      game_loop()
    }
  }
  game.addComputerMove = addComputerMove

  const scores = { X: 1, O: -1, tie: 0 }

  const check_match = (): 'X' | 'O' | 'tie' | '' => {
    if (gameBoard.playerCompletesAnyLine()) {
      return player
    }
    if (gameBoard.computerCompletesAnyLine()) {
      return computer
    }
    if (gameBoard.isFull()) return 'tie'
    return ''
  }

  const minimax = (board: Cell[], isMaximizing: boolean) => {
    const res = check_match()
    if (res !== '') {
      return scores[res]
    }
    if (isMaximizing) {
      let bestScore = Number.NEGATIVE_INFINITY
      for (let cellPosition = 0; cellPosition < board.length; cellPosition++) {
        if (gameBoard.isMoveAvailableIn(cellPosition)) {
          gameBoard.addComputerMoveIn(cellPosition)
          const score = minimax(board, false)
          gameBoard.removeMoveIn(cellPosition)
          bestScore = Math.max(score, bestScore)
        }
      }
      return bestScore
      // biome-ignore lint/style/noUselessElse: why not
    } else {
      let bestScore = Number.POSITIVE_INFINITY
      for (let cellPosition = 0; cellPosition < board.length; cellPosition++) {
        if (gameBoard.isMoveAvailableIn(cellPosition)) {
          gameBoard.addPlayerMoveIn(cellPosition)
          const score = minimax(board, true)
          gameBoard.removeMoveIn(cellPosition)
          bestScore = Math.min(score, bestScore)
        }
      }
      return bestScore
    }
  }
  game.minimax = minimax

  let temp1 = 0
  let temp2 = 0
  let temp3 = 0
  let temp4 = 0
  let temp5 = 0
  let temp6 = 0

  let endMusic: HTMLAudioElement | null = null //the Audio object for the music at the end of the game

  const checkWinner = () => {
    const res = check_match()
    let playerstat1 = 0
    let computerstat1 = 0
    let loss1 = 0
    let loss2 = 0
    let draw1 = 0
    let draw2 = 0

    const winner_statement = document.getElementById('winner') as HTMLElement
    const audio = document.querySelector('audio') as HTMLAudioElement

    if (res === player) {
      winner_statement.innerText = 'Player Won'
      winner_statement.classList.add('playerWin')
      gameFinished = true
      playerstat1++
      loss2++
      temp1 = temp1 + playerstat1
      temp3 = temp3 + loss2
      console.log('player win')
      audio.pause()
      endMusic = new Audio(winAudio)
      endMusic.play()
    } else if (res === computer) {
      winner_statement.innerText = 'Computer Won'
      winner_statement.classList.add('computerWin')
      gameFinished = true
      computerstat1++
      loss1++
      temp2 = temp2 + computerstat1
      temp4 = temp4 + loss1
      console.log('computer win')
      audio.pause()
      endMusic = new Audio(gameOverAudio)
      endMusic.play()
    } else if (gameBoard.isFull()) {
      winner_statement.innerText = 'Draw...'
      winner_statement.classList.add('draw')
      draw1++
      draw2++
      temp5 = temp5 + draw1
      temp6 = temp6 + draw2
      console.log('draw')
      audio.pause()
      endMusic = new Audio(gameOverAudio)
      endMusic.play()
    }

    const playerStat1Element = document.getElementById(
      'playerstat1',
    ) as HTMLElement
    playerStat1Element.innerText = `${temp1}`
    const computerStat1Element = document.getElementById(
      'computerstat1',
    ) as HTMLElement
    computerStat1Element.innerText = `${temp2}`
    const loss1Element = document.getElementById('loss1') as HTMLElement
    loss1Element.innerText = `${temp4}`
    const loss2Element = document.getElementById('loss2') as HTMLElement
    loss2Element.innerText = `${temp3}`
    const draw1Element = document.getElementById('draw1') as HTMLElement
    draw1Element.innerText = `${temp5}`
    const draw2Element = document.getElementById('draw2') as HTMLElement
    draw2Element.innerText = `${temp6}`

    if (loss1 === 1 || loss2 === 1 || draw1 === 1 || draw2 === 1) {
      //when the game ends, I create and add a button in the 'div-end-of-game' div
      const btn = document.createElement('button')
      btn.className = 'btn-sound'
      btn.innerHTML = "<i class='fa fa-volume-up' aria-hidden='true'></i>"
      btn.onclick = muteAudio
      document.getElementsByClassName('div-end-of-game')[0].appendChild(btn)
    }
  }
  game.checkWinner = checkWinner

  const x = document.getElementById('myAudio') as HTMLAudioElement

  const muteAudio = () => {
    //mutes or demutes all the audio (music and end game music)
    const btn = document.getElementsByClassName('btn-sound')[0]
    if (!x.muted) {
      x.muted = true
      if (endMusic) endMusic.muted = true
      btn.innerHTML = "<i class='fa fa-volume-down' aria-hidden='true'></i>" //change the icon of the button when the sound is muted
    } else {
      x.muted = false
      if (endMusic) endMusic.muted = false
      btn.innerHTML = "<i class='fa fa-volume-up' aria-hidden='true'></i>"
    }
  }
  game.muteAudio = muteAudio
  game.check_match = check_match

  const reset_board = () => {
    const winner_statement = document.getElementById('winner') as HTMLElement
    gameBoard.reset()
    gameFinished = false
    winner_statement.classList.remove('playerWin')
    winner_statement.classList.remove('computerWin')
    winner_statement.classList.remove('draw')
    winner_statement.innerText = ''
    const aiLevel = document.querySelector('#ai_level') as HTMLSelectElement
    aiLevel.disabled = false

    View.renderBoard(gameBoard, document.getElementById('play') as HTMLElement)
    randomizeStart()
    document.querySelector('.play-area')

    const mute_sound_btn = document.getElementsByClassName('btn-sound')[0]
    if (mute_sound_btn?.parentNode != null)
      mute_sound_btn.parentNode.removeChild(mute_sound_btn) //delete the button when resetting the board
  }
  game.reset_board = reset_board

  return game
}
