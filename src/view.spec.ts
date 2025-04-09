import {within} from '@testing-library/dom'
import {describe, expect, it} from 'vitest'
import {render} from '../test/dom'
import {Board} from './board'
import {Statistics} from "./statistics";
import {View} from './view'

describe('View should', () => {
  it('render the board', async () => {
    const board = new Board()
    const { body } = await render()
    const { getByTestId } = within(body)
    const playArea = getByTestId('play')

    View.renderBoard(board, playArea)

    expect(playArea.children).toHaveLength(9)
    expect(playArea.children[0].textContent).toBe('')
    expect(playArea.children[1].textContent).toBe('')
    expect(playArea.children[2].textContent).toBe('')
    expect(playArea.children[3].textContent).toBe('')
    expect(playArea.children[4].textContent).toBe('')
    expect(playArea.children[5].textContent).toBe('')
    expect(playArea.children[6].textContent).toBe('')
    expect(playArea.children[7].textContent).toBe('')
    expect(playArea.children[8].textContent).toBe('')
  })
  it('deactivate select', async () => {
    const { body } = await render()
    const { getByTestId } = within(body)
    const aiSelect = getByTestId('ai_level') as HTMLSelectElement

    View.deactivateSelect(aiSelect)

    expect(aiSelect.disabled).toBe(true)
  })
  it('render winner statement for player', async () => {
    const { body } = await render()
    const { getByTestId } = within(body)
    const winnerElement = getByTestId('winner')

    View.renderWinnerStatementFor('player', winnerElement)

    expect(winnerElement.innerText).toBe('Player Won')
    expect(winnerElement).toHaveClass('playerWin')
  })
  it('render winner statement for computer', async () => {
    const { body } = await render()
    const { getByTestId } = within(body)
    const winnerElement = getByTestId('winner')

    View.renderWinnerStatementFor('computer', winnerElement)

    expect(winnerElement.innerText).toBe('Computer Won')
    expect(winnerElement).toHaveClass('computerWin')
  })
  it('render winner statement for draw', async () => {
    const { body } = await render()
    const { getByTestId } = within(body)
    const winnerElement = getByTestId('winner')

    View.renderWinnerStatementFor('draw', winnerElement)

    expect(winnerElement.innerText).toBe('Draw')
    expect(winnerElement).toHaveClass('draw')
  })
  it('render statistics', async () => {
    const { body } = await render()
    const { getByTestId } = within(body)
    const statisticsElement = getByTestId('statistics')
    const statistics = new Statistics()
    statistics.updateFor('player')
    statistics.updateFor('player')
    statistics.updateFor('player')
    statistics.updateFor('computer')
    statistics.updateFor('computer')
    statistics.updateFor('draw')

    View.renderStatistics(statistics, statisticsElement)

    expect(getByTestId('playerstat1')).toHaveTextContent('3')
    expect(getByTestId('loss1')).toHaveTextContent('2')
    expect(getByTestId('draw1')).toHaveTextContent('1')
    expect(getByTestId('computerstat1')).toHaveTextContent('2')
    expect(getByTestId('loss2')).toHaveTextContent('3')
    expect(getByTestId('draw2')).toHaveTextContent('1')
  })
})
