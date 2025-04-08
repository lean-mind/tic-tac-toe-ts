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
  it('knows a move is available in cell position', () => {
    const board = new Board()
    expect(board.isMoveAvailableIn(0)).toBe(true)
  })
  it('add a player movement', () => {})
})
