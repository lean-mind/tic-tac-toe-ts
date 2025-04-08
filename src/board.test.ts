import {describe, expect, it} from 'vitest'
import {Board} from './board'

describe('Board should', () => {
  it('be created empty', () => {
    const board = new Board()
    expect(board.cells).toEqual(['', '', '', '', '', '', '', '', ''])
  })
})
