import {describe, expect, it} from 'vitest'
import {Board} from './board'

describe('Board should', () => {
  it('be created empty', () => {
    const board = new Board()
    expect(board.cells).toEqual(['', '', '', '', '', '', '', '', ''])
  })
  it('knows is empty', () => {
    const board = new Board()
    expect(board.isEmpty()).toBe(true)
  })
  it('knows is full', () => {
    const board = new Board()
    board.addPlayerMoveIn(0)
    board.addPlayerMoveIn(1)
    board.addPlayerMoveIn(2)
    board.addPlayerMoveIn(3)
    board.addPlayerMoveIn(4)
    board.addPlayerMoveIn(5)
    board.addPlayerMoveIn(6)
    board.addPlayerMoveIn(7)
    board.addPlayerMoveIn(8)

    expect(board.isFull()).toBe(true)
  })
  it('knows a move is available in cell position', () => {
    const board = new Board()
    board.addPlayerMoveIn(1)
    expect(board.isMoveAvailableIn(0)).toBe(true)
    expect(board.isMoveAvailableIn(1)).toBe(false)
  })
  it('add a player move in cell position', () => {
    const board = new Board()
    board.addPlayerMoveIn(0)
    expect(board.cells[0]).toBe('O')
  })
  it('add a computer move in cell position', () => {
    const board = new Board()
    board.addComputerMoveIn(0)
    expect(board.cells[0]).toBe('X')
  })
  it('remove a move in cell position', () => {
    const board = new Board()
    board.addPlayerMoveIn(0)
    board.addComputerMoveIn(1)

    board.removeMoveIn(0)

    expect(board.cells[0]).toBe('')
    expect(board.cells[1]).toBe('X')
  })
  it('be reset', () => {
    const board = new Board()
    board.addPlayerMoveIn(0)
    board.addComputerMoveIn(1)

    board.reset()

    expect(board.isEmpty()).toBe(true)
  })
})
