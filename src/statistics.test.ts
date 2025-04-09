import {describe, it} from 'vitest'
import {Statistics} from './statistics'

describe('Statistics should', () => {
  it('be initialized with no wins or draws', () => {
    const statistics = new Statistics()

    expect(statistics.totalPlayerWins).toBe(0)
    expect(statistics.totalComputerWins).toBe(0)
    expect(statistics.totalDraws).toBe(0)
  })
  it('update score when player wins', () => {
    const statistics = new Statistics()
    statistics.updateFor('player')
    expect(statistics.totalPlayerWins).toBe(1)
    expect(statistics.totalComputerWins).toBe(0)
    expect(statistics.totalDraws).toBe(0)
  })
  it('update score when computer wins', () => {
    const statistics = new Statistics()
    statistics.updateFor('computer')
    expect(statistics.totalPlayerWins).toBe(0)
    expect(statistics.totalComputerWins).toBe(1)
    expect(statistics.totalDraws).toBe(0)
  })
  it('update score when game is draw', () => {
    const statistics = new Statistics()
    statistics.updateFor('draw')
    expect(statistics.totalPlayerWins).toBe(0)
    expect(statistics.totalComputerWins).toBe(0)
    expect(statistics.totalDraws).toBe(1)
  })
  it('not update score when game is not finished', () => {
    const statistics = new Statistics()
    statistics.updateFor('none')
    expect(statistics.totalPlayerWins).toBe(0)
    expect(statistics.totalComputerWins).toBe(0)
    expect(statistics.totalDraws).toBe(0)
  })
})
