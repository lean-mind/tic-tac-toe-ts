import {describe, expect, it} from 'vitest'
import {Board} from './board'

describe('Board should', () => {
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
  it('know when there is no winner yet', () => {
    const board = new Board()
    board.addPlayerMoveIn(0)
    board.addComputerMoveIn(1)
    board.addPlayerMoveIn(2)

    expect(board.whoIsTheWinner()).toBe('none')
  })
  it('knows when player is the winner', () => {
    const board = new Board()
    board.addPlayerMoveIn(0)
    board.addPlayerMoveIn(1)
    board.addPlayerMoveIn(2)

    expect(board.whoIsTheWinner()).toBe('player')
  })
  it('knows when computer is the winner', () => {
    const board = new Board()
    board.addComputerMoveIn(1)
    board.addComputerMoveIn(4)
    board.addComputerMoveIn(7)

    expect(board.whoIsTheWinner()).toBe('computer')
  })
  it('knows when there is a draw', () => {
    const board = new Board()
    board.addPlayerMoveIn(0)
    board.addComputerMoveIn(1)
    board.addPlayerMoveIn(2)
    board.addComputerMoveIn(3)
    board.addPlayerMoveIn(4)
    board.addComputerMoveIn(5)
    board.addComputerMoveIn(6)
    board.addPlayerMoveIn(7)
    board.addComputerMoveIn(8)

    expect(board.whoIsTheWinner()).toBe('draw')
  })
  it('retrieve next available cell position', () => {
    const board = new Board()
    board.addPlayerMoveIn(0)
    board.addComputerMoveIn(1)
    board.addComputerMoveIn(2)
    board.addPlayerMoveIn(3)
    board.addComputerMoveIn(4)
    board.addPlayerMoveIn(5)

    expect(board.availableCellPositions().next().value).toEqual(6)
  })
})
