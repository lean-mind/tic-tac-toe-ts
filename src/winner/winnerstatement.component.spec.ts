import {within} from '@testing-library/dom'
import {describe, expect, it} from 'vitest'
import {render} from '../../test/dom'
import {WinnerStatementComponent} from './winnerstatement.component'

describe('Winner statement component should', () => {
  it('render winner statement for player', async () => {
    const { body } = await render()
    const { getByTestId } = within(body)
    const winnerStatementElement = getByTestId('winner')
    const component = new WinnerStatementComponent(winnerStatementElement)

    component.renderFor('player')

    expect(winnerStatementElement.innerText).toBe('Player Won')
    expect(winnerStatementElement).toHaveClass('playerWin')
  })

  it('render winner statement for computer', async () => {
    const { body } = await render()
    const { getByTestId } = within(body)
    const winnerStatementElement = getByTestId('winner')
    const component = new WinnerStatementComponent(winnerStatementElement)

    component.renderFor('computer')

    expect(winnerStatementElement.innerText).toBe('Computer Won')
    expect(winnerStatementElement).toHaveClass('computerWin')
  })
  it('render winner statement for draw', async () => {
    const { body } = await render()
    const { getByTestId } = within(body)
    const winnerStatementElement = getByTestId('winner')
    const component = new WinnerStatementComponent(winnerStatementElement)

    component.renderFor('draw')

    expect(winnerStatementElement.innerText).toBe('Draw')
    expect(winnerStatementElement).toHaveClass('draw')
  })
  it('reset winner statement', async () => {
    const { body } = await render()
    const { getByTestId } = within(body)
    const winnerStatementElement = getByTestId('winner')
    const component = new WinnerStatementComponent(winnerStatementElement)

    component.renderFor('none')

    expect(winnerStatementElement.innerText).toBe('')
    expect(winnerStatementElement).not.toHaveClass('draw')
    expect(winnerStatementElement).not.toHaveClass('playerWin')
    expect(winnerStatementElement).not.toHaveClass('computerWin')
  })
})
