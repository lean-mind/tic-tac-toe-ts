import {within} from '@testing-library/dom'
import {describe, expect, it} from 'vitest'
import {render} from '../test/dom'
import {View} from './view'

describe('View should', () => {
  it('deactivate select', async () => {
    const { body } = await render()
    const { getByTestId } = within(body)
    const aiSelect = getByTestId('ai_level') as HTMLSelectElement

    View.deactivateSelect(aiSelect)

    expect(aiSelect.disabled).toBe(true)
  })
})
