import gameOverAudio from './audio/gameover.wav'
import winAudio from './audio/win.wav'
import {Board} from './board.ts'
import {Statistics} from './statistics.ts'
import {View} from './view.ts'

export type Game = {
  start: () => void
  resetBoard: () => void
}

type Comparator = (a: number, b: number) => boolean

export function createGame(gameBoard: Board = new Board()): Game {
  const statistics = new Statistics()
  let gameFinished = false
  let aiLevel = ''

  const configureAi = () => {
    const ai_select = document.querySelector('#ai_level') as HTMLSelectElement
    aiLevel = Array.from(ai_select.options).filter(
      (option) => option.defaultSelected,
    )[0].value
    ai_select.addEventListener('change', (event) => {
      const target = event.target as HTMLSelectElement
      aiLevel = target.options[target.selectedIndex].value
    })
  }

  const renderBoard = () => {
    View.renderBoard(gameBoard, document.getElementById('play') as HTMLElement)
  }

  const start = () => {
    renderBoard()
    configureAi()
  }

  const gameLoop = () => {
    renderBoard()
    gameFinished = gameBoard.isFull()
    checkWinner()
  }

  const randomizeStart = () => {
    if (gameBoard.isEmpty()) {
      // const PLAYER = 0;
      const COMPUTER = 1
      const start = Math.round(Math.random())
      if (start === COMPUTER) {
        addComputerMoveBasedOn(aiLevel)
        console.log('COMPUTER STARTED')
      } else {
        console.log('PLAYER STARTS')
      }
    }
  }

  window.addPlayerMove = (cellPosition) => {
    if (gameBoard.isMoveAvailableIn(cellPosition) && !gameFinished) {
      const difficultySelector = document.querySelector(
        '#ai_level',
      ) as HTMLSelectElement
      View.deactivateSelect(difficultySelector)
      gameBoard.addPlayerMoveIn(cellPosition)
      gameLoop()
      addComputerMoveBasedOn(aiLevel)
    }
  }

  const addComputerMoveBasedOn = (aiLevel: string) => {
    if (!gameFinished) {
      let score = 0
      let compare: Comparator = (a, b) => a > b
      switch (aiLevel) {
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
      for (const availableCellPosition of gameBoard.availableCellPositions()) {
        gameBoard.addComputerMoveIn(availableCellPosition)
        const endScore = minimax(gameBoard, false)
        gameBoard.removeMoveIn(availableCellPosition)
        if (compare(endScore, score)) {
          score = endScore
          nextMove = availableCellPosition
        }
      }
      gameBoard.addComputerMoveIn(nextMove)
      gameLoop()
    }
  }

  const minimaxEvaluation = { computer: 1, player: -1, draw: 0 }

  const minimax = (board: Board, isMaximizing: boolean) => {
    const winner = board.whoIsTheWinner()
    if (winner !== 'none') {
      return minimaxEvaluation[winner]
    }
    if (isMaximizing) {
      let bestScore = Number.NEGATIVE_INFINITY
      for (const availableCellPosition of board.availableCellPositions()) {
        board.addComputerMoveIn(availableCellPosition)
        const score = minimax(board, false)
        board.removeMoveIn(availableCellPosition)
        bestScore = Math.max(score, bestScore)
      }
      return bestScore
      // biome-ignore lint/style/noUselessElse: why not
    } else {
      let bestScore = Number.POSITIVE_INFINITY
      for (const availableCellPosition of board.availableCellPositions()) {
        board.addPlayerMoveIn(availableCellPosition)
        const score = minimax(board, true)
        board.removeMoveIn(availableCellPosition)
        bestScore = Math.min(score, bestScore)
      }
      return bestScore
    }
  }

  let endMusic: HTMLAudioElement | null = null //the Audio object for the music at the end of the game

  const selectEndAudioBasedOn = (winner: string) =>
    winner === 'player' ? new Audio(winAudio) : new Audio(gameOverAudio)

  const checkWinner = () => {
    const winner = gameBoard.whoIsTheWinner()

    if (winner !== 'none') {
      const winnerStatementElement = document.getElementById(
        'winner',
      ) as HTMLElement
      const audio = document.querySelector('audio') as HTMLAudioElement
      View.renderWinnerStatementFor(winner, winnerStatementElement)
      statistics.updateFor(winner)
      gameFinished = true
      console.log(`${winner} win`)
      audio.pause()
      endMusic = selectEndAudioBasedOn(winner)
      endMusic.play().then()
      const statisticsElement = document.getElementById(
        'statistics',
      ) as HTMLElement
      View.renderStatistics(statistics, statisticsElement)

      //when the game ends, I create and add a button in the 'div-end-of-game' div
      const btn = document.createElement('button')
      btn.className = 'btn-sound'
      btn.innerHTML = "<i class='fa fa-volume-up' aria-hidden='true'></i>"
      btn.onclick = muteAudio
      document.getElementsByClassName('div-end-of-game')[0].appendChild(btn)
    }
  }

  const x = document.getElementById('myAudio') as HTMLAudioElement

  const muteAudio = () => {
    //mutes or unmute all the audio (music and end game music)
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

  const resetBoard = () => {
    const winner_statement = document.getElementById('winner') as HTMLElement
    gameBoard.reset()
    gameFinished = false
    winner_statement.classList.remove('playerWin')
    winner_statement.classList.remove('computerWin')
    winner_statement.classList.remove('draw')
    winner_statement.innerText = ''
    const aiLevel = document.querySelector('#ai_level') as HTMLSelectElement
    aiLevel.disabled = false

    renderBoard()
    randomizeStart()
    document.querySelector('.play-area')

    const mute_sound_btn = document.getElementsByClassName('btn-sound')[0]
    if (mute_sound_btn?.parentNode != null)
      mute_sound_btn.parentNode.removeChild(mute_sound_btn) //delete the button when resetting the board
  }

  return { start, resetBoard }
}
