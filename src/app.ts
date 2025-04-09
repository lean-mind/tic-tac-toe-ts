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
  const player = 'O'
  const computer = 'X'
  let gameFinished = false
  let ai_level = ''

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

  const start = () => {
    View.renderBoard(gameBoard, document.getElementById('play') as HTMLElement)
    configure_ai()
  }

  const game_loop = () => {
    View.renderBoard(gameBoard, document.getElementById('play') as HTMLElement)
    gameFinished = gameBoard.isFull()
    checkWinner()
  }

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

  window.addPlayerMove = (cellPosition) => {
    if (gameBoard.isMoveAvailableIn(cellPosition) && !gameFinished) {
      const difficultySelector = document.querySelector(
        '#ai_level',
      ) as HTMLSelectElement
      View.deactivateSelect(difficultySelector)
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
      game_loop()
    }
  }

  const scores = { X: 1, O: -1, tie: 0 }

  const checkMatch = (): 'X' | 'O' | 'tie' | '' => {
    if (gameBoard.playerCompletesAnyLine()) {
      return player
    }
    if (gameBoard.computerCompletesAnyLine()) {
      return computer
    }
    if (gameBoard.isFull()) return 'tie'
    return ''
  }

  const minimax = (board: Board, isMaximizing: boolean) => {
    const res = checkMatch()
    if (res !== '') {
      return scores[res]
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

  const statistics = new Statistics()

  let endMusic: HTMLAudioElement | null = null //the Audio object for the music at the end of the game

  const checkWinner = () => {
    const winner = checkMatch()

    const winner_statement = document.getElementById('winner') as HTMLElement
    const audio = document.querySelector('audio') as HTMLAudioElement

    if (winner === player) {
      winner_statement.innerText = 'Player Won'
      winner_statement.classList.add('playerWin')
      gameFinished = true
      statistics.updateForPlayerWin()
      console.log('player win')
      audio.pause()
      endMusic = new Audio(winAudio)
      endMusic.play()
    } else if (winner === computer) {
      winner_statement.innerText = 'Computer Won'
      winner_statement.classList.add('computerWin')
      gameFinished = true
      statistics.updateForComputerWin()
      console.log('computer win')
      audio.pause()
      endMusic = new Audio(gameOverAudio)
      endMusic.play()
    } else if (gameBoard.isFull()) {
      winner_statement.innerText = 'Draw...'
      winner_statement.classList.add('draw')
      statistics.updateForDraw()
      console.log('draw')
      audio.pause()
      endMusic = new Audio(gameOverAudio)
      endMusic.play()
    }

    const playerStat1Element = document.getElementById(
      'playerstat1',
    ) as HTMLElement
    playerStat1Element.innerText = `${statistics.totalPlayerWins}`
    const computerStat1Element = document.getElementById(
      'computerstat1',
    ) as HTMLElement
    computerStat1Element.innerText = `${statistics.totalComputerWins}`
    const loss1Element = document.getElementById('loss1') as HTMLElement
    loss1Element.innerText = `${statistics.totalComputerWins}`
    const loss2Element = document.getElementById('loss2') as HTMLElement
    loss2Element.innerText = `${statistics.totalPlayerWins}`
    const draw1Element = document.getElementById('draw1') as HTMLElement
    draw1Element.innerText = `${statistics.totalDraws}`
    const draw2Element = document.getElementById('draw2') as HTMLElement
    draw2Element.innerText = `${statistics.totalDraws}`

    if (winner !== '') {
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

    View.renderBoard(gameBoard, document.getElementById('play') as HTMLElement)
    randomizeStart()
    document.querySelector('.play-area')

    const mute_sound_btn = document.getElementsByClassName('btn-sound')[0]
    if (mute_sound_btn?.parentNode != null)
      mute_sound_btn.parentNode.removeChild(mute_sound_btn) //delete the button when resetting the board
  }

  return { start, resetBoard }
}
