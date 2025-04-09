import {within} from '@testing-library/dom'
import {describe, expect, it} from 'vitest'
import {render} from '../test/dom'
import {Statistics} from './statistics'
import {StatisticsComponent} from './statistics.component'

describe('Statistics component should', () => {
  it('render the stats', async () => {
    const { body } = await render()
    const statistics = new Statistics()
    statistics.updateFor('player')
    statistics.updateFor('player')
    statistics.updateFor('player')
    statistics.updateFor('computer')
    statistics.updateFor('computer')
    statistics.updateFor('draw')
    const { getByTestId } = within(body)
    const statisticsElement = getByTestId('statistics')
    const component = new StatisticsComponent(statisticsElement)

    component.renderFor(statistics)

    expect(getByTestId('playerstat1')).toHaveTextContent('3')
    expect(getByTestId('loss1')).toHaveTextContent('2')
    expect(getByTestId('draw1')).toHaveTextContent('1')
    expect(getByTestId('computerstat1')).toHaveTextContent('2')
    expect(getByTestId('loss2')).toHaveTextContent('3')
    expect(getByTestId('draw2')).toHaveTextContent('1')
  })
})
