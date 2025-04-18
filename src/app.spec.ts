import {screen, within} from '@testing-library/dom'
/**
 * @vitest-environment jsdom
 */
import {describe, expect, it} from 'vitest'
import {render} from '../test/dom.ts'

describe('the tic tac toe integration test', () => {
  it('loads the body of the html', async () => {
    const { body } = await render()
    const { getByTestId } = within(body)
    screen.debug(body)

    const winnerElement = getByTestId('winner')
    expect(winnerElement).toBeInTheDocument()
  })
})
