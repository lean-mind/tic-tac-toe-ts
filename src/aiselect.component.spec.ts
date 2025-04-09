import {within} from '@testing-library/dom'
import {describe, expect, it} from 'vitest'
import {render} from '../test/dom'
import {AiSelectComponent} from './aiselect.component'

describe('AI select component should', () => {
  it('render a select with AI options', async () => {
    const { body } = await render()
    const { getByTestId } = within(body)
    const aiSelectElement = getByTestId('ai_level') as HTMLSelectElement
    const component = new AiSelectComponent(aiSelectElement)

    component.render()

    expect(aiSelectElement).toBeInTheDocument()
    expect(aiSelectElement.options.length).toBe(3)
    expect(aiSelectElement.options[0].value).toBe('easy')
    expect(aiSelectElement.options[1].value).toBe('normal')
    expect(aiSelectElement.options[2].value).toBe('hard')
  })
  it('render a disable select', async () => {
    const { body } = await render()
    const { getByTestId } = within(body)
    const aiSelectElement = getByTestId('ai_level') as HTMLSelectElement
    const component = new AiSelectComponent(aiSelectElement)

    component.render(true)

    expect(aiSelectElement.disabled).toBe(true)
  })
})
